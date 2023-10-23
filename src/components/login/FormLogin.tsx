"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useLogin } from '@/context/LoginContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { decode } from 'jsonwebtoken';

function FormLogin() {
  const [error, setError] = useState("");
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
    }else if ( userType=="seller"){
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
        // aca tengo que obtener el id del usuario mediante su cookie 
        const token: any = Cookies.get('token');
        if (token) router.push(`/${userType}s/${(decode(token) as { id: string })?.id}`);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
  };

  return (
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Iniciar sesión</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Tipo de usuario:
          </label>
          <div className="flex space-x-2">
            <button
              className={`flex-1 py-1 px-2 rounded-md ${userType === 'user' ? 'bg-[#FF441F] text-white' : 'bg-gray-300 text-gray-600'}`}
              onClick={() => setUserType("user")}
            >
              Usuario
            </button>
            <button
              className={`flex-1 py-1 px-2 rounded-md ${userType === 'delivery' ? 'bg-[#FF441F] text-white' : 'bg-gray-300 text-gray-600'}`}
              onClick={() => setUserType("delivery")}
            >
              Delivery
            </button>
            <button
              className={`flex-1 py-1 px-2 rounded-md ${userType === 'seller' ? 'bg-[#FF441F] text-white' : 'bg-gray-300 text-gray-600'}`}
              onClick={() => setUserType("seller")}
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
          {error && (
            <div className="text-red-600 mb-2">
              {error}
            </div>
          )}

          <button type="submit" className="w-full py-2 px-4 bg-[#FF441F] text-white rounded-md hover:bg-[#A53021] mb-4">
            Iniciar sesión
          </button>
          <p className='text-sm'>Todavía no tienes una cuenta? <span onClick={()=>{ goRegister()}} className='text-[#FF441F] cursor-pointer text-sm'>Registrate aquí</span></p>

        </form>
      </div>
  );
}

export default FormLogin;