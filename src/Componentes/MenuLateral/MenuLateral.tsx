import React, { useState } from "react";
import "./MenuLateral.css";
import { Link } from "react-router-dom";

const MenuLateral: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);

  const toggleMenu = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className={`menu-lateral ${visible ? "" : "oculto"}`}>
        <ul className="menu-lista">
          <Link to="/clientes" className="remove-underline">
            <li className="menu-item">Clientes</li>
          </Link>

          <li className="menu-item">Informe de Ingresos</li>
          <li className="menu-item">Informe de Servicios</li>
          <Link to="/pagos" className="remove-underline">
            <li className="menu-item">Pagos</li>
          </Link>
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
