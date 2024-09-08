import facebook from "../../assets/facebook.svg";
import whatsapp from "../../assets/whatsapp.svg";
import fotofooter from "../../assets/foto2.png";
import "./Contact.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";


export function Contact() {
  return (
    <>
    <Header></Header>
    <div className="contacto">
    <div className="footer-left">
          <div className="contactanos-text">
            <h1>Contactanos</h1>
          </div>
          <div className="contact-info">
            <h1>Teléfono</h1>
            <p>(123) 456-7890</p>
            <h1>Email</h1>
            <p>sentirsebien@gmail.com</p>
            <h1>Dirección</h1>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.5827771761155!2d-58.981585523670475!3d-27.4511106159161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450cf0c80be0d3%3A0xc9f9278c74810912!2sUTN%20-%20Facultad%20Regional%20Resistencia!5e0!3m2!1ses-419!2sar!4v1724550535189!5m2!1ses-419!2sar"
              width="400"
              height="300"
            ></iframe>
            <h1>Redes</h1>
          </div>
          <div className="social-icons">
            <img src={facebook} alt="" className="icon" />
            <img src={whatsapp} alt="" className="icon" />
          </div>
        </div>
        <div className="footer-right">
          <img src={fotofooter} alt="" className="foto-footer" />
        </div>
    </div>
    <Footer></Footer>   
    </>
  );
}
