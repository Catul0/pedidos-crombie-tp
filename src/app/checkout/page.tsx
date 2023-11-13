/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Cookies from 'js-cookie';
import { decode } from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

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
  const [userAddress, setUserAddress] = useState("");
  const [userCity, setUserCity] = useState("");
  const [sellerData, setSellerData] = useState<any>({});
  const [orderResult, setOrderResult] = useState(null);
  const token: any = Cookies.get("token");
  const decodedToken: any = decode(token);
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedTotal = localStorage.getItem("total");

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
          console.error("Error al obtener la dirección del usuario:", error);
        });
    }
  }, []);

  useEffect(() => {
    const fetchSellerData = async (sellerId: number) => {
      try {
        const response = await fetch(`api/locals/${sellerId}`);
        if (response.ok) {
          const sellerData = await response.json();
          setSellerData(sellerData)
        } else {
          console.error(
            `Error al obtener los datos del vendedor con sellerId: ${sellerId}`,
          );
        }
      } catch (error) {
        console.error("Error al obtener los datos del vendedor:", error);
      }
    };
    const firstCartItem = cartItems[0];
    if (firstCartItem && firstCartItem.sellerId) {
      fetchSellerData(firstCartItem.sellerId);
    }
  }, [cartItems]);

  const handleTipChange = (event: any) => {
    const newTip = parseFloat(event.target.value);
    setTipAmount(isNaN(newTip) ? 0 : newTip);
  };

  const createOrder = () => {
    const orderData = {
      status: "PENDIENTE",
      products: cartItems.map((product) => product.id).join(","),
      sellerId: sellerData.id,
      userId: decodedToken.id,
    };

    fetch("api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        setOrderResult(data);
        router.push("/users/"+orderData.userId)
      })
      .catch((error) => {
        console.error("Error al crear la orden:", error);
      });
  };

  return (
    <div>
      <Navbar text="Pedidos Crombie - Checkout" />
      <div className="w-full h-auto flex py-10 items-center flex-col bg-[#F7F8F9]">
        <div className="w-4/5 flex justify-center gap-5 flex-row">
          {/* izq */}
          <div className="w-3/5 flex flex-col gap-5">
            {/* direccion */}
            <div className="w-full bg-white border rounded border-gray-300">
              <div className="w-full border-b border-gray-300 p-3">
                <h1 className="font-black">Dirección de entrega</h1>
              </div>
              <div className="w-full flex justify-between p-3">
                <p>
                  {userAddress}, {userCity}, Argentina
                </p>
                <button className="text-green-500 font-bold">Cambiar</button>
              </div>
            </div>
            {/* local y productos */}
            <div className="w-full bg-white border rounded border-gray-300">
              <div className="w-full border-b border-gray-300 p-3 flex gap-3 items-center">
                <img
                  alt=""
                  className="rounded-full w-12 h-12 object-cover object-center"
                  src={sellerData.logo}
                />
                <h1 className="font-black">{sellerData.name}</h1>
              </div>
              <div className="w-full p-3">
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index}>
                      <div className="flex flex-row gap-5">
                        <img className="w-20" src={item.image} alt="" />
                        <div>
                          <p>
                            <b>{item.productName}</b>
                          </p>
                          <p>{item.description}</p>
                          <p>
                            <b>${item.price}</b>
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* metodo de pago */}
            <div className="w-full bg-white border rounded border-gray-300">
              <div className="w-full border-b border-gray-300 p-3">
                <h1 className="font-black">Método de pago</h1>
              </div>
              <div className="w-full flex justify-between p-3">
                <p>Efectivo</p>
              </div>
            </div>
          </div>
          {/* resumen */}
          <div className="w-2/5 bg-[#F7F8F9] flex flex-col gap-5">
            <div className="w-full bg-white border rounded border-gray-300">
              <div className="w-full border-b border-gray-300 p-3">
                <h1 className="font-black f">Resumen</h1>
              </div>
              <div className="w-full flex justify-between p-3">
                <p>Costo de productos</p>
                <p>${subtotal}</p>
              </div>
              <div className="w-full flex justify-between p-3">
                <p>Tarifa de servicio</p>
                <p>$100</p>
              </div>
              <div className="w-full flex justify-between p-3">
                <p>Costo de envío</p>
                <p className="text-blue-700">
                  <b>Envío gratis</b>
                </p>
              </div>
              <div className="w-full flex justify-between p-3">
                <p>Propina Crombie Delivery</p>
                <input
                  className="w-12 rounded border border-gray-400"
                  type="text"
                  value={tipAmount}
                  onChange={handleTipChange}
                />
              </div>
              <div className="w-full flex justify-between p-3">
                <p>
                  <b>Total</b>
                </p>
                <p>
                  <b>{`$${subtotal + 100 + tipAmount}`}</b>
                </p>
              </div>
            </div>
            <button
              onClick={createOrder}
              className="w-full font-bold bg-green-400 hover:bg-green-500 rounded text-white py-3"
            >
              Hacer pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
