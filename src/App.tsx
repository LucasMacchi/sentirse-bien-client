import "./App.css";
import { Body } from "./Componentes/Body/Body";
import { useContext, useEffect } from 'react';
import { GlobalContext } from "./Context/GlobalState";
function App() {
    const global = useContext(GlobalContext)
    useEffect(() => {
        global?.session()
        global?.getConsult()
        global?.getTurnos()
    }, [])



    return (
        <>
            <Body></Body>

        </>
    );
}

export default App;
