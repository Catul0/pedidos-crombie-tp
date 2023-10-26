"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Cookies from 'js-cookie';
import { decode } from 'jsonwebtoken';

type Product = {
  id: number;
  productName: string;
  description: string;
  price: number;
  image: string;
  sellerId: number;
  count?: number;
};

function Checkout() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [subtotal, setSubTotal] = useState<number>(0);
  const [tipAmount, setTipAmount] = useState(100);
  const [userAddress, setUserAddress] = useState('');
  const [userCity, setUserCity] = useState('');
  const token: any = Cookies.get('token');
  const decodedToken: any = decode(token);


  useEffect(() => {
    // Recupera los datos del carrito almacenados en el localStorage
    const savedCart = localStorage.getItem('cart');
    const savedTotal = localStorage.getItem('total')

    if (savedCart) {
      const parsedCart: Product[] = JSON.parse(savedCart);
      setCartItems(parsedCart);
    }

    if (savedTotal) {
      const parsedTotal = JSON.parse(savedTotal);
      setSubTotal(parsedTotal);
    }

    if (decodedToken.id) {
      fetch(`api/users/${decodedToken.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.address) {
            setUserAddress(data.address);
          }
          if (data.city) {
            setUserCity(data.city);
          }
        })
        .catch((error) => {
          console.error('Error al obtener la dirección del usuario:', error);
        });
    }
  }, []);

  const handleTipChange = (event: any) => {
    const newTip = parseFloat(event.target.value);
    setTipAmount(isNaN(newTip) ? 0 : newTip);
  };

  return (
    <div>
      <Navbar text='Pedidos Crombie - Checkout'/>
      <div className='w-full flex py-10 items-center flex-col bg-[#F7F8F9]'>
        <div className='w-4/5 flex justify-center gap-5 flex-row'>
          {/* izq */}
          <div className='w-3/5 flex flex-col gap-5'>
            {/* direccion */}
            <div className='w-full bg-white border rounded border-gray-300'>
              <div className='w-full border-b border-gray-300 p-3'>
                    <h1 className='font-black'>Dirección de entrega</h1>
              </div>
              <div className='w-full flex justify-between p-3'>
                <p>{userAddress}, {userCity}, Argentina</p>
                <button className='text-green-500 font-bold'>Cambiar</button>
              </div>
            </div>
            {/* local y productos */}
            <div className='w-full bg-white border rounded border-gray-300'>
              <div className='w-full border-b border-gray-300 p-3 flex gap-3 items-center'>
                  <img className='rounded-full w-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/McDonald%27s_logo.svg/1280px-McDonald%27s_logo.svg.png" alt="" />
                  <h1 className='font-black'>McDonalds</h1>
              </div>
              <div className='w-full p-3'>
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index}>
                    <p><b>{item.productName}</b></p>
                    <p><b>{item.description}</b></p>
                    <p><b>{item.price}</b></p>
                  </li>
                ))}
              </ul>
              </div>
            </div>
            {/* metodo de pago */}
            <div className='w-full bg-white border rounded border-gray-300'>
              <div className='w-full border-b border-gray-300 p-3'>
                    <h1 className='font-black'>Método de pago</h1>
              </div>
              <div className='w-full flex justify-between p-3'>
                <p>Efectivo</p>
              </div>
            </div>
          </div>
          {/* resumen */}
          <div className='w-2/5 bg-white flex flex-col gap-5'>
            <div className='w-full bg-white border rounded border-gray-300'>
              <div className='w-full border-b border-gray-300 p-3'>
                <h1 className='font-black f'>Resumen</h1>
              </div>
              <div className='w-full flex justify-between p-3'>
                <p>Costo de productos</p>
                <p>${subtotal}</p>
              </div>
              <div className='w-full flex justify-between p-3'>
                <p>Tarifa de servicio</p>
                <p>$100</p>
              </div>
              <div className='w-full flex justify-between p-3'>
                <p>Costo de envío</p>
                <p className='text-blue-700'><b>Envío gratis</b></p>
              </div>
              <div className='w-full flex justify-between p-3'>
                <p>Propina Crombie Delivery</p>
                <input
                  className='w-12 rounded border border-gray-400'
                  type="text"
                  value={tipAmount}
                  onChange={handleTipChange}
                />
              </div>
              <div className='w-full flex justify-between p-3'>
                <p><b>Total</b></p>
                <p><b>{`$${(subtotal + 100 + tipAmount)}`}</b></p>
              </div>
            </div>
            <button className='w-full font-bold bg-green-400 hover:bg-green-500 rounded text-white py-3'>Hacer pedido</button>
          </div>
        </div>
        {/* <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <p>Producto: {item.productName}</p>
              <p>Descripción: {item.description}</p>
              <p>Precio: ${item.price}</p>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}

export default Checkout;
