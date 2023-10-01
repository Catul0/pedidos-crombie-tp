"use client"
import {useState} from 'react';
import { useUsers } from '@/context/UserContext';

function RegisterUser() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {createUser} = useUsers()

  return (
<form
  onSubmit={async (e) => {
    e.preventDefault();
    await createUser({
      name,
      lastName,
      phone,
      address,
      city,
      email,
      password,
    });
  }}
  className="max-w-md mx-auto p-4 bg-white rounded shadow grid grid-cols-2 gap-4"
>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
    <input
      type="text"
      name="name"
      className="w-full border border-gray-300 rounded p-2"
      onChange={(e) => setName(e.target.value)}
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
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
    <input
      type="text"
      name="adress"
      className="w-full border border-gray-300 rounded p-2"
      onChange={(e) => setAddress(e.target.value)}
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
    <input
      type="text"
      name="city"
      className="w-full border border-gray-300 rounded p-2"
      onChange={(e) => setCity(e.target.value)}
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
    <input
      type="email"
      name="email"
      className="w-full border border-gray-300 rounded p-2"
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
    <input
      type="password"
      name="password"
      className="w-full border border-gray-300 rounded p-2"
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>
  <button
    className="col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Register
  </button>
</form>
  );
}

export default RegisterUser;
