import React from "react";
import {
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";

function PuntajeConEstrellas({ puntaje }: any) {
  const maxPuntaje = 5;
  const iconos = [];

  for (let i = 1; i <= maxPuntaje; i++) {
    if (puntaje >= i) {
      iconos.push(<IconStarFilled key={i} />);
    } else if (puntaje + 0.5 === i) {
      iconos.push(<IconStarHalfFilled key={i} />);
    } else {
      iconos.push(<IconStar key={i} />);
    }
  }

  return (
    <p className="font-normal text-yellow-400 dark:text-gray-400 flex flex-row items-center justify-center">
      {iconos}
    </p>
  );
}

export default PuntajeConEstrellas;
