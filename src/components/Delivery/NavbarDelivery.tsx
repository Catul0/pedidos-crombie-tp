import React from "react";
import BackButton from "../BackButton";
import { IconUserCircle } from "@tabler/icons-react";

function NavbarDelivery({ setIsInfoOpen, isInfoOpen }: any) {
	return (
		<div className="bg-white h-16 flex items-center justify-between px-10 border-b shadow-lg">
			<BackButton />
			<div className="flex items-center space-x-4">
				<div className="flex items-center">
					<div className="flex items-center gap-5">
						<IconUserCircle
							width={50}
							height={50}
							className="cursor-pointer"
							onClick={() => setIsInfoOpen(!isInfoOpen)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NavbarDelivery;
