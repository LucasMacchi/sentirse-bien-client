import { Header } from "../Header/Header";
import MenuLateral from "../MenuLateral/MenuLateral";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalState";
import { IProfessionals } from "../../Interfaces/Interfaces";
import{ useState, useEffect, useContext } from "react";

export default function TurnosDia(){

    const [turnos, setTurnos] = useState<IProfessionals[]>([])
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [filtro, setFiltro] = useState("");
    const global = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        const complete = global?.completeServicesProfessional(global.allUsers, global.turnos)
        setTurnos(complete ? complete : [] )
    },[])

    useEffect(() => {
        const token = localStorage.getItem('jwToken')
        if(!token) navigate("/")
        const filtrado = filtrarTurnos()
        filtrado?.sort(compareHours)
        setTurnos(filtrado ? filtrado : turnos)
        console.log("Filtrado ", filtrado)
    },[fechaFin, fechaInicio, filtro])

    const compareHours = (a: IProfessionals, b: IProfessionals): number => {
        if(parseInt(a.hora) < parseInt(b.hora)) return -1
        if(parseInt(a.hora) > parseInt(b.hora)) return 1
        return 0
    }

    const filtrarTurnos = (): IProfessionals[] | undefined => {
        const complete = global?.completeServicesProfessional(global.allUsers, global.turnos)
        if(complete) {
            if(fechaInicio || fechaFin || filtro){
                const filtered = complete.filter((t) => {
                    const pagoFecha = new Date(t.fecha)
                    const fechaStart = fechaInicio ? new Date(fechaInicio) : new Date(0)
                    const fechaEnd = fechaFin ? new Date(fechaFin) : new Date("01-01-2050")
                    if(pagoFecha <= fechaEnd && pagoFecha >= fechaStart) {
                        if(filtro){
                            if(t.professinalName?.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())) return t
                            
                        }
                        else return t
                    }
                })
                return filtered
            } else return complete
            
        }
        else return complete
    }


    return (<>
    <Header />
    <MenuLateral />
    </>)
}