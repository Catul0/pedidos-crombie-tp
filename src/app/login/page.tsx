"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useLogin } from '@/context/LoginContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');

  const {login} = useLogin()

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUserTypeChange = (type: string) => {
    setUserType(type);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        await login({
          email,
          password,
          userType,
        });
        const token = localStorage.getItem('token');
        if(token){
          alert('Inicio de sesion con exito')
        }
      } catch (error) {
        if (error instanceof Error) {
          alert('Error de inicio de sesión: ' + error.message);
        }
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Iniciar sesión</h2>
        <div className="mb-4">
          <label htmlFor="userType" className="block text-sm font-medium text-gray-600">
            Tipo de usuario:
          </label>
          <div className="flex space-x-2">
            <button
              className={`flex-1 py-1 px-2 rounded-md ${userType === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}
              onClick={() => handleUserTypeChange('user')}
            >
              Usuario
            </button>
            <button
              className={`flex-1 py-1 px-2 rounded-md ${userType === 'delivery' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}
              onClick={() => handleUserTypeChange('delivery')}
            >
              Delivery
            </button>
            <button
              className={`flex-1 py-1 px-2 rounded-md ${userType === 'local' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}
              onClick={() => handleUserTypeChange('local')}
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
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
