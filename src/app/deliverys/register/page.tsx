import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import RegisterDelivery from '@/components/Delivery/RegisterDelivery';


const DeliverysRegister = () => {

  return (
    <div className="h-screen bg-gray-100">
      <Navbar text="Pedidos Crombie - ¡Reparte con nosotros! 🛵🚲" />
      <div className="flex items-center justify-center my-40">
        <RegisterDelivery />
      </div>
    </div>
  );
};

export default DeliverysRegister;
