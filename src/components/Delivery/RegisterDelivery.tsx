"use client";
import { useState } from "react";
import { useDeliverys } from "@/context/DeliveryContext";
import Cookies from "js-cookie";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/navigation";

function RegisterDelivery() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [match, setMatch] = useState(true);
  const { createDelivery } = useDeliverys();
  const router = useRouter();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setMatch(password === secondPassword);
        if (password === secondPassword) {
          setAlert(true);
          await createDelivery({
            name,
            lastName,
            email,
            password,
          });
          const token: any = Cookies.get("token");
          setTimeout(() => {
            if (token)
              router.push(
                `/deliverys/${(decode(token) as { id: string })?.id}`
              );
          }, 1500);
        } else {
          setAlert(false);
        }
      }}
      className="max-w-md mx-auto p-4 bg-white rounded shadow "
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-600 focus:outline-none focus:ring-0 focus:border-black peer"
            onChange={(e) => setName(e.target.value)}
            placeholder=""
            required
          />
          <label
            form=""
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            First name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="LastName"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
            onChange={(e) => setLastName(e.target.value)}
            placeholder=""
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            LastName:
          </label>
        </div>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="email"
          name="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
          onChange={(e) => setEmail(e.target.value)}
          placeholder=""
          required
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Email:
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password:
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
            onChange={(e) => setSecondPassword(e.target.value)}
            placeholder=""
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
      <button className=" bg-black hover:bg-green-500 text-white  w-[100%] font-bold py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-x hover:scale-105 duration-300">
        Register
      </button>
    </form>
  );
}

export default RegisterDelivery;
