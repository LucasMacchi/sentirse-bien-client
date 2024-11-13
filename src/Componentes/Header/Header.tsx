import "./Header.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../../Context/GlobalState";
import avatar from "../../assets/avatar.svg";

export function Header() {
  const global = useContext(GlobalContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openLog = () => {
    global?.changeMenuLogin(true);
  };

  function LogoutNavigate() {
    navigate("/");
  }

  function changeMenuLogin() {
    if (!global?.isLog) {
      return (
        <>
          <Link
            to="/"
            className="navbar-links"
            onClick={() => {
              openLog();
            }}
          >
            Log In
          </Link>
        </>
      );
    } else {
      return <></>;
    }
  }


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
          <div className="navbar-left">
            <Link to={"/"}>
              <img src={logo} alt="" />
            </Link>
            <div className="hamburger" onClick={toggleMenu}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="navbar-right">
            <Link to="/about" className="navbar-links">
              Quienes Somos
            </Link>
            <Link to="/contact" className="navbar-links">
              Contacto
            </Link>
            <Link to="/services" className="navbar-links">
              Servicios
            </Link>
            <Link to="/empleo" className="navbar-links">
              Empleo
            </Link>
            <Link
              to="/"
              onClick={() => {
                global?.logout();
                LogoutNavigate();
              }}
              className="navbar-links"
            >
              Log Out
            </Link>
            <div>
              <Link to="/profile">
                <img src={avatar} alt="" className="navbar-links avatar-img" />
              </Link>
            </div>
            {changeMenuLogin()}
          </div>
        </nav>
      </header>
    </>
  );
}
