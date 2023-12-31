import type { Metadata } from "next";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Pedidos Crombie",
	description: "Generated by create next app",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={nunito.className}>{children}</body>
		</html>
	);
}
