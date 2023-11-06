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
  const { createDelivery } = useDeliverys();
  const [match, setMatch] = useState(true);
  const [alert, setAlert] = useState(false);
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const imagenUrl =
    "https://style.shockvisual.net/wp-content/uploads/2021/01/happy-delivery-man-with-yellow-backpack-riding-mot-AXKXGMY-scaled.jpg";

  return (
    <div
      className="flex absolute top-16  justify-center items-center w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${imagenUrl})` }}
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setMatch(password === confirmPassword);

          if (password === confirmPassword) {
            setAlert(true);
            await createDelivery({
              name,
              lastName,
              email,
              password,
            });

            const token = Cookies.get("token");
            if (token) {
              setTimeout(() => {
                router.push(
                  `/deliverys/${(decode(token) as { id: string })?.id}`
                );
              }, 3000);
            }
          } else {
            setAlert(false);
          }
        }}
        className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md "
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative z-0 w-full mb-8 group">
            <input
              type="text"
              name="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-fuchsia-600 focus:outline-none focus:ring-0 focus:border-black peer"
              onChange={(e) => setName(e.target.value)}
              placeholder=""
              required
            />
            <label
              form=""
              className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name:
            </label>
          </div>
          <div className="relative z-0 w-full mb-8 group">
            <input
              type="text"
              name="LastName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
              onChange={(e) => setLastName(e.target.value)}
              placeholder=""
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              LastName:
            </label>
          </div>
         </div>
          <div className="relative z-0 w-full mb-8 group">
            <input
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email:
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative z-0 w-full mb-8 group">
              <input
                type="password"
                name="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Password:
              </label>
            </div>
            <div className="relative z-0 w-full mb-8 group">
              <input
                type="password"
                name="confirmPassword"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-black peer"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder=""
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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

export default RegisterDelivery;
