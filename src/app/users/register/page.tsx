"use client";
import React from "react";
import RegisterUser from "@/components/user/RegisterUser";
import Navbar from "@/components/Navbar";

const RegisterUsers = () => {
	return (
		<div>
			<Navbar text="Pedidos Crombie - Disfruta de lo mejor!" />
			<div className="flex flex-col sm:flex-row items-center justify-center h-screen bg-gray-100">
				<RegisterUser />
			</div>
		</div>
	);
};

export default RegisterUsers;
