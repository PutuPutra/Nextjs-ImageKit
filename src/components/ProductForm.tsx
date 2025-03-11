import { useState } from "react";
import { createProduct, updateProduct } from "@/utils/api";
import { fetchProducts } from "@/utils/api";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});

interface Product {
  id?: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export default function ProductForm({ existingProduct }: { existingProduct?: Product }) {
  const [product, setProduct] = useState(
    existingProduct || { name: "", price: 0, category: "", image: "" }
  );
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      // Upload ke ImageKit
      const base64File = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

      const uploadResponse = await imagekit.upload({
        file: base64File,
        fileName: file.name,
      });
      return uploadResponse.url; // Return URL image
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload image if file selected
    const imageUrl = await handleImageUpload();

    const productData = {
      name: product.name,
      price: product.price,
      category: product.category,
      image: imageUrl || product.image, // Gunakan URL gambar dari ImageKit
    };

    if (existingProduct?.id) {
      // Update product
      await updateProduct({ ...productData, id: existingProduct.id });
    } else {
      // Create new product
      await createProduct(productData);
    }

    // After submission, reload products or redirect as needed
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          placeholder={""}
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          placeholder={""}
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          placeholder={""}
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" placeholder={""} onChange={handleFileChange} />
      </div>
      <button type="submit">Save Product</button>
    </form>
  );
}
