import React, { useState, useEffect } from "react";

const Popup = ({ message }: any) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 5000); // Oculta el popup después de 5 segundos

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    visible && (
        <div
        className={`fixed top-17 right-10 bg-green-500 bg-opacity-70 text-white p-2 rounded shadow-md transform transition-transform duration-300 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {message}
      </div>
    )
  );
};

export default Popup;