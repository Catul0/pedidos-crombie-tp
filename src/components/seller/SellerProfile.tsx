"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useLocalProfiles } from "@/context/LocalProfileContext";
import SellersProducts from "./SellersProducts";
import CreateProduct from "../product/CreateProduct";
import EditSeller from "./EditSeller";
import Cart from "../cart/Cart";
import BackButton from "../BackButton";
import { IconShoppingCart } from "@tabler/icons-react";
import { IconBell } from "@tabler/icons-react";
import { useCart } from "@/context/CartContext";
import { IconUserCircle } from "@tabler/icons-react";
import Orders from "../orders/Order";
import { useOrderContext } from "@/context/OrderContext";
import { useScores } from "@/context/ScoreContext";
import PuntajeConEstrellas from "../Stars";
export default function SellerProfile({
  params,
  isTrue,
}: {
  params: { id: string };
  isTrue: boolean | null;
}) {
  const id = params.id;
  const { userOrders } = useOrderContext();
  const {
    sellerProfiles,
    loadSellerProfile,
    setSelectedSeller,
    selectedSeller,
  } = useLocalProfiles();
  const seller: any = sellerProfiles;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const [renderedComponent, setRenderedComponent] =
    useState<JSX.Element | null>(null);
  const userOrdersFiltered = userOrders.filter(
    (order: any) => order.sellerId === Number(id),
  );
  const { loadSellerScores, scores } = useScores();
  const [puntaje, setPuntaje] = useState(0);
  useEffect(() => {
    if (scores && scores.length > 0) {
      const sellerScores = scores.filter(
        (score) => score.localId === Number(id),
      );

      if (sellerScores.length > 0) {
        const totalScore = sellerScores.reduce((accumulator, currentScore) => {
          return accumulator + currentScore.score;
        }, 0);
        const averageScore = totalScore / sellerScores.length;
        const roundedAverageScore = averageScore.toFixed(1);
        setPuntaje(Number(roundedAverageScore));
      }
    }
  }, [id, scores]);
  useEffect(() => {
    // Realiza la carga del perfil del vendedor solo si no se ha cargado previamente o si el ID ha cambiado.
    if (!seller || seller.id !== Number(id)) {
      loadSellerProfile(Number(id));
      loadSellerScores(Number(id));
    }
  }, [id, seller, loadSellerProfile]);

  useEffect(() => {
    // decide qué componente renderizar en función de isTrue
    if (isTrue) {
      setRenderedComponent(<Orders params={params} />);
    } else {
      setRenderedComponent(<Cart />);
    }
  }, [isTrue, params]);

  return (
    <>
      <div className="bg-white h-16 flex items-center justify-between px-10 border-b border-gray-300">
        <BackButton />
        <p className="text-black px-4 py-2 font-semibold">
          Pedidos Crombie - {seller.name}
        </p>
        <div className="flex flex-row gap-7 items-center">
          <button>
            <IconUserCircle size={40} />
          </button>
          <button onClick={() => setIsCartOpen(!isCartOpen)}>
            {cart.length > 0 ||
              (userOrdersFiltered.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "35px",
                    backgroundColor: "green",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                  }}
                >
                  {isTrue ? userOrdersFiltered.length : cart.length}
                </span>
              ))}
            {isTrue ? <IconBell size={35} /> : <IconShoppingCart size={35} />}
          </button>
        </div>
      </div>

      <div className="flex bg-[#F7F8F9] h-auto py-10">
        <div className="w-1/4 bg-[#F7F8F9]">
          <div className="flex flex-col items-center p-4 text-center bg-white border border-gray-200 ml-5 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg px-2 max-w" src={seller.logo} alt="" />
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {seller.name}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {seller.type}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {seller.description}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {seller.address}
              </p>
              <PuntajeConEstrellas puntaje={puntaje} />
            </div>
            {isTrue && (
              <button
                className="bg-green-600 text-slate-100 rounded-lg w-1/2 p-2"
                onClick={() => {
                  if (selectedSeller) {
                    setSelectedSeller(null);
                  } else {
                    setSelectedSeller(seller);
                  }
                }}
              >
                {selectedSeller ? "CANCELAR" : "EDITAR PERFIL"}
              </button>
            )}
            {selectedSeller ? <EditSeller /> : <p></p>}
          </div>
        </div>
        {/* productos */}
        <div className="w-2/4">
          <SellersProducts params={params} isTrue={isTrue} />
        </div>
        {/* carrito */}
        {/* ventana emergente del carrito utilizando clases de Tailwind CSS */}
        {isCartOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-100 border w-full h-full border-gray-200 shadow-lg p-4">
              <button
                className="text-black font-bold text-2xl"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                X
              </button>
              {renderedComponent}
            </div>
          </div>
        )}
        {/* crear producto */}
        {isTrue && (
          <div className="w-1/4 bg-white">
            <CreateProduct params={params} />
          </div>
        )}
      </div>
    </>
  );
}
