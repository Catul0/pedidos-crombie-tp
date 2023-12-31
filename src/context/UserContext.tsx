"use client";
import { createContext, useContext, useState } from "react";
import { User, CreateUser, UpdateUser } from "@/interfaces/User";
import { User as UserPrisma } from "@prisma/client";
interface Children {
  children: React.ReactNode;
}

export const UserContext = createContext<{
  users: User[];
  userProfiles: User[];
  loadUsers: () => Promise<void>;
  loaduserProfile: (id: number) => Promise<void>;
  createUser: (user: CreateUser) => Promise<void>;
  updateUser: (id: number, user: UpdateUser) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  selectedUser: UserPrisma | null;
  setSelectedUser: (user: UserPrisma | null) => void;
}>({
  users: [],
  userProfiles: [],
  loadUsers: async () => {},
  loaduserProfile: async (id: number) => {},
  createUser: async (user: CreateUser) => {},
  updateUser: async (id: number, user: UpdateUser) => {},
  deleteUser: async (id: number) => {},
  selectedUser: null,
  setSelectedUser: (seller: UserPrisma | null) => {},
});

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used whithin a UsersProviders");
  }
  return context;
};

export const UsersProvider = ({ children }: Children) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userProfiles, setuserProfiles] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserPrisma | null>(null);

  // trae todos los usuarios
  async function loadUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  }

  // cargar info de un usuario
  async function loaduserProfile(id: number) {
    try {
      const res = await fetch("/api/users/" + id);
      const data = await res.json();
      setuserProfiles(data);
    } catch (error) {
      console.log(error);
    }
  }

  //crear nuevo usuario
  const [user, setUser] = useState(null);
  async function createUser(user: CreateUser) {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-Type": "application/json",
      },
    });
    const data = await res.json();
    const newUser = data.user;
    setUser(newUser);
    setUsers([...users, newUser]);
  }

  //esta funcion es para eliminar y elimina del estado el usuario eliminado
  async function deleteUser(id: number) {
    const res = await fetch("/api/users/" + id, {
      method: "DELETE",
    });
    setUsers(users.filter((user) => user.id != id));
  }

  //esta funcion es para actualizar la informacion de un usuario
  async function updateUser(id: number, user: UpdateUser) {
    const res = await fetch("/api/users/" + id, {
      body: JSON.stringify(user),
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
    });
    const data = await res.json();
    setUsers(users.map((user) => (user.id === id ? data : user)));
  }

  return (
    <UserContext.Provider
      value={{
        users,
        loadUsers,
        createUser,
        updateUser,
        deleteUser,
        userProfiles,
        loaduserProfile,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
