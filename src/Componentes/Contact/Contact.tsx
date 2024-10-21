import React, { useEffect, useRef } from "react";
import facebook from "../../assets/facebook.svg";
import whatsapp from "../../assets/whatsapp.svg";
import fotofooter from "../../assets/foto2.png";
import "./Contact.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export const Contact: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = contactRef.current?.querySelectorAll('.scroll-animate');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <div className="contacto" ref={contactRef}>
        <div className="footer-left">
          <div className="contactanos-text scroll-animate">
            <h1>Contáctanos</h1>
          </div>
          <div className="contact-info">
            <h2 className="scroll-animate">Teléfono</h2>
            <p className="scroll-animate">(123) 456-7890</p>
            <h2 className="scroll-animate">Email</h2>
            <p className="scroll-animate">sentirsebien@gmail.com</p>
            <h2 className="scroll-animate">Dirección</h2>
            <iframe
              className="scroll-animate"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.5827771761155!2d-58.981585523670475!3d-27.4511106159161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450cf0c80be0d3%3A0xc9f9278c74810912!2sUTN%20-%20Facultad%20Regional%20Resistencia!5e0!3m2!1ses-419!2sar!4v1724550535189!5m2!1ses-419!2sar"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
            
            <h2 className="scroll-animate">Redes Sociales</h2>
            <div className="social-icons scroll-animate">
              <img src={facebook} alt="Facebook" className="icon" />
              <img src={whatsapp} alt="WhatsApp" className="icon" />
            </div>
          </div>
        </div>
        <div className="footer-right scroll-animate">
          <img src={fotofooter} alt="Footer" className="foto-footer" />
        </div>
      </div>
      <Footer />
    </>
  );
};
