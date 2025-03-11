import Image from "next/image";
import { Badge } from "../components/ui/badges";
// import { Button } from "./ui/button";

const products = [
  {
    id: 1,
    name: "BKD Pipe",
    category: "Accessories",
    price: null,
    originalPrice: null,
    discountPrice: null,
    image: "/icon/placeholder.svg?height=300&width=300",
    outOfStock: true,
  },
  {
    id: 2,
    name: "Bang and Olufsen Speaker",
    category: "Electronics",
    price: 74.85,
    originalPrice: 92.95,
    discountPrice: 13.32,
    image: "/icon/placeholder.svg?height=300&width=300",
    outOfStock: false,
  },
  {
    id: 3,
    name: "Audio Technica Turn-table",
    category: "Audio",
    price: null,
    originalPrice: null,
    discountPrice: null,
    image: "/icon/placeholder.svg?height=300&width=300",
    outOfStock: true,
  },
  {
    id: 4,
    name: "Monocle Sneakers",
    category: "Footwear",
    price: null,
    originalPrice: null,
    discountPrice: null,
    image: "/icon/placeholder.svg?height=300&width=300",
    outOfStock: true,
  },
  {
    id: 5,
    name: "Zone2 Mens Watch",
    category: "Electronics",
    price: 91.53,
    originalPrice: 95.95,
    discountPrice: 4.95,
    image: "/icon/placeholder.svg?height=300&width=300",
    outOfStock: false,
  },
  {
    id: 6,
    name: "Carl Hauser L1 Phone",
    category: "Electronics",
    price: 49.83,
    originalPrice: 50.95,
    discountPrice: 1.97,
    image: "/icon/placeholder.svg?height=300&width=300",
    outOfStock: false,
  },
  {
    id: 7,
    name: "Carl Hauser Scanner",
    category: "Electronics",
    price: null,
    originalPrice: null,
    discountPrice: null,
    image: "/icon/placeholder.svg?height=300&width=300",
    outOfStock: true,
  },
  {
    id: 8,
    name: "Bright Neon Helmet",
    category: "Accessories",
    price: null,
    originalPrice: null,
    discountPrice: null,
    image: "/icon/placeholder.svg?height=300&width=300",
    outOfStock: true,
  },
];

export default function ProductGrid() {
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
          {/* <Button>Add Data</Button> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
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
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Description of this product.
                </div>

                {product.outOfStock ? (
                  <div className="text-sm text-red-500">Out of stock</div>
                ) : (
                  <div className="flex items-center space-x-2">
                    {product.discountPrice && (
                      <Badge variant="destructive" className="text-xs text-white">
                        -${product.discountPrice}
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                    <span className="font-bold">${product.price}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
