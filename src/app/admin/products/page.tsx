"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { PencilLine, Trash } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { createProduct, updateProduct, deleteProduct } from "@/app/actions/products/productAction";

export default function Page() {
  const [products, setProducts] = useState<
    { _id: string; name: string; price: number; category: string; image: string }[]
  >([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const response = await fetch("/api/admin/products", {
        headers: {
          Authorization: `Bearer ${token}`, // Mengirim token autentikasi
        },
      });

      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data); // Set produk milik user yang sedang login
      } else {
        setProducts([]); // Jika tidak ada produk, set ke array kosong
      }
    }
  };

  const [file, setFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
  });
  const [editProductId, setEditProductId] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (editProductId) {
        // Jika file baru tidak dipilih, biarkan imageFile undefined untuk menggunakan nilai lama
        await updateProduct(editProductId, {
          ...formData,
          imageFile: file ? file : undefined,
        });
        toast.success("Product updated successfully!");
      } else {
        if (file) {
          await createProduct({ ...formData, imageFile: file });
          toast.success("Product added successfully!");
        }
      }
      fetchProducts();
      setIsOpen(false);
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit product");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      category: "",
    });
    setFile(null);
    setEditProductId(null);
    setCurrentImage(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (product: {
    _id: string;
    name: string;
    price: number;
    category: string;
    image: string;
  }) => {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
    });
    setEditProductId(product._id);
    setCurrentImage(product.image);
    setIsOpen(true);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (deleteProductId) {
      try {
        await deleteProduct(deleteProductId);
        fetchProducts();
        toast.success("Product deleted successfully!");
        closeDeleteModal();
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete product");
      }
    }
  };

  const openDeleteModal = (id: string) => {
    setDeleteProductId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteProductId(null);
  };

  return (
    <AdminLayout>
      <div className="relative overflow-x-auto mt-5">
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <div className="flex justify-end mb-8">
          <Button onClick={() => setIsOpen(true)} className="cursor-pointer text-white ">
            Add data
          </Button>
        </div>
        {isOpen && (
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-opacity-50 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-700"
                >
                  <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {editProductId ? "Edit Product" : "Add New Product"}
                    </h3>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600"
                    >
                      ✖
                    </button>
                  </div>
                  <form className="p-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="price"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          id="price"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Category
                        </label>
                        <select
                          id="category"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select category</option>
                          <option value="TV">TV/Monitors</option>
                          <option value="PC">PC</option>
                          <option value="GA">Gaming/Console</option>
                          <option value="PH">Phones</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="file_input"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Upload file
                        </label>
                        <input
                          id="file_input"
                          type="file"
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
                          onChange={handleFileChange}
                          required={!editProductId}
                        />
                        {file && (
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Selected file: {file.name}
                          </p>
                        )}
                        {currentImage && !file && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Current image:
                            </p>
                            <Image
                              src={currentImage}
                              alt="Current image"
                              width={100}
                              height={100}
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      {editProductId ? "Update Product" : "Add new product"}
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {isDeleteModalOpen && (
          <AnimatePresence>
            {isDeleteModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-opacity-50 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-700"
                >
                  <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Confirm Deletion
                    </h3>
                    <button
                      type="button"
                      onClick={closeDeleteModal}
                      className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600"
                    >
                      ✖
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Are you sure you want to delete this product?
                    </p>
                    <div className="flex justify-end mt-4">
                      <Button
                        onClick={closeDeleteModal}
                        className="mr-2 text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleDelete}
                        className="text-white bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                #
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Product name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="bg-white border-b dark:bg-gray-800 border-gray-200">
                <td className="px-6 py-4 text-center">{index + 1}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4 text-center">{product.price}</td>
                <td className="px-6 py-4 text-center">{product.category}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-x-2">
                    <Button
                      onClick={() => handleEdit(product)}
                      className="cursor-pointer bg-white hover:bg-white text-blue-500 dark:text-blue-600"
                    >
                      <PencilLine size={20} />
                    </Button>
                    <Button
                      onClick={() => openDeleteModal(product._id)}
                      className="cursor-pointer bg-white hover:bg-white text-red-500"
                    >
                      <Trash size={20} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
