import { api } from "./client";

const presignUpload = ({ listingId, filename, contentType }) =>
  api.post("/uploads/presign", { listingId, filename, contentType });

const confirmUpload = ({ listingId, objectKey, position }) =>
  api.post("/uploads/confirm", { listingId, objectKey, position });

async function putFile(uploadUrl, file) {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!response.ok) {
    throw new Error(`Could not upload ${file.name}`);
  }
}

/**
 * Uploads every file for a listing, one at a time, in order — the first file
 * becomes position 0 (the cover image). Bytes go straight from the browser
 * to the object store; this API never proxies them, only the presign/confirm
 * handshake around the upload.
 */
export async function uploadListingImages(listingId, files, onProgress) {
  const fileList = Array.from(files);
  for (let position = 0; position < fileList.length; position += 1) {
    const file = fileList[position];
    const { uploadUrl, objectKey } = await presignUpload({
      listingId,
      filename: file.name,
      contentType: file.type,
    });
    await putFile(uploadUrl, file);
    await confirmUpload({ listingId, objectKey, position });
    onProgress?.(position + 1, fileList.length);
  }
}
