import { useState, useEffect, useContext } from "react";
import { Header } from "../Header/Header";
import MenuLateral from "../MenuLateral/MenuLateral";
import { GlobalContext } from "../../Context/GlobalState";
import { IProfessionals } from "../../Interfaces/Interfaces";
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "./InformeServicios.css";
import { UserOptions } from 'jspdf-autotable';
import logoImg from "../../assets/logo.png";

export default function InformeServicios() {
    const [turnos, setTurnos] = useState<IProfessionals[]>([]);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [filtroProfesional, setFiltroProfesional] = useState("");
    const [profesionales, setProfesionales] = useState<string[]>([]);
    const global = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwToken');
        if(!token) navigate("/");
        cargarTurnos();
        cargarProfesionales();
    }, [fechaInicio, fechaFin, filtroProfesional]);

    const cargarProfesionales = () => {
        const profesionalesUnicos = [...new Set(global?.completeServicesProfessional(global.allUsers, global.turnos).map(turno => turno.professinalName))];
        setProfesionales(profesionalesUnicos as string[]);
    };

    const cargarTurnos = () => {
        const turnosFiltrados = global?.completeServicesProfessional(global.allUsers, global.turnos).filter(turno => {
            const turnoFecha = new Date(turno.fecha);
            const inicio = fechaInicio ? new Date(fechaInicio) : new Date(0);
            const fin = fechaFin ? new Date(fechaFin) : new Date();
            return turnoFecha >= inicio && turnoFecha <= fin &&
                (!filtroProfesional || turno.professinalName?.toLowerCase().includes(filtroProfesional.toLowerCase()));
        });
        
        const turnosCompletos = global?.completeServicesProfessional(global.allUsers, turnosFiltrados || []);
        setTurnos(turnosCompletos?.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()) || []);
    };

    const generarPDF = () => {
        try {
            console.log("Iniciando generación de PDF");
            
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            }) as jsPDF & { autoTable: (options: UserOptions) => void };

            const imgWidth = 40;
            const imgHeight = 40;
            doc.addImage(logoImg, 'PNG', 10, 10, imgWidth, imgHeight);

                        
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(24);
            doc.setTextColor(255, 128, 171);
            
            doc.text('Informe de Servicios por Profesional', 50, 30);
            
            doc.setFontSize(12);
            doc.setTextColor(102, 102, 102);
            doc.text(`Desde: ${fechaInicio || 'Inicio'} Hasta: ${fechaFin || 'Fin'}`, 14, 50);
            doc.text(`Profesional: ${filtroProfesional || 'Todos'}`, 14, 57);

            const tableColumn = ["Fecha", "Hora", "Profesional", "Cliente", "Servicio"];
            const tableRows = turnos.map(turno => [
                turno.fecha ?? '',
                turno.hora ?? '',
                turno.professinalName ?? '',
                turno.userFullname ?? '',
                turno.servicio ?? '',
            ]);

            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 65,
                styles: { fontSize: 10, cellPadding: 3 },
                headStyles: { fillColor: [255, 128, 171], textColor: 255 },
                alternateRowStyles: { fillColor: [245, 245, 245] },
            });

    

            console.log("PDF generado, intentando descargar");
            doc.save('informe_servicios_sentirse_bien.pdf');
            console.log("Descarga de PDF iniciada");
        } catch (error) {
            console.error("Error al generar el PDF:", error);
            alert("Hubo un error al generar el PDF. Por favor, intente de nuevo.");
        }
    };

    return (
        <>
        <div className="informe-servicios-page">
            <Header />
            <MenuLateral />
            <div className="content-wrapper">
                <div className="informe-servicios-container">
                    <h1>Informe de Servicios por Profesional</h1>
                    <div className="filtros">
                        <div className="filtro-fechas">
                            <input 
                                type="date" 
                                value={fechaInicio} 
                                onChange={(e) => setFechaInicio(e.target.value)}
                                placeholder="Fecha de inicio"
                            />
                            <input 
                                type="date" 
                                value={fechaFin} 
                                onChange={(e) => setFechaFin(e.target.value)}
                                placeholder="Fecha de fin"
                            />
                        </div>
                        <select 
                            className="filtro-profesional"
                            value={filtroProfesional}
                            onChange={(e) => setFiltroProfesional(e.target.value)}
                        >
                            <option value="">Todos los profesionales</option>
                            {profesionales.map((prof, index) => (
                                <option key={index} value={prof}>{prof}</option>
                            ))}
                        </select>
                    </div>
                    <button className="btn-descargar" onClick={generarPDF}>Descargar Informe PDF</button>
                    {turnos.length > 0 ? (
                        <div className="tabla-container">
                            <table className="tabla-turnos">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th>Profesional</th>
                                        <th>Cliente</th>
                                        <th>Servicio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {turnos.map((turno, index) => (
                                        <tr key={index}>
                                            <td>{turno.fecha}</td>
                                            <td>{turno.hora}</td>
                                            <td>{turno.professinalName}</td>
                                            <td>{turno.userFullname}</td>
                                            <td>{turno.servicio}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="no-turnos-mensaje">
                            No hay turnos para el rango de fechas y/o profesional seleccionado.
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}
