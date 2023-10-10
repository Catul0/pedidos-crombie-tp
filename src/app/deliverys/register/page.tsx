import React, { useState } from 'react';
import RegisterDelivery from '@/components/delivery/RegisterDelivery';
import CreateVehicle from '@/components/vehicle/createVehicle';
import Navbar from '@/components/Navbar';

const DeliverysRegister = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="h-screen bg-gray-100">
      <Navbar text="Pedidos Crombie - ¡Reparte con nosotros! 🛵🚲" />
      <div className="flex items-center justify-center my-40">
        {step === 1 && <RegisterDelivery />}
        {step === 2 && <CreateVehicle params={}/>}
      </div>
    </div>
  );
};

export default DeliverysRegister;
