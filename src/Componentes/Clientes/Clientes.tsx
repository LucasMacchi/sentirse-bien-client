import { useContext, useEffect, useState } from "react";
import { Header } from "../Header/Header";
import MenuLateral from "../MenuLateral/MenuLateral";
import { GlobalContext } from "../../Context/GlobalState";
import "../Clientes/Clientes.css";

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

    return (
        <>
            <Header />
            <MenuLateral />
            <div className="clientes-container">
                <h2>Lista de Clientes</h2>
                <input
                    type="text"
                    placeholder="Buscar cliente..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
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
