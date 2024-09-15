import { useContext } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { GlobalContext } from "../../Context/GlobalState";
import "./Profile.css";

export function Profile() {
  const global = useContext(GlobalContext);

  return (
    <>
      <Header></Header>
      <section className="profile">
        <div className="container">

          <div className="profile-welcome">
          <h1>
              Bienvenido, {global?.user.nombre} {global?.user.apellido}!
            </h1>

          </div>
          <hr style={{width: '50%', marginBottom: '1em'}}/>
          <h2>Mis turnos</h2>
          <div className="turnos-lista"></div>
          <h2>Mis consultas</h2>
          <div className="turnos-lista"></div>
        </div>
      </section>

      <Footer></Footer>
    </>
  );
}
