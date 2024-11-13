import React, { useContext } from "react";
import "./MenuLateral.css";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalState";

interface MenuLateralProps {
  isOpen: boolean; // Prop para controlar si el menú está abierto
  toggleMenu: () => void; // Función para alternar la visibilidad
}

const MenuLateral: React.FC<MenuLateralProps> = ({ isOpen, toggleMenu }) => {
  const global = useContext(GlobalContext);
  const navigate = useNavigate();

  const LogoutNavigate = () => {
    navigate("/");
  };

  return (
    <div className={`menu-lateral ${isOpen ? "" : "oculto"}`}>
      <ul className="menu-lista">
        <li
          className="menu-item"
          onClick={() => {
            navigate("/turnos");
            global?.changeMenuConsult(false);
            global?.changeMenuReview(false);
            toggleMenu();
          }}
        >
          Agendar un turno
        </li>
        <li
          className="menu-item"
          onClick={() => {
            global?.changeMenuConsult(true);
            global?.changeMenuReview(false);
            toggleMenu();
          }}
        >
          Hacer una consulta
        </li>
        <li
          className="menu-item"
          onClick={() => {
            global?.changeMenuConsult(false);
            global?.changeMenuReview(true);
            toggleMenu();
          }}
        >
          Reseña
        </li>
        <li
          className="menu-item"
          onClick={() => {
            global?.changeMenuConsult(false);
            global?.changeMenuReview(false);
            global?.logout();
            LogoutNavigate();
            toggleMenu();
          }}
        >
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default MenuLateral;
