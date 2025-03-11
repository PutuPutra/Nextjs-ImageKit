/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import Product from "@/models/Products";
import ImageKit from "imagekit";
import { authMiddleware } from "@/middleware/authMiddleware";

const imagekit = new ImageKit({
  publicKey: "public_ACTu4ELdiZhmfZXvuEYpXiOb+X0=",
  privateKey: "private_+OmPUPumeAHvvq5U2X0heg0Zz40=",
  urlEndpoint: "https://ik.imagekit.io/persada/",
});

interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
    email: string;
  };
}

export async function GET(req: NextRequest) {
  await connect(); // Hubungkan ke database

  // Pastikan user terautentikasi
  const authResponse = await authMiddleware(req);
  if (authResponse.status !== 200) {
    return authResponse; // Jika gagal autentikasi, kembalikan error
  }

  // Ambil userId dari request
  const userId = (req as any).user.id;

  // Filter produk berdasarkan userId
  const products = await Product.find({ userId });

  // Kembalikan produk milik user
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const authResponse = await authMiddleware(req);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  await connect();
  try {
    const data = await req.json();
    console.log("Received product data:", data);

    if (!data.name || !data.price || !data.category) {
      return NextResponse.json(
        { message: "Name, price, and category are required" },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (data.imageFile) {
      const file = Buffer.from(data.imageFile.split(",")[1], "base64");

      console.log("Uploading image...");
      try {
        const uploadedImage = await imagekit.upload({
          file,
          fileName: `${data.name}-${Date.now()}`,
        });
        imageUrl = uploadedImage.url;
        console.log("Image uploaded successfully:", imageUrl);
      } catch (uploadError) {
        console.error("ImageKit Upload Error:", uploadError);
        return NextResponse.json({ message: "Image upload failed" }, { status: 500 });
      }
    }
    const newProduct = new Product({
      name: data.name,
      price: data.price,
      category: data.category,
      image: imageUrl,
      userId: (req as AuthenticatedRequest).user.id,
    });

    await newProduct.save();
    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Error adding product" }, { status: 500 });
  }
}
