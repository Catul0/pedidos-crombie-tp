import React from 'react'
import { Vehicle } from '@prisma/client'

export default function VehicleCard( {car}:{car:Vehicle} ) {
    return (
        <>
              <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Deliverys Vehicle</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Brand: {car?.brand}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Model: {car?.model}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Color: {car?.color}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Year: {car?.year}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Locense Plate: {car?.licensePlate}</p>
                </div>

        </>
    )
}
