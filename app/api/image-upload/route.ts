import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

// 10 MB expressed as base64 character count
// base64 expands binary by ~4/3, so 10MB binary ≈ 13.33M base64 chars
const MAX_BASE64_CHARS = 10 * 1024 * 1024 * (4 / 3);

// POST /api/image-upload — Protected (admin only)
export async function POST(request: Request) {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: { image?: string; folder?: string } = await request.json();

    if (!body.image) {
      return NextResponse.json(
        { error: "image field (base64 string) is required" },
        { status: 400 }
      );
    }

    if (body.image.length > MAX_BASE64_CHARS) {
      return NextResponse.json(
        { error: "Image too large. Max 10MB." },
        { status: 400 }
      );
    }

    const folder = body.folder ?? "rajratnam/products";
    const secureUrl = await uploadToCloudinary(body.image, folder);

    // Extract publicId from the URL
    // Cloudinary URL format: https://res.cloudinary.com/<cloud>/image/upload/v<ver>/<folder/public_id>.<ext>
    const urlParts = secureUrl.split("/upload/");
    const afterUpload = urlParts[1]; // e.g. "v1234567890/rajratnam/products/abc123.webp"
    // Strip version segment if present
    const publicIdWithExt = afterUpload.replace(/^v\d+\//, "");
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, ""); // remove extension

    return NextResponse.json({ url: secureUrl, publicId });
  } catch (error) {
    console.error("[IMAGE_UPLOAD_POST] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/image-upload — Protected (admin only)
export async function DELETE(request: Request) {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: { publicId?: string } = await request.json();

    if (!body.publicId) {
      return NextResponse.json(
        { error: "publicId is required" },
        { status: 400 }
      );
    }

    await deleteFromCloudinary(body.publicId);
    return NextResponse.json({ message: "Image deleted" });
  } catch (error) {
    console.error("[IMAGE_UPLOAD_DELETE] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
