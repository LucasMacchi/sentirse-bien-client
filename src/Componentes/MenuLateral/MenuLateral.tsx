import React, { useContext, useState } from "react";
import "./MenuLateral.css";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalState";

const MenuLateral: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const global = useContext(GlobalContext);
  const toggleMenu = () => {
    setVisible(!visible);
  };
  const navigate = useNavigate();

  const AbrirMenuBoton = () =>
    !visible && (
      <button onClick={toggleMenu} className="abrir-boton">
        Abrir Menú
      </button>
    );
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
};

export default MenuLateral;
