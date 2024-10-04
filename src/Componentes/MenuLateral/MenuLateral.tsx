import React, { useState } from "react";
import "./MenuLateral.css";

const MenuLateral: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);

  const toggleMenu = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className={`menu-lateral ${visible ? "" : "oculto"}`}>
        <ul className="menu-lista">
            <li className="menu-item">Clientes</li>
          <li className="menu-item">Informe de Ingresos</li>
          <li className="menu-item">Informe de Servicios</li>
        </ul>
        <button onClick={toggleMenu} className="toggle-boton">
          {visible ? "Ocultar Menú" : "Mostrar Menú"}
        </button>
      </div>
      {!visible && (
        <button onClick={toggleMenu} className="abrir-boton">
          Abrir Menú
        </button>
      )}
    </>
  );
};

export default MenuLateral;
