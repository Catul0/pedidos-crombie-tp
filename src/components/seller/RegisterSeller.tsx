"use client";
import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useLocalProfiles } from "@/context/LocalProfileContext";
import Cookies from "js-cookie";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { HStack, Input } from "@chakra-ui/react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
require("dotenv").config();

function RegisterSeller() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [match, setMatch] = useState(true);
  const [alert, setAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [logo, setLogo] = useState(
    "https://cdn-icons-png.flaticon.com/512/2702/2702614.png",
  );
  const { createLocalProfile } = useLocalProfiles();
  const router = useRouter();
  const imagenUrl =
    "https://www.openenglish.com/blog/es/wp-content/uploads/sites/2/2016/03/como-pedir-una-hamburguesa.jpg";
  const directionRef = useRef<HTMLInputElement | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY || "",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSecondPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMatch(password === secondPassword);
    if (password === secondPassword) {
      setAlert(true);
      await createLocalProfile({
        name,
        description,
        address,
        city,
        email,
        password,
      });
      const token: any = Cookies.get("token");
      setTimeout(() => {
        if (token)
          router.push(`/sellers/${(decode(token) as { id: string })?.id}`);
      }, 3000);
    } else {
      setAlert(false);
    }
  };

  return (
    <div
      className="flex absolute top-16 justify-center items-center w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1673212036711-b4b30c62ec11?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="max-w-xl flex flex-col mr-40">
        <h1 className="font-bold text-white text-5xl">
          ¡Registrá tu restaurante en Pedidos Crombie Partners y vende más!
        </h1>
        <p className="text-white mt-5">
          En el Portal Partners de Pedidos Crombie, tendrás acceso a muchas
          herramientas para impulsar tu empresa. Al convertirte en aliado de
          Pedidos Crombie, tus ventas aumentarán hasta un 30% sin incrementar
          costos operativos y llegando a más usuarios. ¡Crecé con Pedidos
          Crombie!
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Register as a Seller</h2>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-4 group">
            <input
              type="text"
              name="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name:
            </label>
          </div>
          <div className="relative z-0 w-full mb-4 group">
            <input
              type="text"
              name="description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
              onChange={(e) => setDescription(e.target.value)}
              placeholder=" "
              required
            />
            <label
              htmlFor="description"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description:
            </label>
          </div>
          <HStack className="relative z-0 w-full mb-10 group">
            <Autocomplete>
              <Input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
                ref={directionRef}
                onBlur={(e) => {
                  setAddress(directionRef.current!.value);
                }}
                placeholder=""
                required
              />
            </Autocomplete>
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Address:
            </label>
          </HStack>
          <div className="relative z-0 w-full mb-10 group">
            <input
              type="text"
              name="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
              onChange={(e) => setCity(e.target.value)}
              placeholder=" "
              required
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              City:
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-10 group">
          <input
            type="email"
            name="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email:
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative z-0 w-full mb-10 group">
            <input
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
              onChange={handlePasswordChange}
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password:
            </label>
          </div>
          <div className="relative z-0 w-full mb-10 group">
            <input
              type="password"
              name="secondPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
              onChange={handleSecondPasswordChange}
              placeholder=" "
              required
            />
            <label
              htmlFor="secondPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm Password:
            </label>
          </div>
        </div>
        {match === false ? (
          <div className="mb-4 span-2">
            <p className="block text-red-600 text-center text-sm font-bold mb-2">
              Passwords do not match
            </p>
          </div>
        ) : (
          <p></p>
        )}
        {alert ? (
          <div className="mb-4 span-2">
            <p className="block text-green-400 text-center text-sm font-bold mb-2 rounded">
              Register Succes
            </p>
          </div>
        ) : (
          <p></p>
        )}
        <button className="bg-green-500 hover:bg-green-600 text-white w-full font-bold py-2 px-4 rounded transform transition duration-300 hover:scale-105">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterSeller;
