import React, { useContext, useState } from "react";
import "./MenuLateral.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalState";

const MenuLateral: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const global = useContext(GlobalContext);
  const toggleMenu = () => {
    setVisible(!visible);
  };

  if (global?.user.rol == 3) {
    return (
      <>
        <div className={`menu-lateral ${visible ? "" : "oculto"}`}>
          <ul className="menu-lista">
            <Link to="/clientes" className="remove-underline">
              <li className="menu-item">Clientes</li>
            </Link>
            <Link to="/ingresos" className="remove-underline">
              <li className="menu-item">Informe de Ingresos</li>
            </Link>

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
  } else if (global?.user.rol == 1){
    return (
      <>
        <div className={`menu-lateral ${visible ? "" : "oculto"}`}>
          <ul className="menu-lista">
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
  } else if (global?.user.rol == 2){
    return (
      <>
        <div className={`menu-lateral ${visible ? "" : "oculto"}`}>
          <ul className="menu-lista">
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
  }
};

export default MenuLateral;
