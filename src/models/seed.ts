// // scripts/seed.ts
// import mongoose from "mongoose";
// import User from "../models/User"; // Pastikan path sesuai dengan struktur project Anda
// import Product from "../models/Products"; // Pastikan path sesuai dengan struktur project Anda

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/nama_database_anda";

// if (!MONGODB_URI) {
//   throw new Error("Tolong definisikan environment variable MONGODB_URI pada file .env Anda");
// }

// mongoose
//   .connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   } as mongoose.ConnectOptions)
//   .then(() => console.log("Berhasil terhubung ke MongoDB"))
//   .catch((err) => console.error("Koneksi MongoDB gagal:", err));

// const seed = async () => {
//   try {
//     // Hapus data lama
//     await User.deleteMany({});
//     await Product.deleteMany({});
//     console.log("Data lama telah dihapus");

//     // Membuat data user baru
//     const users = await User.insertMany([
//       {
//         name: "Alice",
//         email: "alice@example.com",
//         password: "password123", // Di production, sebaiknya password di-hash
//       },
//       {
//         name: "Bob",
//         email: "bob@example.com",
//         password: "password123",
//       },
//     ]);
//     console.log("User berhasil dibuat:", users);

//     // Membuat data produk baru dengan gambar dari online (misalnya Unsplash)
//     const products = await Product.insertMany([
//       {
//         name: "Produk 1",
//         price: 10,
//         category: "Kategori A",
//         image: "https://source.unsplash.com/random/150x150?sig=1",
//         userId: users[0]._id,
//       },
//       {
//         name: "Produk 2",
//         price: 20,
//         category: "Kategori B",
//         image: "https://source.unsplash.com/random/150x150?sig=2",
//         userId: users[1]._id,
//       },
//       {
//         name: "Produk 3",
//         price: 30,
//         category: "Kategori A",
//         image: "https://source.unsplash.com/random/150x150?sig=3",
//         userId: users[0]._id,
//       },
//     ]);
//     console.log("Produk berhasil dibuat:", products);

//     console.log("Seeding database selesai!");
//     process.exit(0);
//   } catch (error) {
//     console.error("Terjadi error saat seeding database:", error);
//     process.exit(1);
//   }
// };

// seed();
// scripts/seed.ts
import mongoose from "mongoose";
import User from "./User"; // Pastikan path sesuai dengan struktur project Anda
import Product from "./Products";
// import User from "../models/User";
// import Product from "../models/Products";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/nama_database_anda";

if (!MONGODB_URI) {
  throw new Error("Tolong definisikan environment variable MONGODB_URI pada file .env Anda");
}

// Connect ke MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => console.log("Berhasil terhubung ke MongoDB"))
  .catch((err) => console.error("Koneksi MongoDB gagal:", err));

const seed = async () => {
  try {
    // Hapus data lama dari collection User dan Product
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log("Data lama telah dihapus");

    // Membuat 10 user
    const usersData = [];
    for (let i = 1; i <= 10; i++) {
      usersData.push({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password: "password123", // Di production, pastikan password di-hash
      });
    }
    const createdUsers = await User.insertMany(usersData);
    console.log("10 user berhasil dibuat:", createdUsers);

    // Membuat 10 produk untuk setiap user (total 100 produk)
    const productsData = [];
    let productIndex = 1;
    for (const user of createdUsers) {
      for (let j = 1; j <= 10; j++) {
        productsData.push({
          name: `Produk ${productIndex}`,
          price: productIndex * 10, // Contoh harga
          category: productIndex % 2 === 0 ? "Kategori A" : "Kategori B",
          // Menggunakan Unsplash untuk gambar secara online dengan parameter unik
          image: `https://source.unsplash.com/random/150x150?sig=${productIndex}`,
          userId: user._id,
        });
        productIndex++;
      }
    }
    const createdProducts = await Product.insertMany(productsData);
    console.log("100 produk berhasil dibuat:", createdProducts);

    console.log("Seeding database selesai!");
    process.exit(0);
  } catch (error) {
    console.error("Terjadi error saat seeding database:", error);
    process.exit(1);
  }
};

seed();
