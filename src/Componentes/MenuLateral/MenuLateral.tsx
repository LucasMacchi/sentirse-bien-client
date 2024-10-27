import React, { useContext, useState } from "react";
import "./MenuLateral.css";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalState";

const MenuLateral: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const global = useContext(GlobalContext);
  const toggleMenu = () => {
    setVisible(!visible);
  };
  const navigate = useNavigate();

  // Componente común para el botón de abrir menú
  const AbrirMenuBoton = () =>
    !visible && (
      <button onClick={toggleMenu} className="abrir-boton">
        Abrir Menú
      </button>
    );

  if (global?.user.rol == 3) {
    return (
      <>
        <div className={`menu-lateral ${visible ? "" : "oculto"}`}>
          <ul className="menu-lista">
            <Link to="/turnos-dia" className="remove-underline">
              <li className="menu-item">Turnos</li>
            </Link>
            <Link to="/clientes" className="remove-underline">
              <li className="menu-item">Clientes</li>
            </Link>
            <Link to="/pagos" className="remove-underline">
              <li className="menu-item">Pagos</li>
            </Link>
          </ul>
          <button onClick={toggleMenu} className="toggle-boton">
            {visible ? "Ocultar Menú" : "Mostrar Menú"}
          </button>
        </div>
        <AbrirMenuBoton />
      </>
    );
  } else if (global?.user.rol == 1) {
    return (
      <>
        <div className={`menu-lateral ${visible ? "" : "oculto"}`}>
          <Link to="/turnos-dia" className="remove-underline">
            <li className="menu-item">Turnos</li>
          </Link>
          <button onClick={toggleMenu} className="toggle-boton">
            {visible ? "Ocultar Menú" : "Mostrar Menú"}
          </button>
        </div>
        <AbrirMenuBoton />
      </>
    );
  } else if (global?.user.rol == 2) {
    return (
      <>
        <div className={`menu-lateral ${visible ? "" : "oculto"}`}>
          <Link to="/pagos" className="remove-underline">
            <li className="menu-item">Pagos</li>
          </Link>
          <button onClick={toggleMenu} className="toggle-boton">
            {visible ? "Ocultar Menú" : "Mostrar Menú"}
          </button>
        </div>
        <AbrirMenuBoton />
      </>
    );
  } else {
    return (
      <>
        <div className={`menu-lateral ${visible ? "" : "oculto"}`}>
          <ul className="menu-lista">
            <li className="menu-item" onClick={() => navigate("/turnos")}>
              Agendar un turno
            </li>
            <li
              className="menu-item"
              onClick={() => global?.changeMenuConsult(true)}
            >
              Hacer una consulta
            </li>
            <li
              className="menu-item"
              onClick={() => global?.changeMenuReview(true)}
            >
              Reseña
            </li>
          </ul>
          <button onClick={toggleMenu} className="toggle-boton">
            {visible ? "Ocultar Menú" : "Mostrar Menú"}
          </button>
        </div>
        <AbrirMenuBoton />
      </>
    );
  }
};

export default MenuLateral;
