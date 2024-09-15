import { Link } from "react-router-dom";
import "./Footer.css";
import facebook from "../../assets/facebook.svg";
import whatsapp from "../../assets/whatsapp.svg";
import { GlobalContext } from "../../Context/GlobalState";
import { useContext } from "react";

export function Footer() {

    const global = useContext(GlobalContext)

    return (
        <>
            <footer>
                <div className="footer-info">
                    <h1 className="footer-title">Sobre Nosotros</h1>
                    <hr style={{ width: "100%" }} />
                    <br />
                    <Link to="/about" className="footer-link">
                        Conocenos
                    </Link>
                    <Link to="/services" className="footer-link">
                        Nuestros Servicios
                    </Link>
                    <Link to="/contact" className="footer-link">
                        Contacto
                    </Link>
                </div>

                <div className="footer-info">
                    <h1 className="footer-title">Contacto</h1>
                    <hr style={{ width: "100%" }} />
                    <br />
                    <Link to="/contact" className="footer-link ">
                        Ver en el mapa
                    </Link>
                    <p className="footer-link">(123)456-7890</p>
                    <p className="footer-link">sentirsebien@gmail.com</p>
                </div>

                <div className="footer-info">
                    <h1 className="footer-title">Ayuda</h1>
                    <hr style={{ width: "100%" }} />
                    <br />
                    <Link to="" onClick={() => { global?.changeMenuReview(true) }} className="footer-link ">
                        Dejanos tu comentario
                    </Link>
                    <Link to="" onClick={() => {
                        if (global?.isLog) {
                            global?.changeMenuConsult(true)
                        }
                        else global?.changeMenuLogin(true)
                    }} className="footer-link ">
                        Consultas
                    </Link>
                    <Link to="/" className="footer-link ">
                        Empleo
                    </Link>
                    <Link to="" onClick={() => global?.changeMenuRegister(true)} className="footer-link ">
                        Registrate
                    </Link>
                </div>

                <div className="contact-icons">
                    <h1 className="footer-title">Nuestras Redes</h1>
                    <hr style={{ width: "100%" }} />
                    <br />
                    <img src={facebook} alt="" className="footer-contact--logos" />
                    <img src={whatsapp} alt="" className="footer-contact--logos" />
                </div>
            </footer>
        </>
    );
}
