import "./App.css";
import { Body } from "./Componentes/Body/Body";
import { useContext, useEffect } from 'react';
import { GlobalContext } from "./Context/GlobalState";
import { useNavigate } from "react-router-dom";
import Login from "./Componentes/Menus/Login/Login";
function App() {
    const global = useContext(GlobalContext)
    const navigate = useNavigate();

    useEffect(() => {
        global?.session()
        global?.getConsult()
        global?.getTurnos()
        
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('jwToken')
        if(token) navigate("/profile")
        else global?.changeMenuLogin(true)
    },[])

    return (
        <div className="appHome">
            <Login></Login>
        </div>
    );
}

export default App;
