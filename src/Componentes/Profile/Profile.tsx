import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { GlobalContext } from "../../Context/GlobalState";
import "./Profile.css";
import MenuLateral from "../MenuLateral/MenuLateral";
import { motion } from "framer-motion";

export function Profile() {
  const global = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleResponderConsultas = (id: string) => {
    global?.changeMenuResponse(true, id);
  };

  useEffect(() => {
    if (!global?.isLog) {
      navigate("/");
    } else {
      global.session()
      global?.getTurnosComplete(global.user.id);
      if (global?.isLog && global.user.rol > 0) {
        global?.getPagos()
        global.getClientes();
      }
      
    }
  }, []);

  if (global?.user.rol !== 0) {
    return (
      <>
        <Header />
        <MenuLateral />
        <motion.section 
          className="admin-profile"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container">
            <motion.div 
              className="welcome-message"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            >
              <h1>Bienvenido, Administrador {global?.user?.first_name}!</h1>
              <p>Aquí puedes gestionar todas las operaciones.</p>
            </motion.div>
            <motion.div 
              className="admin-dashboard"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            >
              <h2>Resumen de Actividades</h2>
              <div className="stats">
                <div className="stat-card">
                  <h3>Total de Consultas</h3>
                  <p>{global?.consults.length ? global?.consults.length : 0}</p>
                </div>
                <div className="stat-card">
                  <h3>Consultas Pendientes</h3>
                  <p>{global?.consults ? global?.consults.filter((c) => !c.cerrado).length + 1 : 0}</p>
                </div>
                <div className="stat-card">
                  <h3>Total de Clientes</h3>
                  <p>{ global?.clientes ? global?.clientes.length + 1 : 0}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <MenuLateral />
        <motion.section 
          className="profile"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container">
            <motion.div 
              className="profile-welcome"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            >
              <h1>
                Bienvenido, {global?.user.first_name} {global?.user.last_name}!
              </h1>
            </motion.div>
            <hr className="divider" />

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Mis Consultas
            </motion.h2>

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
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              Mis Turnos
            </motion.h2>

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
                      {t.pagado ? 
                      <p><strong>Pagado:</strong> Sí</p> 
                      : 
                      <p><strong>Pagado:</strong> No</p>}
                      
                      <button className="respond-button" onClick={() => global.changeMenuPayment(true, t)}>Pagar</button>
                      {!t.pagado && (
                        <button className="respond-button" onClick={() => global.changeMenuPayment(true, t)}>Pagar</button>
                      )}                      


                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.section>
        <Footer />
      </>
    );
  }
}
