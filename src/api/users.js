import { api } from "./client";

export const getMe = () => api.get("/users/me");
export const updateMe = (data) => api.patch("/users/me", data);
export const getPublicProfile = (id) => api.get(`/users/${id}`);
