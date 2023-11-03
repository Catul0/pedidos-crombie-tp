"use client";
import { useState } from "react";
import { useUsers } from "@/context/UserContext";
import Cookies from "js-cookie";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/navigation";

function RegisterUser() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const router = useRouter();
  const [match, setMatch] = useState(true);
  const { createUser } = useUsers();
  const [secondPassword, setSecondPassword] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setMatch(password === secondPassword);
        if (password === secondPassword) {
          setAlert(true);
          await createUser({
            name,
            lastName,
            phone,
            address,
            city,
            email,
            password,
          });
          const token: any = Cookies.get("token");
          setTimeout(() => {
            if (token)
              router.push(`/users/${(decode(token) as { id: string })?.id}`);
          }, 3000);
        } else {
          setAlert(false);
        }
      }}
      className="max-w-md mx-auto p-8 bg-opacity-80 bg-white rounded-lg drop-shadow-2xl" 
    >
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-950 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
            onChange={(e) => setName(e.target.value)}
            placeholder=""
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-slate-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Name:
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="LastName"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-950 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
            onChange={(e) => setLastName(e.target.value)}
            placeholder=""
          />
          <label className="peer-focus:font-medium absolute text-sm text-slate-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            LastName:
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-950 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
            onChange={(e) => setPhone(e.target.value)}
            placeholder=""
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-slate-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Phone:
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="adress"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-950 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
            onChange={(e) => setAddress(e.target.value)}
            placeholder=""
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-slate-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Address:
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-950 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
            onChange={(e) => setCity(e.target.value)}
            placeholder=""
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-slate-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            City:
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-950 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-slate-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email:
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-950 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-slate-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password:
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-950 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
            onChange={(e) => setSecondPassword(e.target.value)}
            placeholder=""
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-slate-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Confirm Password:
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
      <button className=" bg-black text-white hover:bg-green-500 w-[100%] font-bold py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-x hover:scale-105 duration-300">
        Register
      </button>
    </form>
  );
}

export default RegisterUser;
