"use client"
import { useVehicles } from '@/context/VehicleContext'
import { useEffect, useState } from 'react'

export default function CreateVehicle({ params }: { params: { id: string } }) {

    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [color, setColor] = useState('');
    const [carYear, setYear] = useState('');

    const { createVehicle } = useVehicles();

    return (
        <div>
            <form className='bg-slate-900 px-4 py-4 rounded-md'
                onSubmit={async (e) => {
                    console.log("SE APRETA EL BOTON ", brand, model, carYear, color, licensePlate,params.id )
                    e.preventDefault();
                    const year = Number(carYear);
                    await createVehicle({ id:0, brand, model, year, color, licensePlate, vehicleOwner:0 }, Number(params.id))
                }
                }
            >
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="brand"
                        id="brand"
                        className="block py-2.5 px-0 w-full text-sm text-blue-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        onChange={(e) => setBrand(e.target.value)}
                        required />
                    <label htmlFor="vehicleName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Vehicle Brand</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="model"
                        id="model"
                        className="block py-2.5 px-0 w-full text-sm text-blue-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        onChange={(e) => setModel(e.target.value)}
                        required />
                    <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Car Model</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="carYear"
                        id="carYear"
                        className="block py-2.5 px-0 w-full text-sm text-blue-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"

                        onChange={(e) => setYear(e.target.value)}
                    />
                    <label
                        htmlFor="image" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Year</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type='text'
                        name="color"
                        id="color"
                        className="block py-2.5 px-0 w-full text-sm text-blue-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    
                        onChange={(e) => setColor(e.target.value)}
                        required />
                    <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Color</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type='text'
                        name="licensePlate"
                        id="licensePlate"
                        className="block py-2.5 px-0 w-full text-sm text-blue-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        onChange={(e) => setLicensePlate(e.target.value)}
                        required />
                    <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">License Plate</label>
                </div>
                <div className='flex justify-between'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">CREATE</button>
                </div>
            </form>


        </div>
    )
}