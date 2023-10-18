"use client"
import { useState } from 'react';
import { useUsers } from '@/context/UserContext';
import Cookies from 'js-cookie';
import { decode } from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

function RegisterUser() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false);
  const router = useRouter();
  const [match, setMatch] = useState(true);
  const { createUser } = useUsers()
  const [secondPassword, setSecondPassword] = useState('');
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setMatch(password === secondPassword)
        if (password === secondPassword) {
          setAlert(true)
          await createUser({
            name,
            lastName,
            phone,
            address,
            city,
            email,
            password,
          });
          const token: any = Cookies.get('token');
          setTimeout(() => {
            if (token) router.push(`/users/${(decode(token) as { id: string })?.id}`);
          }, 3000)
        } else {
          setAlert(false);
        }

      }}
      className='max-w-md mx-auto p-4 bg-white rounded shadow'
    >
      <div className=" grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">LastName:</label>
          <input
            type="text"
            name="LastName"
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
          <input
            type="text"
            name="phone"
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
          <input
            type="text"
            name="adress"
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
          <input
            type="text"
            name="city"
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e) => setSecondPassword(e.target.value)}
            required
          />
        </div>
      </div>
      {
        (match === false) ? <div className="mb-4 span-2"><p className="block text-white text-center bg-[#A53021] text-sm font-bold mb-2">Passwords do not match</p></div> : <p></p>
      }
      {
        alert ? <div className="mb-4 span-2"><p className="block text-white text-center bg-green-400 text-sm font-bold mb-2 rounded">Register Succes</p></div> : <p></p>
      }
      <button
        className=" bg-[#C63D2F] hover:bg-[#A53021] text-white  w-[100%] font-bold py-2 px-4 rounded"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterUser;
