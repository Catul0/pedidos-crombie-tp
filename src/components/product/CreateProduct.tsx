"use client";
import { useProducts } from "@/context/ProductContext";
import { useEffect, useState } from "react";
import uploadFile from "@/libs/update-file";

export default function CreateProduct({ params }: { params: { id: string } }) {
  const [productName, setProductName] = useState("");
  const [pricee, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const { createProduct, selectedProduct, updateProduct, setSelectedProduct } =
    useProducts();

  useEffect(() => {
    if (selectedProduct) {
      const price = selectedProduct.price.toString();
      setProductName(selectedProduct.productName);
      setPrice(price);
      setDescription(selectedProduct.description);
    }
  }, [selectedProduct]);

  return (
    <div className="flex flex-col">
      <h1 className="text-center mb-3">
        <b>Agregar nuevo producto</b>
      </h1>
      <form
        className="bg-white px-4 py-4 rounded-md"
        onSubmit={async (e) => {
          e.preventDefault();
          if (selectedProduct) {
            const price = Number(pricee);
            await updateProduct(selectedProduct.id, {
              productName,
              description,
              price,
              image,
            });
          } else {
            const price = Number(pricee);
            await createProduct(
              { id: 1, productName, description, price, image, sellerId: 0 },
              Number(params.id),
            );
          }
          setProductName("");
          setPrice("");
          setImage("");
          setDescription("");
          setSelectedProduct(null);
        }}
      >
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="productName"
            id="productName"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <label
            htmlFor="productName"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nombre
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="price"
            id="price"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={pricee}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label
            htmlFor="price"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Precio
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <textarea
            name="description"
            id="description"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label
            htmlFor="description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Descripcion
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0   appearance-none    peer"
            onChange={async (e) => {
              if (e.target.files) {
                const result = await uploadFile(e.target.files[0]);
                setImage(
                  "https://guls-escuelita-api-mainst-escuelitabucketc7b4e42a-1e9sgj383k6ak.s3.amazonaws.com/" +
                    result,
                );
              }
            }}
          />

          <label
            htmlFor="image"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Imagen
          </label>
          {image ? (
            <img
              src={image}
              className="h-[100px] m-auto"
              alt="Imagen del producto"
            />
          ) : (
            <p></p>
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="text-white bg-green-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {selectedProduct ? "ACTUALIZAR" : "CREAR"}
          </button>
          {selectedProduct && (
            <button
              type="button"
              className="px-5 py-2 text-white bg-red-600 rounded-md hover:bg-red-500"
              onClick={() => {
                setSelectedProduct(null);
                setProductName("");
                setPrice("");
                setImage("");
                setDescription("");
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
