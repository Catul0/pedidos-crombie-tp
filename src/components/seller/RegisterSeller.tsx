"use client"
import { useEffect, useState } from 'react';
import { useLocalProfiles } from '@/context/LocalProfileContext';
import { useRouter } from 'next/navigation';
import { decode } from 'jsonwebtoken';

function RegisterSeller() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [match, setMatch] = useState(false);
  const [contador, setContador] = useState(0);
  const [alert, setAlert] = useState(false);
  const [email, setEmail] = useState('');
  const { createLocalProfile } = useLocalProfiles()
  const router = useRouter();


  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setMatch(password === secondPassword);
        setContador(contador + 1);
        if (password === secondPassword) {
          setAlert(true)
          await createLocalProfile({
            name,
            description,
            address,
            city,
            email,
            password,
          });
          const token = localStorage.getItem('token');
          if (token) router.push(`/sellers/${(decode(token) as { id: string })?.id}`);
        } else {
          setAlert(false);
        }
      }}
      className="max-w-md mx-auto p-4 bg-white rounded shadow "
    >
      <div className='grid grid-cols-2 gap-4'>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <input
            type="text"
            name="description"
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
          <input
            type="text"
            name="address"
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
      </div>
      <div className="mb-4 span-2">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input
          type="email"
          name="email"
          className="w-full border border-gray-300 rounded p-2"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='grid grid-cols-2 gap-4'>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Repeat Password:</label>
          <input
            type="password"
            name="secondPassword"
            className="w-full border border-gray-300 rounded p-2"
            onChange={(e) => setSecondPassword(e.target.value)}
            required
          />
        </div>
      </div>
      {
        (match == false && contador > 0) ? <div className="mb-4 span-2"><p className="block text-white text-center bg-[#A53021] text-sm font-bold mb-2">Passwords do not match</p></div> : <p></p>
      }
      {
        alert ? <div className="mb-4 span-2"><p className="block text-white text-center bg-green-400 text-sm font-bold mb-2 rounded">Register Succes</p></div> : <p></p>
      }
      <button
        className="col-span-2 bg-[#C63D2F] hover:bg-[#A53021] text-white font-bold py-2 px-4 rounded"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterSeller;
