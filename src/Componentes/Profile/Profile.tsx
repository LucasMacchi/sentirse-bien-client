import { useContext } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { GlobalContext } from "../../Context/GlobalState";
import "./Profile.css";
import MenuLateral from "../MenuLateral/MenuLateral";

export function Profile() {
  const global = useContext(GlobalContext);
  
  console.log(global); // Agregar este console.log para depurar

  const handleResponderConsultas = (id: string) => {
    global?.changeMenuResponse(true, id);
  };

  if (global?.user.rol === 3) {
    return (
      <>
        <Header />
        <MenuLateral />
        <section className="admin-profile">
          <div className="container">
            <div className="welcome-message">
              <h1>Bienvenido, Administrador {global?.user?.nombre}!</h1>
              <p>Aquí puedes gestionar todas las operaciones.</p>
            </div>
            <div className="admin-dashboard">
              <h2>Resumen de Actividades</h2>
              <div className="stats">
                <div className="stat-card">
                  <h3>Total de Consultas</h3>
                  <p>{global?.consults.length}</p>
                </div>
                <div className="stat-card">
                  <h3>Consultas Pendientes</h3>
                  <p>{global?.consults.filter(c => !c.cerrado).length}</p>
                </div>
                <div className="stat-card">
                  <h3>Total de Clientes</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <section className="profile">
          <div className="container">
            <div className="profile-welcome">
              <h1>Bienvenido, {global?.user.nombre} {global?.user.apellido}!</h1>
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
                      <p><strong>Descripción:</strong> {consulta.descripcion}</p>
                      <p><strong>Respuesta:</strong> {consulta.respuesta || "No respondida"}</p>
                      <p><strong>Cerrado:</strong> {consulta.cerrado ? "Sí" : "No"}</p>
                    </div>
                    {global?.user.rol === 1 && !consulta.cerrado && (
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
        <Footer />
      </>
    );
  }
}
