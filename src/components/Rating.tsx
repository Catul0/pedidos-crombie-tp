import React, { useState, useEffect } from "react";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { useScores } from "@/context/ScoreContext";
import { useOrderContext } from "@/context/OrderContext";

interface RatingComponentProps {
	idseller: number;
	iduser: number;
	iddelivery: number;
	orderId: number;
	products: string;
}

function RatingComponent(props: RatingComponentProps) {
	const [localRating, setLocalRating] = useState(0);
	const { handleScored } = useOrderContext();
	const [deliveryRating, setDeliveryRating] = useState(0);
	const [hasRatedLocal, setHasRatedLocal] = useState(false);
	const [hasRatedDelivery, setHasRatedDelivery] = useState(false);
	const { createSellerScore, createDeliveryScore } = useScores();
	const userId = props.iduser;
	const localId = props.idseller;
	const deliveryId = props.iddelivery;
	const orderId = props.orderId;
	const products = props.products;

	useEffect(() => {
		if (hasRatedLocal && hasRatedDelivery) {
			handleScored(orderId, products, localId, userId);
		}
	}, [hasRatedLocal, hasRatedDelivery]);

	const handleLocalStarHover = (selectedRating: number) => {
		if (!hasRatedLocal) {
			setLocalRating(selectedRating);
		}
	};

	const handleLocalStarClick = (selectedRating: number) => {
		if (!hasRatedLocal) {
			const score = selectedRating;
			createSellerScore(
				{
					userId,
					score,
					id: 0,
					deliveryId: null,
					localId: null,
				},
				localId
			);
			setHasRatedLocal(true);
		}
	};

	const handleDeliveryStarHover = (selectedRating: number) => {
		if (!hasRatedDelivery) {
			setDeliveryRating(selectedRating);
		}
	};

	const handleDeliveryStarClick = (selectedRating: number) => {
		if (!hasRatedDelivery) {
			const score = selectedRating;
			createDeliveryScore(
				{
					userId,
					score,
					id: 0,
					deliveryId: null,
					localId: null,
				},
				deliveryId
			);
			setHasRatedDelivery(true);
		}
	};

	return (
		<div>
			<h1>Puntuar Local</h1>
			{hasRatedLocal ? (
				<div className="star-rating flex flex-row text-yellow-400">
					{[1, 2, 3, 4, 5].map((star) => (
						<span key={star}>
							{star <= localRating ? <IconStarFilled size={20} /> : <IconStar size={20} />}
						</span>
					))}
				</div>
			) : (
				<div className="star-rating flex flex-row text-yellow-400">
					{[1, 2, 3, 4, 5].map((star) => (
						<span
							key={star}
							onMouseEnter={() => handleLocalStarHover(star)}
							onMouseLeave={() => handleLocalStarHover(0)}
							onClick={() => handleLocalStarClick(star)}>
							{star <= localRating ? <IconStarFilled size={20} /> : <IconStar size={20} />}
						</span>
					))}
				</div>
			)}

			<h1>Puntuar Delivery</h1>
			{hasRatedDelivery ? (
				<div className="star-rating flex flex-row text-yellow-400">
					{[1, 2, 3, 4, 5].map((star) => (
						<span key={star}>
							{star <= deliveryRating ? <IconStarFilled size={20} /> : <IconStar size={20} />}
						</span>
					))}
				</div>
			) : (
				<div className="star-rating flex flex-row text-yellow-400">
					{[1, 2, 3, 4, 5].map((star) => (
						<span
							key={star}
							onMouseEnter={() => handleDeliveryStarHover(star)}
							onMouseLeave={() => handleDeliveryStarHover(0)}
							onClick={() => handleDeliveryStarClick(star)}>
							{star <= deliveryRating ? <IconStarFilled size={20} /> : <IconStar size={20} />}
						</span>
					))}
				</div>
			)}
		</div>
	);
}

export default RatingComponent;
