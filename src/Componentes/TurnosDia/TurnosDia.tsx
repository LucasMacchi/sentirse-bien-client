import { Header } from "../Header/Header";
import MenuLateral from "../MenuLateral/MenuLateral";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalState";
import { IProfessionals } from "../../Interfaces/Interfaces";
import { useState, useEffect, useContext } from "react";
import "./TurnosDia.css";

export default function TurnosDia(){
    const [turnos, setTurnos] = useState<IProfessionals[]>([]);
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
    const [filtroProfesional, setFiltroProfesional] = useState("");
    const global = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwToken');
        if(!token) navigate("/");
        cargarTurnos();
    }, [fecha, filtroProfesional]);

    const cargarTurnos = async () => {
        if (!global) return;

        try {
            const turnosDelDia = global.completeServicesProfessional(global.allUsers, global.turnos);
            
            const turnosFiltrados = turnosDelDia.filter(turno => 
                turno.fecha === fecha &&
                (!filtroProfesional || turno.professinalName?.toLowerCase().includes(filtroProfesional.toLowerCase()))
            );
            
            setTurnos(turnosFiltrados.sort(compareHours));
        } catch (error) {
            console.error("Error al cargar turnos:", error);
        }
    };

    const compareHours = (a: IProfessionals, b: IProfessionals): number => {
        return parseInt(a.hora) - parseInt(b.hora);
    };

    return (
        <>
        <div className="turnos-dia-page">
            <Header />
            <MenuLateral />
            <div className="content-wrapper">
                <div className="turnos-dia-container">
                    <h1>Listado de Clientes del Día</h1>
                    <div className="filtros">
                        <div className="filtro-fecha">
                            <input 
                                type="date" 
                                value={fecha} 
                                onChange={(e) => setFecha(e.target.value)}
                            />
                        </div>
                        <input 
                            type="text" 
                            className="filtro-texto" 
                            placeholder="Filtrar por profesional" 
                            value={filtroProfesional} 
                            onChange={(e) => setFiltroProfesional(e.target.value)}
                        />
                    </div>
                    {turnos.length > 0 ? (
                        <div className="tabla-container">
                            <table className="tabla-turnos">
                                <thead>
                                    <tr>
                                        <th>Profesional</th>
                                        <th>Cliente</th>
                                        <th>Servicio</th>
                                        <th>Horario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {turnos.map((turno, index) => (
                                        <tr key={index}>
                                            <td>{turno.professinalName}</td>
                                            <td>{turno.userFullname}</td>
                                            <td>{turno.servicio}</td>
                                            <td>{turno.hora}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="no-turnos-mensaje">
                            No hay turnos para el día seleccionado.
                        </div>
                    )}
                    <button className="btn-informe" onClick={() => navigate("/informe-servicios")}>Ver Informe</button>

                </div>
            </div>
        </div>
        </>
        
    );
}