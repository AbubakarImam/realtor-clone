import { API_URL } from "./config";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "./tokenStorage";

export class ApiError extends Error {
  constructor(status, message, error) {
    super(message);
    this.status = status;
    this.error = error;
  }
}

let refreshPromise = null;

// Only /auth/refresh itself is allowed to call raw fetch directly — every
// other request goes through request() so a single in-flight refresh is
// shared instead of firing one per failed request.
async function refreshSession() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!response.ok) throw new Error("refresh failed");
    const data = await response.json();
    setTokens(data.accessToken, data.refreshToken);
    return true;
  } catch {
    clearTokens();
    return false;
  }
}

async function request(path, { method = "GET", body, auth = true, isRetry = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) return null;

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401 && auth && !isRetry && getRefreshToken()) {
      refreshPromise = refreshPromise || refreshSession().finally(() => {
        refreshPromise = null;
      });
      const refreshed = await refreshPromise;
      if (refreshed) return request(path, { method, body, auth, isRetry: true });
    }
    const message = Array.isArray(data?.message) ? data.message.join(", ") : data?.message;
    throw new ApiError(response.status, message || "Something went wrong", data?.error);
  }

  return data;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  patch: (path, body, opts) => request(path, { ...opts, method: "PATCH", body }),
  delete: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};
