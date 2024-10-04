import React from "react";
import { Header } from "../Header/Header";
import "./Servicios.css";
import logo from "../../assets/logo.png";
import velaslim from "../../assets/velaslim.jpg";
import dermohealth from "../../assets/dermohealth.jpg";
import crio from "../../assets/crio.jpg";
import cavitacion from "../../assets/cavitacion.jpg";
import puntadiamante from "../../assets/puntadiamante.jpg";
import limpieza from "../../assets/limpieza.png";
import criofacial from '../../assets/criofacial.jpg';
import lifting from "../../assets/lifting.png";
import depilacion from "../../assets/depilacion.png";
import manicura from "../../assets/manicura.jpg";
import antistress from "../../assets/antistress.webp";
import descontracturante from "../../assets/descontracturante.jpg";
import piedras from "../../assets/piedras.webp";
import circu from "../../assets/circu.jpg";
import { Footer } from "../Footer/Footer";
import { Link } from "react-router-dom";

export const Servicios: React.FC = () => {
  return (
    <>
      <Header />
      <div className="servicios-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="titulo">Nuestros Servicios</h1>
        <hr />
        
        <ServiceSection title="Tratamientos Corporales" services={[
          { img: velaslim, title: "VelaSlim", desc: "Reducción de la circunferencia corporal y la celulitis.", price: "$10000" },
          { img: dermohealth, title: "DermoHealth", desc: "Moviliza los distintos tejidos de la piel y estimula la microcirculación, generando un drenaje linfático.", price: "$10000" },
          { img: crio, title: "Criofrecuencia", desc: "Produce un efecto de lifting instantáneo.", price: "$10000" },
          { img: cavitacion, title: "Ultracavitación", desc: "Técnica reductora.", price: "$10000" }
        ]} />

        <ServiceSection title="Tratamientos Faciales" services={[
          { img: puntadiamante, title: "Punta de diamante", desc: "Microexfoliación.", price: "$10000" },
          { img: limpieza, title: "Limpieza profunda + Hidratación", price: "$10000" },
          { img: criofacial, title: "Criofrecuencia facial", desc: "Resultados instantáneos de efecto lifting.", price: "$10000" }
        ]} />

        <ServiceSection title="Belleza" services={[
          { img: lifting, title: "Lifting de pestaña", price: "$10000" },
          { img: depilacion, title: "Depilación facial", price: "$10000" },
          { img: manicura, title: "Belleza de manos y pies", price: "$10000" }
        ]} />

        <ServiceSection title="Masajes" services={[
          { img: antistress, title: "Anti-stress", price: "$10000" },
          { img: descontracturante, title: "Descontracturantes", price: "$10000" },
          { img: piedras, title: "Masajes con piedras calientes", price: "$10000" },
          { img: circu, title: "Circulatorios", price: "$10000" }
        ]} />

        <br />
        <p>¿Ya te decidiste?</p>
        <Link to="/turnos">
          <button className="vermas-btn">Agenda tu turno</button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

const ServiceSection: React.FC<{ title: string; services: { img: string; title: string; desc?: string; price: string; }[] }> = ({ title, services }) => {
  return (
    <>
      <p className="servicio-title">{title}</p>
      <div className="servicio-grid">
        {services.map((service, index) => (
          <div className="servicio-card" key={index}>
            <img src={service.img} alt={service.title} className="servicios-img" />
            <div className="servicio-descripcion">
              <h2>{service.title}</h2>
              {service.desc && <p>{service.desc}</p>}
              <h1 className="precio">{service.price}</h1>
            </div>
          </div>
        ))}
      </div>
      <hr />
    </>
  );
};
