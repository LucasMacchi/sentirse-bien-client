import "./App.css";
import { Body } from "./Componentes/Body/Body";
import { useContext, useEffect } from 'react';
import { GlobalContext } from "./Context/GlobalState";
import { useNavigate } from "react-router-dom";

function App() {
    const global = useContext(GlobalContext)
    const navigate = useNavigate();

    useEffect(() => {
        global?.session()
        global?.getConsult()
        global?.getTurnos()
        
    }, [])

    useEffect(() => {
        if(global?.isLog && global?.user.rol !== 0) navigate("/profile")
    },[global?.isLog])

    return (
        <>
            <Body></Body>

        </>
    );
}

export default App;
