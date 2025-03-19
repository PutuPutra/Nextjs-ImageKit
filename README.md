<!-- # NextJS-Challenge (Next.js Project)

## NDL

### Setup Project: Tema Aplikasi

REQUIREMENTS:

- NEXTJS APP ROUTER LATEST VERSION
- SHADCN UI COMPONENT
- IMAGEKIT.IO imagecloud - https://imagekit.io/docs/integration/nextjs

Silahkan kerjakan task ini dari project aplikasi kamu:

- [ ] Halaman auth
  - [ ] Register
  - [ ] Login
  - [ ] Middleware
- [ ] Halaman home
  - [ ] Komponen Banner
  - [ ] Komponen Detail info Ecommerce
  - [ ] Komponen Featured Product (50-10 product)
- [ ] Halaman Menambah Product
- [ ] Pastikan Data Gambar Tersimpan di ImageKIT -->

# Next.js TypeScript dengan Integrasi ImageKit.io & MongoDB

Proyek ini adalah aplikasi web yang dibangun dengan Next.js dan TypeScript. Proyek ini terintegrasi dengan [ImageKit.io](https://imagekit.io) untuk manajemen serta optimasi gambar, dan menggunakan MongoDB sebagai database untuk menyimpan data.

## Fitur

- **Next.js & TypeScript**: Pengembangan front-end dan back-end dengan Next.js serta pemanfaatan TypeScript untuk pengembangan yang lebih terstruktur dan aman.
- **Integrasi ImageKit.io**: Optimasi dan transformasi gambar secara otomatis, serta mendukung upload gambar melalui API.
- **MongoDB**: Database NoSQL yang scalable dan fleksibel untuk menyimpan data aplikasi.
- **API Routes**: Endpoint API untuk menangani upload gambar, pengambilan data, dan operasi CRUD lainnya.

## Instalasi

### Prasyarat

- [Node.js](https://nodejs.org) (disarankan versi LTS)
- NPM atau Yarn
- Akun di [ImageKit.io](https://imagekit.io)
- Akses ke database MongoDB (lokal atau cloud)

### Langkah-langkah Instalasi

1. **Clone Repository**

   ```bash
   git clone https://github.com/PutuPutra/Nextjs-ImageKit.git
   cd nama-proyek
   ```

2. **Install Dependensi**

   ```bash
   npm install --legacy-peer-deps
   # atau jika menggunakan yarn:
   yarn install --legacy-peer-deps
   ```

3. **Konfigurasi Variabel Lingkungan**

   Buat file `.env` di root folder proyek dan tambahkan variabel berikut:

   ```env
   # Konfigurasi ImageKit.io
   NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

   # Konfigurasi MongoDB
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Jalankan Proyek dalam Mode Pengembangan**

   ```bash
   npm run dev
   # atau dengan yarn:
   yarn dev
   ```

   Akses aplikasi di [http://localhost:3000](http://localhost:3000).

## Struktur Proyek

```plaintext
/nama-proyek
├── /components         # Komponen UI yang digunakan di halaman
├── /pages              # Halaman Next.js dan API routes
├── /public             # Aset publik seperti gambar, favicon, dll.
├── /styles             # File CSS atau SCSS
├── /utils              # Fungsi helper dan utilitas
├── .env                # File variabel lingkungan (tidak disertakan di VCS)
├── package.json        # Konfigurasi dependensi dan skrip
└── README.md           # Dokumentasi proyek
```

## Integrasi ImageKit.io

Proyek ini menggunakan [ImageKit.io](https://imagekit.io) untuk:

- **Optimasi Gambar:** Mengoptimalkan gambar secara otomatis saat diupload.
- **Transformasi Gambar:** Mendukung berbagai transformasi seperti resize, crop, dll.
- **Upload Gambar:** Endpoint API khusus untuk menangani upload gambar ke ImageKit.io.

Informasi lebih lanjut dapat ditemukan di [dokumentasi ImageKit.io](https://docs.imagekit.io).

## Koneksi ke MongoDB

Pastikan variabel `MONGODB_URI` di file `.env` telah diset dengan benar. Contoh connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/nama_database?retryWrites=true&w=majority
```

## Deployment

Proyek ini siap untuk dideploy ke platform seperti Vercel atau Heroku.

- **Vercel:** Next.js terintegrasi secara native dengan Vercel. Pastikan untuk menambahkan environment variables melalui dashboard Vercel.
- **Heroku:** Gunakan buildpack Node.js dan atur environment variables melalui dashboard Heroku.

## Kontribusi

Kontribusi sangat diterima! Jika Anda ingin berkontribusi:

1. Fork repository ini.
2. Buat branch baru: `git checkout -b fitur/fitur-baru`.
3. Commit perubahan Anda: `git commit -am 'Tambah fitur baru'`.
4. Push branch: `git push origin fitur/fitur-baru`.
5. Buat Pull Request.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
