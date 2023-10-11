"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useLogin } from '@/context/LoginContext';
import { useRouter } from 'next/navigation';
import { decode } from 'jsonwebtoken';

function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const router = useRouter();
  const {login} = useLogin()
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  function goRegister(){
    if(userType=="user"){
      router.push("/users/register");
    }else if ( userType=="local"){
      router.push("/sellers/register");
    }else if ( userType=="delivery"){
      router.push("/deliverys/register");
    }
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        await login({
          email,
          password,
          userType,
        });
        const token = localStorage.getItem('token');
        if (token) router.push('/users/' + (decode(token) as { id: string })?.id);
      } catch (error) {
        if (error instanceof Error) {
          alert('Error de inicio de sesión: ' + error.message);
        }
      }
  };

  return (
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Iniciar sesión</h2>
        <div className="mb-4">
          <label htmlFor="userType" className="block text-sm font-medium text-gray-600">
            Tipo de usuario:
          </label>
          <div className="flex space-x-2">
            <button
              className={`flex-1 py-1 px-2 rounded-md ${userType === 'user' ? 'bg-[#C63D2F] text-white' : 'bg-gray-300 text-gray-600'}`}
              onClick={() => setUserType("user")}
            >
              Usuario
            </button>
            <button
              className={`flex-1 py-1 px-2 rounded-md ${userType === 'delivery' ? 'bg-[#C63D2F] text-white' : 'bg-gray-300 text-gray-600'}`}
              onClick={() => setUserType("delivery")}
            >
              Delivery
            </button>
            <button
              className={`flex-1 py-1 px-2 rounded-md ${userType === 'local' ? 'bg-[#C63D2F] text-white' : 'bg-gray-300 text-gray-600'}`}
              onClick={() => setUserType("local")}
            >
              Local
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Correo electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-[#C63D2F] text-white rounded-md hover:bg-[#A53021]">
            Iniciar sesión
          </button>
          <button type="button" onClick={()=>{ goRegister()}} className="w-full py-2 mt-2 px-4 bg-gray-300 text-gray-600 rounded-md hover:bg-gray-600 hover:text-gray-300">
            Registrarse
          </button>
        </form>
      </div>
  );
}

export default FormLogin;
