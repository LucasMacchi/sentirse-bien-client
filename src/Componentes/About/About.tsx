import { Header } from "../Header/Header";
import "./About.css";
import foto1 from "../../assets/foto1.png";
import foto2 from "../../assets/foto2.png";
import foto3 from "../../assets/masajes.png";
import { Footer } from "../Footer/Footer";

export function About() {
  return (
    <>
      <Header></Header>
      <div className="about-container">
        <div className="about-grid">
          <div className="about-left">
            <h1>Quiénes Somos</h1>
            <h2>Historia</h2>
            <p>
              En Sentirse Bien, nuestro viaje comenzó con una visión clara:
              ofrecer un refugio de paz y bienestar en medio del ajetreo diario.
              Fundado por la Dra. Felicidad, una experta en medicina y
              bienestar, nuestro spa se inspira en la filosofía de que el
              cuidado personal es esencial para una vida plena. Desde sus
              inicios, hemos estado dedicados a proporcionar un espacio donde la
              tranquilidad y el rejuvenecimiento son la norma, combinando
              técnicas modernas con el toque personal de la Dra. Felicidad.
            </p>
          </div>
          <div className="about-right">
            <img src={foto1} alt="" className="img" />
            <img src={foto2} alt="" className="img" />
          </div>
        </div>
      </div>
      <div className="about-container vision">
        <div className="about-grid">
          <div className="about-right">
            <img src={foto3} alt="" className="img" />
          </div>
          <div className="about-left">
            <h1>Visión</h1>
            <p>
              Nuestra visión en Sentirse Bien es ser el destino de referencia
              para aquellos que buscan una experiencia transformadora de
              relajación y cuidado. Creemos en la importancia de la armonía
              entre cuerpo y mente, y nos comprometemos a ofrecer servicios que
              promuevan una vida equilibrada y saludable. Queremos que cada
              visitante se sienta renovado y revitalizado, dejando el estrés
              atrás y abrazando una sensación duradera de bienestar.
            </p>
          </div>
        </div>
      </div>
      <div className="about-container">
        <div className="about-grid">
          <div className="about-right">
            <h1>Equipo de Trabajo</h1>
            <p>
              En Sentirse Bien, nuestro equipo está formado por profesionales
              altamente capacitados y apasionados por el bienestar integral. La
              Dra. Felicidad, con su amplia experiencia en medicina y terapias
              holísticas, lidera el equipo con un enfoque personalizado y
              compasivo. Junto a ella, contamos con terapeutas y esteticistas
              dedicados a brindar tratamientos de calidad y atención
              excepcional. Cada miembro de nuestro equipo comparte el compromiso
              de hacer que cada visita sea una experiencia única y profundamente
              satisfactoria.
            </p>
          </div>
          <div className="about-left">
            <img src={foto3} alt="" className="img" />
          </div>
        </div>
      </div>
      <Footer></Footer>    
      
      </>
  );
}
