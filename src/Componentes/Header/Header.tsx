import "./Header.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../Context/GlobalState";
import avatar from "../../assets/avatar.svg";

export function Header() {
  const global = useContext(GlobalContext);
  const navigate = useNavigate();


  const openLog = () => {
    global?.changeMenuLogin(true);
  };

  function LogoutNavigate(){
    useEffect(()=>{
      navigate('/');
    })
  }

  function changeMenuLogin() {
    if (!global?.isLog) {
      return (
        <>
          <Link to="/" className="navbar-links" onClick={() => {
            openLog(); LogoutNavigate}}>
            Log In
          </Link>
        </>
      );
    } else {
      return (
        <>
          <div className="navbar-right">
            <Link
              to="/"
              onClick={() => {
                global.logout();
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
          </div>
        </>
      );
    }
  }
  return (
    <>
      <header>
        <nav className="navbar">
          <div className="navbar-left">
            <img src={logo} alt="" />
            <Link to="/" className="header-logo-text">
              Sentirse Bien
            </Link>
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
            {changeMenuLogin()}
          </div>
        </nav>
      </header>
    </>
  );
}
