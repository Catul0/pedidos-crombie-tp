import React, { useState, useEffect } from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/Bs';
import { useScores } from '@/context/ScoreContext';

interface RatingComponentProps {
  idseller: number;
  iduser: number;
  iddelivery: number;
  sellerdelivery: string;
}

function RatingComponent(props: RatingComponentProps) {
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false); // Estado para controlar si el usuario ya ha calificado
  const { createSellerScore, createDeliveryScore } = useScores();
  const value = props.sellerdelivery;
  const userId = props.idseller;
  const localId = props.idseller;
  const deliveryId = props.iddelivery;

  const handleStarHover = (selectedRating: number) => {
    if (!hasRated) {
      setRating(selectedRating);
    }
  };

  const handleStarClick = (selectedRating: number, sellerdelivery: string) => {
    if (!hasRated) {
      const score = selectedRating;
      if (sellerdelivery === 'seller') {
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
      } else {
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
      }
      setHasRated(true); // Marcar que el usuario ha calificado
    }
  };


  return (
    <div>
      {hasRated ? (
                <div className="star-rating flex flex-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                  >
                    {star <= rating ? <BsStarFill size={20} /> : <BsStar size={20} />}
                  </span>
                ))}
              </div>
      ) : (
        <div className="star-rating flex flex-row">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={() => handleStarHover(0)}
              onClick={() => handleStarClick(star, value)}
            >
              {star <= rating ? <BsStarFill size={20} /> : <BsStar size={20} />}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default RatingComponent;
