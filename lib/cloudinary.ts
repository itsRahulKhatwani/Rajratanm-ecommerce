import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload an image to Cloudinary (signed upload — server-side only).
 * @param file - base64 data URI or a remote URL string
 * @param folder - Cloudinary folder path (defaults to rajratnam/products)
 * @returns The secure_url of the uploaded image
 */
export async function uploadToCloudinary(
  file: string,
  folder: string = "rajratnam/products"
): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });
    return result.secure_url;
  } catch (err) {
    throw new Error(
      `Cloudinary upload failed: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

/**
 * Delete an image from Cloudinary by its public_id.
 * Used when admin deletes a product or replaces its image.
 * @param publicId - The Cloudinary public_id of the image to delete
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    throw new Error(
      `Cloudinary delete failed: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}
