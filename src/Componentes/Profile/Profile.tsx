import { useContext, useEffect } from "react";
import { Header } from "../Header/Header";
import { GlobalContext } from "../../Context/GlobalState";
import "./Profile.css";
import { ITurno } from "../../Interfaces/Interfaces";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const global = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleResponderConsultas = (id: string) => {
    global?.changeMenuResponse(true, id);
  };

  useEffect(() => {
    if (!global?.isLog) {
      navigate("/");
    }else{
      global?.getTurnosComplete()
    }
  }, []);

  const payTurn = (id: number | undefined) => {
    if (id) {
      const monto = 20000;
      const turn: ITurno = {
        id: id,
        servicio: "",
        fecha: "",
        hora: "",
        cliente: 0,
        pagado: false,
        monto: monto,
      };
      global?.changeMenuPayment(true, turn);
    }
  };

  return (
    <>
      <Header />
      <div className="welcome">
        <p className="descuento">
          Acordate que usando la app, tenés <span className="descuento-span">10% de descuento</span> al pedir un turno!
        </p>
      </div>
      <section className="profile">
        <div className="container">
          <h2>Mis Consultas</h2>
          {global?.consults.length === 0 ? (
            <p>No tienes consultas.</p>
          ) : (
            <div className="consults-grid">
              {global?.consults.map((consulta) => (
                <div className="consulta-card" key={consulta.id}>
                  <div className="card-content">
                    <p>
                      <strong>Descripción:</strong> {consulta.descripcion}
                    </p>
                    <p>
                      <strong>Respuesta:</strong>{" "}
                      {consulta.respuesta || "No respondida"}
                    </p>
                    <p>
                      <strong>Cerrado:</strong> {consulta.cerrado ? "Sí" : "No"}
                    </p>
                  </div>
                  {global?.user.rol !== 0 && !consulta.cerrado && (
                    <button
                      className="respond-button"
                      onClick={() => handleResponderConsultas(consulta.id)}
                    >
                      Responder
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
          <h2>Mis Turnos</h2>

          {global?.turnos.length === 0 ? (
            <p>No tienes Turnos.</p>
          ) : (
            <div className="consults-grid">
              {global?.turnos.map((t) => (
                <div className="consulta-card" key={t.fecha + t.hora}>
                  <div className="card-content">
                    <p>
                      <strong>Fecha:</strong> {t.fecha}
                    </p>
                    <p>
                      <strong>Hora:</strong> {t.hora || "No respondida"}
                    </p>
                    {!t.pagado && (
                      <button
                        className="respond-button"
                        onClick={() => payTurn(t.id)}
                      >
                        Pagar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
