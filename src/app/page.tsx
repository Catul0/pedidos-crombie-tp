"use client"
import Navbar from "@/components/home/Navbar";
import Imagen from "@/components/home/Imagen";
import JoinUs from "@/components/home/JoinUs";
function HomePage() {
  return (
    <div className="">
      <Navbar/>
      <Imagen/>
      <div className="flex flex-col justify-center items-center mt-[50px] mb-[50px]">
        <h1 className="text-black text-1xl font-bold w-[600px] text-center">Sabores que Despiertan los Sentidos, Cuidados que te Confortan, y la Comodidad de Todo lo que Necesitas, Cuando lo Necesitas.🍕❤️</h1>
      </div>
      <div className="w-full flex flex-row mb-[100px] justify-evenly items-center">
        <JoinUs
          imageUrl="https://images.pexels.com/photos/280453/pexels-photo-280453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          paragraphText="Pedite un antojo"
          linkPath="/users/register"
          linkText="Registrate como usuario"
        />
        <JoinUs
          imageUrl="https://images.pexels.com/photos/6994138/pexels-photo-6994138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          paragraphText="Tu local, a domicilio"
          linkPath="/sellers/register"
          linkText="Registrate como local"
        />
        <JoinUs
          imageUrl="https://images.pexels.com/photos/4392039/pexels-photo-4392039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          paragraphText="Reparte con nosotros"
          linkPath="/deliverys/register"
          linkText="Registrate como delivery"
        />
      </div>
    </div>
  );
}

export default HomePage;