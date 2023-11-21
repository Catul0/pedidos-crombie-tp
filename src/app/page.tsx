"use client";
import Navbar from "@/components/home/Navbar";
import Imagen from "@/components/home/Imagen";
import JoinUs from "@/components/home/JoinUs";
import Footer from "@/components/home/Footer";
function HomePage() {
  return (
    <div>
      <Navbar />
      <Imagen />
      <div className="flex flex-col justify-center items-center mt-[50px] mb-[50px] px-4 sm:px-0">
        <h1 className="text-black text-1x1 font-bold w-full sm:w-[600px] text-center">Sabores que Despiertan los Sentidos, Cuidados que te Confortan, y la Comodidad de Todo lo que Necesitas, Cuando lo Necesitas.🍕❤️</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 px-4 md:px-24">
        <div className="h-4/5 flex flex-col justify-center items-center bg-orange-500 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all duration-300 hover:scale-105">
          <div className="h-4/5 p-12 flex justify-center items-center rounded-lg">
            <img className="h-32 object-cover object-center rounded-t-lg" src='https://images.rappi.com.ar/home-ab-objects/restaurantsicon-1642620539.png?e=webp&d=150x150&q=50' alt="" />
          </div>
            <div className="w-full flex justify-center items-center font-semibold h-1/5 bg-orange-100">
              <h1>Restaurantes</h1>
            </div>
        </div>
        <div className="h-4/5 flex flex-col justify-center items-center bg-green-500 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all duration-300 hover:scale-105">
          <div className="h-4/5 p-12 flex justify-center items-center rounded-lg">
            <img className="h-32 object-cover object-center rounded-t-lg" src='https://images.rappi.com.ar/home-ab-objects/supermarket-1642621254.png?e=webp&d=150x150&q=50' alt="" />
          </div>
            <div className="w-full flex justify-center items-center font-semibold h-1/5 bg-green-100">
              <h1>Supermercados</h1>
            </div>
        </div>
        <div className="h-4/5 flex flex-col justify-center items-center bg-blue-500 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all duration-300 hover:scale-105">
          <div className="h-4/5 p-12 flex justify-center items-center rounded-lg">
            <img className="h-32 object-cover object-center rounded-t-lg" src='https://images.rappi.com.ar/home-ab-objects/pharmacyicon-1642624210.png?e=webp&d=150x150&q=50' alt="" />
          </div>
            <div className="w-full flex justify-center items-center font-semibold h-1/5 bg-blue-100">
              <h1>Farmacias</h1>
            </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-10 mb-10 px-4 sm:px-0">
        <h1 className="text-black text-5xl font-bold w-full sm:w-[600px] text-center">Únete a Pedidos Crombie</h1>
      </div>
      <div className="w-full flex flex-col sm:flex-row mb-12 justify-evenly items-center space-y-4 sm:space-y-0">
        <JoinUs
          imageUrl="https://th.bing.com/th/id/OIG.j1P1jlAUGBgBz7Udziy9?pid=ImgGn&w=1024&h=1024&rs=1"
          paragraphText="Pedite un antojo"
          linkPath="/users/register"
          linkText="Registrate como usuario"
        />
        <JoinUs
          imageUrl="https://th.bing.com/th/id/OIG.Ei15uciXnoveiSoN8PZx?pid=ImgGn"
          paragraphText="Tu local, a domicilio"
          linkPath="/sellers/register"
          linkText="Registrate como local"
        />
        <JoinUs
          imageUrl="https://th.bing.com/th/id/OIG.jRqTfNQtB9_dXl3k51A_?pid=ImgGn"
          paragraphText="Reparte con nosotros"
          linkPath="/deliverys/register"
          linkText="Registrate como delivery"
        />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
