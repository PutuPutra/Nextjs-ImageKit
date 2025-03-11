async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}

export async function createProduct(product: {
  name: string;
  price: number;
  category: string;
  imageFile: File;
}) {
  const base64Image = await convertImageToBase64(product.imageFile);
  const token = localStorage.getItem("jwt");
  const response = await fetch("/api/admin/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...product, imageFile: base64Image }),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error("Error creating product:", data);
    throw new Error(data.message || "Error creating product");
  }
  return data;
}

export async function updateProduct(
  editProductId: string,
  product: { name: string; price: number; category: string; imageFile?: File }
) {
  console.log("Editing product ID:", editProductId);
  console.log("Product data to update:", product);

  const base64Image = product.imageFile ? await convertImageToBase64(product.imageFile) : null;
  const token = localStorage.getItem("jwt");
  console.log("JWT Token:", token); // Pastikan token valid

  const response = await fetch(`/api/admin/products/${editProductId}`, {
    // Pastikan endpoint ini benar
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...product, imageFile: base64Image }),
  });

  const data = await response.json();
  console.log("Response data:", data);

  if (!response.ok) {
    console.error("Error updating product:", data);
    throw new Error(data.message || "Error updating product");
  }
  return data;
}

// Mengirim request DELETE untuk menghapus produk
export async function deleteProduct(id: string) {
  console.log("Deleting product with ID:", id);

  const token = localStorage.getItem("jwt");
  console.log("JWT Token:", token); // Pastikan token valid

  const response = await fetch(`/api/admin/products/${id}`, {
    // Pastikan endpoint ini benar
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log("Response data:", data);

  if (!response.ok) {
    console.error("Error deleting product:", data);
    throw new Error(data.message || "Error deleting product");
  }
  return data;
}
