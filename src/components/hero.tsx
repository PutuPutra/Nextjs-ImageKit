import Image from "next/image";

export default function Hero() {
  return (
    <div className="bg-stone-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="relative h-48 md:h-64 overflow-hidden rounded-md">
                <Image
                  src="/icon/placeholder.svg?height=300&width=300"
                  alt="Kids clothing"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                @reallygreatsite
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-center p-8 bg-stone-200 dark:bg-gray-800 rounded-lg">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light italic mb-2">
                Kids Fashion
              </h2>
              <p className="text-xl tracking-widest">EXTRA 50% OFF</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="relative h-48 md:h-64 overflow-hidden rounded-md">
                <Image
                  src="/icon/placeholder.svg?height=300&width=300"
                  alt="Kids clothing"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                @reallygreatsite
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {[0, 1, 2, 3].map((index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === 0 ? "bg-gray-800 dark:bg-white" : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
