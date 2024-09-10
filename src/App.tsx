import "./App.css";
import { Body } from "./Componentes/Body/Body";
import Login from "./Componentes/Menus/Login/Login";
import Register from "./Componentes/Menus/Register/Register";
import Consult from "./Componentes/Menus/Consult/Consult";
import Alerta from "./Componentes/Others/Alert";
import { useContext, useEffect } from 'react';
import { GlobalContext } from "./Context/GlobalState";
import Review from "./Componentes/Menus/Review/Review";

function App() {
    const global = useContext(GlobalContext)

    useEffect(() => {
        global?.session()
        global?.getConsult()
    }, [])

    return (
        <>
            <Review />
            <Consult />
            <Login />
            <Register />
            <Body></Body>
            <Alerta />
        </>
    );
}

export default App;
