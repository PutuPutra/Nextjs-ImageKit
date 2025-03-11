import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductGrid() {
  const [products, setProducts] = useState<
    {
      _id: string;
      userName: string;
      name: string;
      price: number;
      category: string;
      image: string;
    }[]
  >([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (token) {
        const response = await fetch("/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
          console.error("Unexpected response format:", data);
        }
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return (
    <section className="py-12 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Products</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Below is a list of products we have available for you.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-transform hover:shadow-md"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image || "/icon/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>

              <div className="p-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {product.category}
                </div>
                <h3 className="font-medium mb-2">{product.name}</h3>
                <h3 className="font-medium mb-2">{product.userName}</h3>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Description of this product.
                </div>
                <div className="flex items-center space-x-2">
                  {/* {product.price && ( */}
                  {/* <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    ${product.price}
                  </span> */}
                  {/* )} */}
                  <span className="font-bold">${product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
