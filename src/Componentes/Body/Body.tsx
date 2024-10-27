import { useContext, useEffect } from 'react';
import "./Body.css";
import foto1 from "../../assets/foto1.png";
import foto2 from "../../assets/foto2.png";
import tratamientocorporal from "../../assets/tratamiento-corporal.jpg";
import tratamientofacial from "../../assets/tratamiento-facial.jpg";
import belleza from "../../assets/belleza.jpg";
import masajes from "../../assets/masajes.png";
import { ImageList, ImageListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import AOS from 'aos';
import { GlobalContext } from '../../Context/GlobalState';

interface ItemData {
  img: string;
  title: string;
}

const itemData: ItemData[] = [
  { img: foto1, title: "Image 1" },
  { img: foto2, title: "Image 2" },
  { img: tratamientocorporal, title: "Image 2" },
  { img: tratamientofacial, title: "Image 2" },
  { img: masajes, title: "Image 2" },
  { img: belleza, title: "Image 2" },
  { img: tratamientocorporal, title: "Image 2" },
  { img: tratamientofacial, title: "Image 2" },
  { img: masajes, title: "Image 2" },
  { img: belleza, title: "Image 2" },
];

export function Body() {
  const global = useContext(GlobalContext);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    if (localStorage.getItem('jwToken')){
      global?.changeMenuLogin(false);
    } else {
      global?.changeMenuLogin(true);
    }
  }, []);

  return (
    <>
  
      <Header></Header>
      <div className="body-bg">
        <div className="container">
          <h1 className="logo-text" data-aos="fade-right">Sentirse Bien</h1>
          <div className="container-title">
            <h1 className="welcome-text" data-aos="fade-left" data-aos-delay="300">
              Relajate y <span className="welcome-text-span">renová</span>
            </h1>
            <Link to="/turnos">
              <button className="agenda-btn" data-aos="zoom-in" data-aos-delay="600">Agendá tu turno!</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="section-bg">
        <div className="container-body">
          <div className="conocenos-left" data-aos="fade-right">
            <h1>Oasis de Bienestar</h1>
            <p>
              Descubre el oasis de tranquilidad que mereces en nuestro spa. Te
              ofrecemos una experiencia única de relajación y renovación, donde
              cada detalle está pensado para tu bienestar. Disfruta de masajes
              rejuvenecedores, tratamientos revitalizantes y un ambiente sereno
              que te permitirá desconectar del estrés y reconectar contigo
              mismo. Ven y déjate mimar en un lugar donde la paz y el confort
              son nuestra prioridad.
            </p>
            <Link to='/about' className="agenda-btn" data-aos="zoom-in">Conocenos</Link>
          </div>
          <div className="conocenos-right" data-aos="fade-left">
            <img src={foto1} alt="" className="conocenos-img img-2" />
            <img src={foto2} alt="" className="conocenos-img" />
          </div>
        </div>
      </div>
      <div className="section-bg nuestros-servicios">
        <h1 data-aos="fade-up">Nuestros Servicios</h1>
        <div className="servicios-grid">
          <div className="servicios-card" data-aos="flip-left" data-aos-delay="100">
            <img src={tratamientocorporal} alt="" className="servicio-img" />
            <h1>Tratamientos Corporales</h1>
            <p>
              Revitaliza tu cuerpo con nuestros exclusivos tratamientos
              corporales.
            </p>
          </div>
          <div className="servicios-card">
            <img src={tratamientofacial} alt="" className="servicio-img" />
            <h1>Tratamientos Faciales</h1>
            <p>
              Descubre la perfección de tu piel con nuestros tratamientos
              faciales personalizados.
            </p>
          </div>
          <div className="servicios-card">
            <img src={belleza} alt="" className="servicio-img" />
            <h1>Belleza</h1>
            <p>
              Realza tu atractivo natural con nuestros tratamientos de belleza
              exclusivos.
            </p>
          </div>
          <div className="servicios-card">
            <img src={masajes} alt="" className="servicio-img" />
            <h1>Masajes</h1>
            <p>
              Relájate y renueva tu cuerpo con nuestra variedad de masajes
              terapéuticos.
            </p>
          </div>
        </div>
        <Link to='/services' className="vermas-btn" data-aos="zoom-in">Ver Más</Link>
      </div>

      <div className="section-bg gallery">
        <div className="imagelist" data-aos="fade-up">
          <h1>Galería</h1>
          <ImageList sx={{ width: 600, height: 450 }} cols={3} rowHeight={200}>
            {itemData.map((item, i) => (
              <ImageListItem key={i} data-aos="zoom-in" data-aos-delay={i * 100}>
                <img
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
