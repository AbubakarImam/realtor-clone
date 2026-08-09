import { api } from "./client";

export const sendMessage = (listingId, body) =>
  api.post(`/listings/${listingId}/messages`, { body });

export const getThread = (listingId) => api.get(`/listings/${listingId}/messages`);
