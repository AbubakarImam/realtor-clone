import { api } from "./client";
import { setTokens, clearTokens } from "./tokenStorage";

function issueSession(data) {
  setTokens(data.accessToken, data.refreshToken);
  return data.user;
}

export async function register({ email, password, name }) {
  const data = await api.post("/auth/register", { email, password, name }, { auth: false });
  return issueSession(data);
}

export async function login({ email, password }) {
  const data = await api.post("/auth/login", { email, password }, { auth: false });
  return issueSession(data);
}

export async function loginWithGoogle(idToken) {
  const data = await api.post("/auth/google", { idToken }, { auth: false });
  return issueSession(data);
}

export function logout() {
  clearTokens();
}
