import React from 'react';
import { useCart } from '@/context/CartContext';

function Cart() {
  const { cart } = useCart();

  return (
    <div className="text-center bg-gray-100 p-4 rounded-lg">
      <h2 className="text-gray-800 text-2xl font-bold mb-4"><b>Carrito de Compras</b></h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío :(</p>
      ) : (
        <ul className="list-none p-0">
          {cart.map((item) => (
            <li key={item.id} className="mb-2 p-4 bg-white rounded-md">
              {item.productName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
