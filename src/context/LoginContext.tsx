"use client"
import { createContext, useContext, useState } from 'react';

// Define una interfaz para los datos del usuario después de iniciar sesión
interface User {
  id: number;
  userType: string; // Puedes usar 'user', 'delivery' o 'local'
}

// Define una interfaz para los datos que se enviarán al iniciar sesión
interface LoginData {
  email: string;
  password: string;
  userType: string;
}

interface Children {
    children: React.ReactNode;
}

// Crea el contexto de inicio de sesión
export const LoginContext = createContext<{
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}>({
  user: null,
  login: async (data: LoginData) => {},
  logout: () => {},
});

// Hook personalizado para usar el contexto de inicio de sesión
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};

// Componente proveedor de inicio de sesión
export const LoginProvider = ({ children }: Children) => {
  const [user, setUser] = useState<User | null>(null);

  // Función para iniciar sesión
  const login = async (data: LoginData) => {
    // Realiza la lógica de autenticación aquí
    // Por ejemplo, puedes enviar una solicitud al servidor para verificar las credenciales y obtener el tipo de usuario
    // Después de autenticar, establece el usuario en el estado
    // Ejemplo:
    try {
        // Realiza la lógica de autenticación aquí y obtén la respuesta de la API
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
    
        if (response.ok) {
          // Si la respuesta es exitosa, establece el usuario en el estado
          setUser(result.user);
          const newToken = result.token;
          localStorage.setItem('token', newToken);
        } else {
          // Si la respuesta indica un error, lanza un error con el mensaje del error
          throw new Error(result.message);
        }
      } catch (error) {
        throw error; // Propaga el error al componente que llamó a la función login
      }
  };

  // Función para cerrar sesión
  const logout = () => {
    // Lógica para cerrar sesión (por ejemplo, eliminar el token o los datos del usuario)
    // Después de cerrar sesión, establece el usuario en null
    // setUser(null);
  };

  return (
    <LoginContext.Provider value={{ user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
