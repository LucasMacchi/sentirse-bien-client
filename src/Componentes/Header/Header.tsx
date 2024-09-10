import "./Header.css"
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom"
import {useContext } from 'react';
import { GlobalContext } from "../../Context/GlobalState";

export function Header(){
    const global = useContext(GlobalContext)
    const openLog = () => {
        global?.changeMenuLogin(true)
    }
    return(
        <>
            <header>
                <nav className="navbar">
                    <div className="navbar-left">
                        <img src={logo} alt="" />
                        <Link to='/' className="header-logo-text">Sentirse Bien</Link>
                    </div>
                    <div className="navbar-right">
                        <Link to='/about' className="navbar-links">Quienes Somos</Link>
                        <Link to='/contact' className="navbar-links">Contacto</Link>
                        <Link to='/services' className="navbar-links">Servicios</Link>
                        <Link to='/' className="navbar-links">Empleo</Link>
                        <Link to='/' className="navbar-links" onClick={() => openLog()}>Log In</Link>
                    </div>
                </nav>
            </header>
        </>
    )

}