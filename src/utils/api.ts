// utils/api.ts

// Fetch all products
export async function fetchProducts() {
  const response = await fetch("/api/admin/products");
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error fetching products");
  }
  return data;
}

// Fetch a single product by ID
export async function fetchProductById(id: string) {
  const response = await fetch(`/api/admin/products?id=${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error fetching product");
  }
  return data;
}

// Create a new product
export async function createProduct(product: {
  name: string;
  price: number;
  category: string;
  image: string; // URL of the image uploaded to ImageKit
}) {
  const response = await fetch("/api/admin/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error creating product");
  }
  return data;
}

// Update an existing product
export async function updateProduct(product: {
  id: string;
  name?: string;
  price?: number;
  category?: string;
  image?: string;
}) {
  const response = await fetch("/api/admin/products", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error updating product");
  }
  return data;
}

// Delete a product by ID
export async function deleteProduct(id: string) {
  const response = await fetch(`/api/admin/products?id=${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error deleting product");
  }
  return data;
}
