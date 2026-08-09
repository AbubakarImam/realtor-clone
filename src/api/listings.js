import { api } from "./client";

/**
 * Reshapes a Registry API listing into the flat, Firestore-shaped object the
 * page components already expect (they were built against
 * `{ id: doc.id, data: doc.data() }` from Firestore, and still read fields
 * like `listing.imgUrls`, `listing.offer`, `listing.userRef`). Keeping that
 * shape here means the components below didn't need to change, only where
 * their data comes from.
 */
function toFirestoreShape(listing) {
  return {
    type: listing.type.toLowerCase(),
    status: listing.status,
    name: listing.name,
    description: listing.description,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    parking: listing.parking,
    furnished: listing.furnished,
    address: listing.address,
    regularPrice: listing.regularPrice,
    discountedPrice: listing.discountedPrice ?? undefined,
    offer: listing.isOffer,
    imgUrls: (listing.images || []).map((img) => img.url),
    userRef: listing.ownerId,
    timestamp: listing.createdAt,
    latitude: listing.coordinates?.latitude ?? 0,
    longitude: listing.coordinates?.longitude ?? 0,
  };
}

function toDto(formData) {
  const dto = {
    type: formData.type.toUpperCase(),
    name: formData.name,
    description: formData.description,
    bedrooms: Number(formData.bedrooms),
    bathrooms: Number(formData.bathrooms),
    parking: !!formData.parking,
    furnished: !!formData.furnished,
    address: formData.address,
    regularPriceCents: Math.round(Number(formData.regularPrice) * 100),
    isOffer: !!formData.offer,
  };
  if (formData.offer) {
    dto.discountedPriceCents = Math.round(Number(formData.discountedPrice) * 100);
  }
  if (formData.latitude && formData.longitude) {
    dto.latitude = Number(formData.latitude);
    dto.longitude = Number(formData.longitude);
  }
  return dto;
}

export async function getListings(params = {}) {
  const query = new URLSearchParams();
  if (params.type) query.set("type", params.type.toUpperCase());
  if (params.offer !== undefined) query.set("offer", String(params.offer));
  if (params.ownerId) query.set("ownerId", params.ownerId);
  if (params.cursor) query.set("cursor", params.cursor);
  if (params.limit) query.set("limit", String(params.limit));

  const res = await api.get(`/listings?${query.toString()}`, { auth: false });
  return {
    items: res.items.map((listing) => ({ id: listing.id, data: toFirestoreShape(listing) })),
    nextCursor: res.nextCursor,
  };
}

export async function getListing(id) {
  const listing = await api.get(`/listings/${id}`, { auth: false });
  return toFirestoreShape(listing);
}

export async function createListing(formData) {
  const listing = await api.post("/listings", toDto(formData));
  return listing.id;
}

export async function updateListing(id, formData) {
  const listing = await api.patch(`/listings/${id}`, toDto(formData));
  return listing.id;
}

export const deleteListing = (id) => api.delete(`/listings/${id}`);
