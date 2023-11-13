import React from "react";
import { Vehicle } from "@prisma/client";

export default function VehicleCard({ car }: { car: Vehicle }) {
  return (
    <>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Tu vehiculo
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Marca: <span className="text-black font-semibold">{car?.brand}</span>
        </p>
        <p className="font-normal text-gray-700 dark-text-gray-400">
          Modelo: <span className="text-black font-semibold">{car?.model}</span>
        </p>
        <p className="font-normal text-gray-700 dark-text-gray-400">
          Color: <span className="text-black font-semibold">{car?.color}</span>
        </p>
        <p className="font-normal text-gray-700 dark-text-gray-400">
          Año: <span className="text-black font-semibold">{car?.year}</span>
        </p>
        <p className="font-normal text-gray-700 dark-text-gray-400">
          Patente: <span className="text-black font-semibold">{car?.licensePlate}</span>
        </p>
      </div>
    </>
  );
}
