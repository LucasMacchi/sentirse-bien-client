import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { GlobalContext } from "../../Context/GlobalState";
import "./Profile.css";
import MenuLateral from "../MenuLateral/MenuLateral";
import { ITurno } from "../../Interfaces/Interfaces";

export function Profile() {
  const global = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleResponderConsultas = (id: string) => {
    global?.changeMenuResponse(true, id);
  };

  useEffect(() => {
    const token = localStorage.getItem('jwToken');

    if (!token) {
      navigate("/");
    } else {
      global?.session();
      global?.getTurnosComplete();
      global?.getConsult()
    }
  }, []);

  useEffect(() => {
    if (global?.isLog && global.user.rol > 0) {
      global?.getPagos();
      global.getClientes();
    }
  },[global?.user.rol])

  const payTurn = (id: number | undefined) => {
    if(id) {
      const monto = 20000
      const turn: ITurno = {id: id, servicio: "", fecha: "", hora: "", cliente: 0, pagado: false, monto: monto}
      global?.changeMenuPayment(true, turn)
    }

  }

  if (global?.user.rol !== 0) {
    return (
      <>
        <Header />
        <MenuLateral />
        <section className="admin-profile">
          <div className="container">
            <div className="welcome-message">
              <h1>Bienvenido, {global?.user?.first_name}!</h1>
              <p>Aquí puedes gestionar todas las operaciones.</p>
            </div>
            <div className="admin-dashboard">
              <h2>Resumen de Actividades</h2>
              <div className="stats">
                <div className="stat-card">
                  <h3>Total de Consultas</h3>
                  <p>{global?.consults.length ? global?.consults.length : 0}</p>
                </div>
                <div className="stat-card">
                  <h3>Consultas Pendientes</h3>
                  <p>
                    {global?.consults
                      ? global?.consults.filter((c) => !c.cerrado).length + 1
                      : 0}
                  </p>
                </div>
                <div className="stat-card">
                  <h3>Total de Clientes</h3>
                  <p>{global?.clientes ? global?.clientes.length + 1 : 0}</p>
                </div>
              </div>
            </div> 

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
                        <strong>Cerrado:</strong>{" "}
                        {consulta.cerrado ? "Sí" : "No"}
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
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <MenuLateral />
        <section className="profile">
          <div className="container">
            <div className="profile-welcome">
              <h1>
                Bienvenido, {global?.user.first_name} {global?.user.last_name}!
              </h1>
            </div>
            <hr className="divider" />

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
                        <strong>Cerrado:</strong>{" "}
                        {consulta.cerrado ? "Sí" : "No"}
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
        <Footer />
      </>
    );
  }
}
