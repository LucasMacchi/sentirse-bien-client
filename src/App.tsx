import "./App.css";
import { Body } from "./Componentes/Body/Body";
import Login from "./Componentes/Menus/Login/Login";
import Register from "./Componentes/Menus/Register/Register";
import Alerta from "./Componentes/Others/Alert";
import {useContext } from 'react';
import { GlobalContext } from "./Context/GlobalState";

function App() {
  const global = useContext(GlobalContext)
  const checksession = async () => global?.session()
  checksession()
  return (
    <>
      <Login />
      <Register />
      <Body></Body>
      <Alerta />
    </>
  );
}

export default App;
