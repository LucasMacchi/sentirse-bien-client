import './App.css'
import { Body } from './Componentes/Body/Body';
import ResponsiveAppBar from './Componentes/Header/ResponsiveAppBar';
import Login from './Componentes/Menus/Login/Login';


function App() {
  return (
    <>
      <Login/>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Body></Body>
    </>
  );
}

export default App;

