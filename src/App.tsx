import "./App.css";
import { Body } from "./Componentes/Body/Body";
import Login from "./Componentes/Menus/Login/Login";
import Alerta from "./Componentes/Others/Alert";

function App() {
  return (
    <>
      <Login />
      <Body></Body>
      <Alerta />
    </>
  );
}

export default App;
