"use client";
import { useEffect, useState } from "react";
import { useLocalProfiles } from "@/context/LocalProfileContext";
import Cookies from "js-cookie";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/navigation";

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
  const { createLocalProfile } = useLocalProfiles();
  const router = useRouter();

  return (
      <form
        onSubmit={async (e) => {
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
                router.push(
                  `/sellers/${(decode(token) as { id: string })?.id}`
                );
            }, 3000);
          } else {
            setAlert(false);
          }
        }}
        className="max-w-md mx-auto p-8 bg-opacity-80 bg-white rounded-lg drop-shadow-2xl "
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-4 group">
            <input
              type="text"
              name="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-600 focus:outline-none focus:ring-0 focus:border-black peer"
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-fuchsia-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Name:
            </label>
          </div>
          <div className="relative z-0 w-full mb-4 group">
            <input
              type="text"
              name="description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-600 focus:outline-none focus:ring-0 focus:border-black peer"
              onChange={(e) => setDescription(e.target.value)}
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-fuchsia-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Description:
            </label>
          </div>
          <div className="relative z-0 w-full mb-10 group">
            <input
              type="text"
              name="address"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-600 focus:outline-none focus:ring-0 focus:border-black peer"
              onChange={(e) => setAddress(e.target.value)}
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-fuchsia-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Address:
            </label>
          </div>
          <div className="relative z-0 w-full mb-10 group">
            <input
              type="text"
              name="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-600 focus:outline-none focus:ring-0 focus:border-black peer"
              onChange={(e) => setCity(e.target.value)}
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-fuchsia-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              City:
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-10 group">
          <input
            type="email"
            name="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-600 focus:outline-none focus:ring-0 focus:border-black peer"
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-fuchsia-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email:
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative z-0 w-full mb-10 group">
            <input
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-600 focus:outline-none focus:ring-0 focus:border-black peer"
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-fuchsia-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password:
            </label>
          </div>
          <div className="relative z-0 w-full mb-10 group">
            <input
              type="password"
              name="secondPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-600 focus:outline-none focus:ring-0 focus:border-black peer"
              onChange={(e) => setSecondPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-fuchsia-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Repeat Password:
            </label>
          </div>
        </div>
        {match === false ? (
          <div className="mb-4 span-2">
            <p className="block text-white text-center bg-red-600 text-sm font-bold mb-2">
              Passwords do not match
            </p>
          </div>
        ) : (
          <p></p>
        )}
        {alert ? (
          <div className="mb-4 span-2">
            <p className="block text-white text-center bg-green-400 text-sm font-bold mb-2 rounded">
              Register Succes
            </p>
          </div>
        ) : (
          <p></p>
        )}
        <button className=" bg-red-600 text-white  w-[100%] font-bold py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-x hover:scale-105 duration-300">
          Register
        </button>
      </form>
  );
}

export default RegisterSeller;
