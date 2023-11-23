import React from "react";
import { IconBell, IconShoppingCart } from "@tabler/icons-react";

export default function NotificationButton({
	isTrue,
	setIsCartOpen,
	isCartOpen,
	pendingOrdersLength,
	cartLength,
}: any) {
	return (
		<>
			{isTrue ? (
				<button onClick={() => setIsCartOpen(!isCartOpen)}>
					{pendingOrdersLength > 0 && (
						<span
							style={{
								position: "absolute",
								top: "5px",
								right: "35px",
								backgroundColor: "#0E9F6E",
								color: "white",
								borderRadius: "50%",
								width: "20px",
								height: "20px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								zIndex: 1,
							}}>
							{pendingOrdersLength}
						</span>
					)}
					<IconBell size={35} />
				</button>
			) : (
				<button onClick={() => setIsCartOpen(!isCartOpen)}>
					{cartLength > 0 && (
						<span
							style={{
								position: "absolute",
								top: "5px",
								right: "35px",
								backgroundColor: "#0E9F6E",
								color: "white",
								borderRadius: "50%",
								width: "20px",
								height: "20px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								zIndex: 1,
							}}>
							{cartLength}
						</span>
					)}
					<IconShoppingCart size={35} />
				</button>
			)}
		</>
	);
}
