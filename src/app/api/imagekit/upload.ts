import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import Product from "@/models/Products";
import ImageKit from "imagekit";

// Initialize the ImageKit instance
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_ID!,
});

export async function PUT(request: Request) {
  await connect();
  try {
    const data = await request.json();

    if (!data.id) {
      return NextResponse.json({ message: "Product id is required" }, { status: 400 });
    }

    // If there's a new image file
    let updatedData = { ...data };
    if (data.imageFile) {
      const file = data.imageFile; // Expecting base64 or file buffer
      const buffer = Buffer.from(file, "base64"); // Convert to buffer if base64

      const uploadedImage = await imagekit.upload({
        file: buffer,
        fileName: `${data.name}-${Date.now()}`,
      });
      updatedData = {
        ...data,
        image: uploadedImage.url, // Update image URL
      };
    }

    const updatedProduct = await Product.findByIdAndUpdate(data.id, updatedData, { new: true });
    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating product" }, { status: 500 });
  }
}
