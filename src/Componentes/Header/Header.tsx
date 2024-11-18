import "./Header.css";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalState";
import avatar from "../../assets/avatar.svg";
import AppMovil from "../AppMovil/AppMovil";

export function Header() {
  const global = useContext(GlobalContext);
  const navigate = useNavigate();

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
function ShowMenu(){
  const location = useLocation();
  if(global?.user.rol == 3){
    if(location.pathname == "/profile"){
      return null;
    } else {
      return(
        <>
        </>
      )
    }
  }
}


if(global?.isLog){
  if(global?.user.rol == 0){
    return (
    <>
      <header>
        <nav className="navbar">
          <div className="navbar-left">
            {ShowMenu()}
            <img src={logo} alt="" />
            <Link to="/" className="header-logo-text">
              Sentirse Bien
            </Link>
          </div>
          <div className="navbar-right">
            {changeMenuLogin()}
  
          </div>
        </nav>
      </header>
      <AppMovil></AppMovil>
      </>
    )

  } else {
    return(
      <>
      <header>
        <nav className="navbar">
          <div className="navbar-left">
            {ShowMenu()}
            <img src={logo} alt="" />
            <Link to="/profile" className="header-logo-text">
              Sentirse Bien
            </Link>
          </div>
            {changeMenuLogin()}
            <a href="/ruta/a/tu/apk.apk" className="navbar-links" download>
              Descargar APK
            </a>
        </nav>
      </header>
      </>
    )
  }
} else {
  return (
    <>
     <header>
        <nav className="navbar">
          <div className="navbar-left">
            {ShowMenu()}
            <img src={logo} alt="" />
            <Link to="/" className="header-logo-text">
              Sentirse Bien
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}
}
