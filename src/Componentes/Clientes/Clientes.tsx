import { useContext, useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { GlobalContext } from "../../Context/GlobalState";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import "../Clientes/Clientes.css";
import logoImg from '../../assets/logo.png'; 

interface User {
    id: number; 
    first_name: string;
    last_name: string;
    email: string;
    telefono: string;
    rol: number;
}

export default function Clientes() {
    const global = useContext(GlobalContext);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const usuarios = global?.allUsers || [];

    useEffect(() => {
        global?.getClientes();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsuarios = usuarios.filter((user: User) =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRolString = (rol: number): string => {
        switch(rol) {
            case 0: return "Usuario";
            case 1: return "Trabajador";
            case 2: return "Secretaria";
            case 3: return "Administrador";
            default: return "Desconocido";
        }
    };

    const handleDownloadPDF = () => {
        try {
            const doc = new jsPDF();
            
            const imgWidth = 40;
            const imgHeight = 40;
            doc.addImage(logoImg, 'PNG', 10, 10, imgWidth, imgHeight);
            
            doc.setFontSize(24);
            doc.setTextColor(255, 128, 171); 
            doc.text('Spa Sentirse Bien', 60, 30);
            doc.setFontSize(14);
            doc.setTextColor(100);
            doc.text('Tu bienestar es nuestra prioridad', 60, 40);
            
            doc.setDrawColor(255, 128, 171);
            doc.setLineWidth(0.5);
            doc.line(10, 55, 200, 55);
            
            doc.setFontSize(18);
            doc.setTextColor(0);
            doc.text('Lista de Clientes', 14, 70);
            
            const headers = [["Nombre", "Email", "Teléfono"]];
            const data = filteredUsuarios.map((user: User) => [
                `${user.first_name} ${user.last_name}`,
                user.email,
                user.telefono,
            ]);

            autoTable(doc, {
                head: headers,
                body: data,
                startY: 80,
                theme: 'striped',
                styles: { fontSize: 10, cellPadding: 5 },
                headStyles: { fillColor: [255, 128, 171], textColor: 255, fontStyle: 'bold' },
                alternateRowStyles: { fillColor: [245, 245, 245] },
            });

            const pageCount = doc.internal.pages.length - 1;
            for(let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(10);
                doc.setTextColor(150);
                doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
            }

            doc.save('lista_clientes_spa_sentirse_bien.pdf');
        } catch (error) {
            console.error('Error al generar el PDF:', error);
            alert('Hubo un error al generar el PDF. Por favor, intente de nuevo.');
        }
    };

    return (
        <>
            <Header />
            <div className="clientes-container">
                <h2>Lista de Usuarios</h2>
                <div className="actions-container">
                    <input
                        type="text"
                        placeholder="Buscar usuario..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <button onClick={handleDownloadPDF} className="download-btn">
                        Descargar PDF
                    </button>
                </div>
                <table className="clientes-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsuarios.length > 0 ? (
                            filteredUsuarios.map((user: User) => (
                                <tr key={user.id} className="cliente-row">
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.telefono}</td>
                                    <td>{getRolString(user.rol)}</td>
                                    <td>
                                        <button className="asignar-rol-btn" onClick={() => global?.changeMenuRol(true, user.id)}>
                                            Asignar Rol
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>No se encontraron usuarios.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
