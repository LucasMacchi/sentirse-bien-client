import { Header } from "../Header/Header";
import "./Servicios.css";
import logo from "../../assets/logo.png";
import velaslim from "../../assets/velaslim.jpg";
import dermohealth from "../../assets/dermohealth.jpg";
import crio from "../../assets/crio.jpg";
import cavitacion from "../../assets/cavitacion.jpg";
import puntadiamante from "../../assets/puntadiamante.jpg";
import limpieza from "../../assets/limpieza.png";
import criofacial from '../../assets/criofacial.jpg'
import lifting from "../../assets/lifting.png"
import depilacion from "../../assets/depilacion.png"
import manicura from "../../assets/manicura.jpg"
import antistress from "../../assets/antistress.webp"
import descontracturante from "../../assets/descontracturante.jpg"
import piedras from "../../assets/piedras.webp"
import circu from "../../assets/circu.jpg"
import { Footer } from "../Footer/Footer";

export function Servicios() {
  return (
    <>
      <Header></Header>
      <div className="servicios-container">
        <img src={logo} alt="" />
        <h1 className="titulo">Nuestros Servicios</h1>
        <hr style={{ width: "100%" }} />
        <br />
        <p className="servicio-title">Tratamientos Corporales</p>
        <div className="servicio-grid">
          <div className="servicio-card">
            <img src={velaslim} alt="" className="servicios-img" />
            <div className="servicio-descripcion">
              <h1>VelaSlim</h1>
              <p>Reducción de la circunferencia corporal y la celulitis.</p>
              <h1 className="precio">$10000</h1>
            </div>
          </div>
          <div className="servicio-card">
            <img src={dermohealth} alt="" className="servicios-img" />
            <div className="servicio-descripcion">
              <h1>DermoHealth</h1>
              <p>
                Moviliza los distintos tejidos de la piel y estimula la
                microcirculación, generando un drenaje linfático.
              </p>
              <h1 className="precio">$10000</h1>
            </div>
          </div>
          <div className="servicio-card">
            <img src={crio} alt="" className="servicios-img" />
            <div className="servicio-descripcion">
              <h1>Criofrecuencia</h1>
              <p>Produce un efecto de lifting instantáneo.</p>
                <h1 className="precio">$10000</h1>
            </div>
          </div>
          <div className="servicio-card">
            <img src={cavitacion} alt="" className="servicios-img" />
            <div className="servicio-descripcion">
              <h1>Ultracavitación</h1>
              <p>Técnica reductora.</p>
                <h1 className="precio">$10000</h1>
            </div>
          </div>
        </div>
        <hr style={{ width: "100%" }} />
        <br />
        <p className="servicio-title">Tratamientos Faciales</p>
        <div className="servicio-grid">
          <div className="servicio-card">
            <img src={puntadiamante} alt="" className="servicios-img" />
            <div className="servicio-descripcion">
              <h1>Punta de diamante</h1>
              <p>Microexfoliación.</p>
              <h1 className="precio">$10000</h1>
            </div>
          </div>
          <div className="servicio-card">
            <img src={limpieza} alt="" className="servicios-img" />
            <div className="servicio-descripcion">
              <h1>Limpieza profunda + Hidratación</h1>
              <h1 className="precio">$10000</h1>
            </div>
          </div>
          <div className="servicio-card">
            <img src={criofacial} alt="" className="servicios-img" />
            <div className="servicio-descripcion">
              <h1>Criofrecuencia facial</h1>
              <p>Resultados instantáneos de
              efecto lifting.</p>
                <h1 className="precio">$10000</h1>
            </div>
          </div>
        </div>
        <hr style={{ width: "100%" }} />
        <br />
        <p className="servicio-title">Belleza</p>
        <div className="servicio-grid">
          <div className="servicio-card">
            <img src={lifting} alt="" className="servicios-img" />
            <div className="servicio-descripcion">
              <h1>Lifting de pestaña</h1>
              <h1 className="precio">$10000</h1>
            </div>
          </div>
          <div className="servicio-card">
            <img src={depilacion} alt="" className="servicios-img" />
            <div className="servicio-descripcion">
              <h1>Depilación facial</h1>
              <h1 className="precio">$10000</h1>
            </div>
          </div>
          <div className="servicio-card">
            <img src={manicura} alt="" className="servicios-img" />
            <div className="servicio-descripcion">
              <h1>Belleza de manos y pies</h1>
              <h1 className="precio">$10000</h1>
            </div>
          </div>
        </div>
        <hr style={{ width: "100%" }} />
        <br />
        <p className="servicio-title">Masajes</p>
        <div className="servicio-grid">
          <div className="servicio-card">
            <img src={antistress} alt="" className="servicios-img" />
            <div className="servicio-descripcion">
              <h1>Anti-stress</h1>
              <h1 className="precio">$10000</h1>
            </div>
          </div>
          <div className="servicio-card">
            <img src={descontracturante} alt="" className="servicios-img" />
            <div className="servicio-descripcion">
              <h1>Descontracturantes</h1>
              <h1 className="precio">$10000</h1>
            </div>
          </div>
          <div className="servicio-card">
            <img src={piedras} alt="" className="servicios-img" />
            <div className="servicio-descripcion">
              <h1>Masajes con piedras calientes.</h1>
              <h1 className="precio">$10000</h1>
            </div>
          </div>
          <div className="servicio-card">
            <img src={circu} alt="" className="servicios-img" />
            <div className="servicio-descripcion">
              <h1>Circulatorios</h1>
              <h1 className="precio">$10000</h1>
            </div>
          </div>
        </div>
        <br />
        <br />
        <p>Ya te decidiste?</p>
        <br />
        <button className="vermas-btn">Agenda tu turno</button>
      </div>
      <Footer></Footer>
    </>
  );
}
