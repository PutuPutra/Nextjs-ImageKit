"use server";

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

// interface AuthenticatedRequest extends NextRequest {
//   user: {
//     id: string;
//     email: string;
//   };
// }

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const authResponse = await authMiddleware(req);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  await connect();
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const data = await req.json();

    if (!data.name || !data.price || !data.category) {
      return NextResponse.json(
        { message: "Name, price, and category are required" },
        { status: 400 }
      );
    }

    let imageUrl = data.imageFile || "";
    if (data.imageFile) {
      const file = Buffer.from(data.imageFile.split(",")[1], "base64");
      const uploadedImage = await imagekit.upload({
        file,
        fileName: `${data.name}-${Date.now()}`,
      });
      imageUrl = uploadedImage.url;
    } else {
      // If no new image is uploaded, keep the old image
      const existingProduct = await Product.findById(id);
      imageUrl = existingProduct?.image || imageUrl;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: data.name,
        price: data.price,
        category: data.category,
        image: imageUrl,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error updating product" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  console.log("Request received to delete product with ID:", params.id); // Log ID yang diterima dari URL
  const authResponse = await authMiddleware(req);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  await connect();
  try {
    const { id } = params; // Memastikan kita mendapatkan ID produk dari URL
    console.log("Product ID for deletion:", id);

    // Menghapus produk berdasarkan ID
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      console.log("Product not found for deletion with ID:", id);
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    console.log("Deleted product:", deletedProduct);
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Error deleting product" }, { status: 500 });
  }
}

/* PUT: Update produk berdasarkan id yang diberikan melalui query parameter, 
   hanya jika produk tersebut milik user yang sedang login */
// export async function PUT(req: NextRequest) {
//   await connect();
//   const authResponse = await authMiddleware(req);
//   if (authResponse.status !== 200) {
//     return authResponse;
//   }

//   // Ambil product id dari query parameter, misal: /api/admin/products?id=<productId>
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   if (!id) {
//     return NextResponse.json({ message: "Product id is required" }, { status: 400 });
//   }

//   try {
//     const data = await req.json();
//     // Siapkan data yang akan diupdate
//     const updateData: any = {
//       name: data.name,
//       price: data.price,
//       category: data.category,
//     };

//     // Jika ada file image baru, upload dan perbarui URL image
//     if (data.imageFile) {
//       const file = Buffer.from(data.imageFile.split(",")[1], "base64");
//       console.log("Uploading updated image...");
//       try {
//         const uploadedImage = await imagekit.upload({
//           file,
//           fileName: `${data.name}-${Date.now()}`,
//         });
//         updateData.image = uploadedImage.url;
//       } catch (uploadError) {
//         console.error("ImageKit Upload Error:", uploadError);
//         return NextResponse.json({ message: "Image upload failed" }, { status: 500 });
//       }
//     }

//     // Update produk dengan memastikan produk tersebut milik user yang sedang login
//     const updatedProduct = await Product.findOneAndUpdate(
//       { _id: id, userId: (req as AuthenticatedRequest).user.id },
//       updateData,
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return NextResponse.json({ message: "Product not found or not authorized" }, { status: 404 });
//     }

//     return NextResponse.json(updatedProduct);
//   } catch (error) {
//     console.error("Error updating product:", error);
//     return NextResponse.json({ message: "Error updating product" }, { status: 500 });
//   }
// }

/* DELETE: Hapus produk berdasarkan id yang diberikan melalui query parameter,
   hanya jika produk tersebut milik user yang sedang login */
// export async function DELETE(req: NextRequest) {
//   await connect();
//   const authResponse = await authMiddleware(req);
//   if (authResponse.status !== 200) {
//     return authResponse;
//   }

//   // Ambil product id dari query parameter
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   if (!id) {
//     return NextResponse.json({ message: "Product id is required" }, { status: 400 });
//   }

//   try {
//     const deletedProduct = await Product.findOneAndDelete({
//       _id: id,
//       userId: (req as AuthenticatedRequest).user.id,
//     });

//     if (!deletedProduct) {
//       return NextResponse.json({ message: "Product not found or not authorized" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     return NextResponse.json({ message: "Error deleting product" }, { status: 500 });
//   }
// }
