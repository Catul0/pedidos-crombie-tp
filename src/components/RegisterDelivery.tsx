"use client"
import {useState} from 'react';
import { useDeliverys } from '@/context/DeliveryContext';

function RegisterDelivery() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {createDelivery} = useDeliverys()

  return (
<form
  onSubmit={async (e) => {
    e.preventDefault();
    await createDelivery({
      name,
      lastName,
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

export default RegisterDelivery;
