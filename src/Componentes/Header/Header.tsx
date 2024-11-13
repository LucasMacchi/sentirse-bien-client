import "./Header.css";
import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../../Context/GlobalState";
import MenuLateral from "../MenuLateral/MenuLateral";
import { Avatar } from "@mui/material";

export function Header() {
  const global = useContext(GlobalContext);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function ShowMenu() {
    const location = useLocation();
    if (global?.user.rol === 3) {
      if (location.pathname === "/") {
        return null;
      } else {
        return <></>;
      }
    }
  }

  if (global?.isLog) {
    return (
      <>
        <header>
          <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
            {ShowMenu()}
            <div className="navbar-left">
              <Link
                to={"/profile"}
                onClick={() => {
                  global?.changeMenuConsult(false);
                  global?.changeMenuReview(false);
                }}
              >
                <Avatar src="/broken-image.jpg" sx={{ mt: 2 }} />
              </Link>
              <Link
                to={"/profile"}
                onClick={() => {
                  global?.changeMenuConsult(false);
                  global?.changeMenuReview(false);
                }}
                className="user-navbar"
              >
                <p>
                  {global?.user.first_name} {global?.user.last_name}
                </p>
              </Link>
            </div>
            <div className="navbar-right">
              <div className="hamburger" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </nav>
        </header>
        <MenuLateral isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </>
    );
  } else {
    return (
      <>
        <header>
          <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
            {ShowMenu()}
            <div className="navbar-left">
              <Link to={"/profile"}>
                <img src={logo} alt="Logo" className="logo-img" />
              </Link>
            </div>
          </nav>
        </header>
        <MenuLateral isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </>
    );
  }
}
