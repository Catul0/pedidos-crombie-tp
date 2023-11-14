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
