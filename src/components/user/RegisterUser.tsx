"use client";
import { useRef, useState } from "react";
import { useUsers } from "@/context/UserContext";
import Cookies from "js-cookie";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/navigation";
import {

  HStack,
  Input
} from '@chakra-ui/react';
import {  useJsApiLoader, Autocomplete } from '@react-google-maps/api';
require('dotenv').config();


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
  const directionRef = useRef<HTMLInputElement | null>(null);
  const imagenUrl = "https://www.openenglish.com/blog/es/wp-content/uploads/sites/2/2016/03/como-pedir-una-hamburguesa.jpg";
  
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY || '',
    libraries: ['places'],
  });
  
  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-[800px] bg-cover bg-center" style={{ backgroundImage: `url(${imagenUrl})`}}>
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setMatch(password === secondPassword);
        
        if (password === secondPassword) {
          setAlert(true);
          setTimeout(async ()=>{
            await createUser({
              name,
              lastName,
              phone,
              address,
              city,
              email,
              password,
            });
          },1000)
          
          const token: any = Cookies.get("token");
          setTimeout(() => {
            if (token)
              router.push(`/users/${(decode(token) as { id: string })?.id}`);
          }, 1500);
        } else {
          setAlert(false);
        }
      }}
      className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md" 
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
        <HStack className="relative z-0 w-full mb-6 group">
        <Autocomplete>
          <Input
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-950 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
            ref={directionRef}
            onBlur={(e)=>{
              setAddress(directionRef.current!.value)
            }}
            
            placeholder=""
            required
          />
          </Autocomplete>
          <label className="peer-focus:font-medium absolute text-sm text-slate-950 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Address:
          </label>
        </HStack>
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

export default RegisterUser;
