import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "How AI-Generated Content Will Impact the Future of Architectural Engineering",
    image: "/icon/placeholder.svg?height=300&width=600",
    author: "Amirhossein Mohammadi",
  },
  {
    id: 2,
    title: "How can AI be used to generate revenue in the cryptocurrency space",
    image: "/icon/placeholder.svg?height=300&width=600",
    author: "Amirhossein Mohammadi",
  },
  {
    id: 3,
    title: "Sci-Fi Environmental Concept Art with Midjourney",
    image: "/icon/placeholder.svg?height=300&width=600",
    author: "Amirhossein Mohammadi",
  },
];

export default function Articles() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link href="#" key={article.id} className="group">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={article.image || "/icon/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="font-medium mb-2 group-hover:text-primary">{article.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{article.author}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
