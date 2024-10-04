import { Link } from "react-router-dom";
import "./Footer.css";
import facebook from "../../assets/facebook.svg";
import whatsapp from "../../assets/whatsapp.svg";
import { GlobalContext } from "../../Context/GlobalState";
import { useContext } from "react";

export function Footer() {
    const global = useContext(GlobalContext);

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-info">
                    <h1 className="footer-title">Sobre Nosotros</h1>
                    <hr className="footer-divider" />
                    <Link to="/about" className="footer-link">Conocenos</Link>
                    <Link to="/services" className="footer-link">Nuestros Servicios</Link>
                    <Link to="/contact" className="footer-link">Contacto</Link>
                </div>

                <div className="footer-info">
                    <h1 className="footer-title">Contacto</h1>
                    <hr className="footer-divider" />
                    <Link to="/contact" className="footer-link">Ver en el mapa</Link>
                    <p className="footer-contact">📞 (123) 456-7890</p>
                    <p className="footer-contact">✉️ sentirsebien@gmail.com</p>
                </div>

                <div className="footer-info">
                    <h1 className="footer-title">Ayuda</h1>
                    <hr className="footer-divider" />
                    <Link to="" onClick={() => { global?.changeMenuReview(true) }} className="footer-link">Dejanos tu comentario</Link>
                    <Link to="" onClick={() => {
                        if (global?.isLog) {
                            global?.changeMenuConsult(true);
                        } else {
                            global?.changeMenuLogin(true);
                        }
                    }} className="footer-link">Consultas</Link>
                    <Link to="/empleo" className="footer-link">Empleo</Link>
                    <Link to="" onClick={() => global?.changeMenuRegister(true)} className="footer-link">Registrate</Link>
                </div>

                <div className="footer-social">
                    <h1 className="footer-title">Nuestras Redes</h1>
                    <hr className="footer-divider" />
                    <div className="social-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src={facebook} alt="Facebook" className="footer-contact--logos" />
                        </a>
                        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                            <img src={whatsapp} alt="WhatsApp" className="footer-contact--logos" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>Copyright © 2024</p>
                <p>Guini Galo, Daciuk Paulina, Lucas Macchi.</p>
                <p>All rights reserved.</p>
            </div>
        </footer>
    );
}
