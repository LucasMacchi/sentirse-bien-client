import { useContext, useEffect, useState } from "react";
import { Header } from "../Header/Header";
import MenuLateral from "../MenuLateral/MenuLateral";
import { GlobalContext } from "../../Context/GlobalState";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import "../Clientes/Clientes.css";
import logoImg from '../../assets/logo.png'; // Asegúrate de que esta ruta sea correcta

interface User {
    id: string; // Cambiado a string
    first_name: string;
    last_name: string;
    email: string;
    telefono: string;
}

export default function Clientes() {
    const global = useContext(GlobalContext);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const clientes = global?.clientes || [];

    useEffect(() => {
        global?.getClientes();
    }, [global]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredClientes = clientes.filter((user: User) =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            const data = filteredClientes.map((cliente: User) => [
                `${cliente.first_name} ${cliente.last_name}`,
                cliente.email,
                cliente.telefono,
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

            // Agregar pie de página
            const pageCount = doc.internal.pages.length - 1;
            for(let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(10);
                doc.setTextColor(150);
                doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
            }

            // Guardar el PDF
            doc.save('lista_clientes_spa_sentirse_bien.pdf');
        } catch (error) {
            console.error('Error al generar el PDF:', error);
            alert('Hubo un error al generar el PDF. Por favor, intente de nuevo.');
        }
    };

    return (
        <>
            <Header />
            <MenuLateral />
            <div className="clientes-container">
                <h2>Lista de Clientes</h2>
                <div className="actions-container">
                    <input
                        type="text"
                        placeholder="Buscar cliente..."
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
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClientes.length > 0 ? (
                            filteredClientes.map((user: User) => (
                                <tr key={user.id} className="cliente-row">
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.telefono}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>No se encontraron clientes.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
