import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DeliverysProvider } from "@/context/DeliveryContext";
import { VehiclesProvider } from "@/context/VehicleContext";
import { OrderProvider } from "@/context/OrderContext";
import Navbar from "@/components/Navbar";
import { LocalProfilesProvider } from "@/context/LocalProfileContext";
import { UsersProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pedidos Crombie",
  description: "Generated by create next app",
};

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UsersProvider>
          <OrderProvider>
            <DeliverysProvider>
              <Navbar text="Pedidos Crombie - Bienvenido de vuelta!" />
              <VehiclesProvider>
                <LocalProfilesProvider>{children}</LocalProfilesProvider>
              </VehiclesProvider>
            </DeliverysProvider>
          </OrderProvider>
        </UsersProvider>
      </body>
    </html>
  );
}
