"use client"
import {useState,useEffect} from 'react';
import { useLocalProfiles } from '@/context/LocalProfileContext';

function EditSeller() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [logo, setLogo] = useState('');

    const {updateLocalProfile, selectedSeller, setSelectedSeller} = useLocalProfiles()

    useEffect(()=>{
        setName(selectedSeller?.name||"");
        setAddress(selectedSeller?.address || "");
        setCity(selectedSeller?.city || "");
        setLogo(selectedSeller?.logo ||"");
        setDescription(selectedSeller?.description||"");
    },[selectedSeller])
  return (
<form
  onSubmit={async (e) => {
    e.preventDefault();
    let id=1;
    if(selectedSeller?.id){
        id=selectedSeller.id
    }
    
    await updateLocalProfile(id,{
      name,
      description,
      address,
      city,
      logo
    });
    console.log(id)
    setSelectedSeller(null);
  }}
  className="max-w-md mx-auto p-4 bg-white rounded shadow "
>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
    <input
      type="text"
      name="name"
      value={name}
      className="w-full border border-gray-300 rounded p-2"
      onChange={(e) => setName(e.target.value)}
    />
  </div>
  
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
    <input
      type="text"
      name="address"
      value={address}
      className="w-full border border-gray-300 rounded p-2"
      onChange={(e) => setAddress(e.target.value)}
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
    <input
      type="text"
      name="city"
      value={city}
      className="w-full border border-gray-300 rounded p-2"
      onChange={(e) => setCity(e.target.value)}
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Logo:</label>
    <input
      type="text"
      name="logo"
      value={logo}
      className="w-full border border-gray-300 rounded p-2"
      onChange={(e) => setLogo(e.target.value)}
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
    <textarea
      name="description"
      value={description}
      className="w-full border border-gray-300 rounded p-2"
      onChange={(e) => setDescription(e.target.value)}
    />
  </div>
  <button
    className="col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Update
  </button>
</form>
  );
}

export default EditSeller;