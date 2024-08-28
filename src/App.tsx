import './App.css'
import { Body } from './Componentes/Body/Body';
import ResponsiveAppBar from './Componentes/Header/ResponsiveAppBar';
import Login from './Componentes/Menus/Login/Login';
import Alerta from './Componentes/Others/Alert';


function App() {
  return (
    <>
      <Login/>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Body></Body>
      <Alerta/>
    </>
  );
}

export default App;

