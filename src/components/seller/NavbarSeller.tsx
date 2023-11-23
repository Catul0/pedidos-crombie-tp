import React from "react";
import BackButton from "../BackButton";
import Link from "next/link";
import { IconUserCircle } from "@tabler/icons-react";
import NotificationButton from "../CartButton";

export default function NavbarSeller({
	isTrue,
	setIsCartOpen,
	pendingOrdersLength,
	cartLength,
	sellername,
	iduser
}: any) {
	return (
		<>
			<div className="bg-white h-16 flex items-center justify-between px-10 border-b border-gray-300">
				<BackButton />
				<p className="hidden md:flex text-black px-4 py-2 font-semibold">
					Pedidos Crombie - {sellername}
				</p>
				<div className="flex flex-row gap-7 items-center">
					{isTrue ? (
						<p></p>
					) : (
						<Link href={"/users/" + iduser}>
							<IconUserCircle size={40} />
						</Link>
					)}
					<NotificationButton
						isTrue={isTrue}
						setIsCartOpen={setIsCartOpen}
						pendingOrdersLength={pendingOrdersLength}
						cartLength={cartLength}
					/>
				</div>
			</div>
		</>
	);
}
