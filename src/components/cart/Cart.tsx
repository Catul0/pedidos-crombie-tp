import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/interfaces/Product';
import Link from 'next/link';

function Cart() {
  const { cart, total, addToCart, removeFromCart, removeAllFromCart, resetCart } = useCart();

  const productCount: { [key: number]: Product & { count: number } } = {};

  cart.forEach((item) => {
    if (!productCount[item.id]) {
      productCount[item.id] = { ...item, count: 0 };
    }
    productCount[item.id].count++;
  });

  const uniqueCart = Object.values(productCount);

  const handleRemoveAll = (item: any) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar todos los productos de este tipo del carrito?');

    if (confirmed) {
      removeAllFromCart(item);
    }
  };

  const handleResetCart = () => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar todos los productos del carrito?');

    if (confirmed) {
      resetCart();
    }
  };

  return (
    <div className="text-center bg-gray-100 p-4 rounded-lg">
      <h2 className="text-gray-800 text-2xl font-bold mb-4"><b>Carrito de Compras</b></h2>
      {uniqueCart.length === 0 ? (
        <p>Tu carrito está vacío :(</p>
      ) : (
        <div>
          <ul className="list-none p-0">
            {uniqueCart.map((item) => (
              <li key={item.id} className="mb-2 p-4 bg-white rounded-md flex justify-between">
                <div>
                {item.productName}
                </div>
                <div>
                {item.count > 1 && ( <button onClick={() => removeFromCart(item)} className='bg-gray-400 rounded w-5 h-5'>-</button>)}
                 {item.count} 
                <button onClick={() => addToCart(item)} className='bg-gray-400 w-5 h-5 rounded'>+</button>
                 ${item.price * item.count}
                 <button onClick={() => handleRemoveAll(item)} className='bg-gray-400 rounded w-5 h-5'>x</button> 
                </div>
              </li>
            ))}
          </ul>
          <p>Total: ${total}</p>
          <button onClick={() => handleResetCart()} className='bg-red-500 rounded'>vaciar carrito</button>
          <br />
          <Link href={'/checkout'}>
            <button className='bg-green-700 rounded'>Confirmar Compra</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
