import React, { useState, useEffect, useContext } from 'react';
import { Header } from "../Header/Header";
import MenuLateral from "../MenuLateral/MenuLateral";
import usersData from "../../Mocks/users.json";
import "./Ingresos.css";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logoSpa from '../../assets/logo.png';
import { UserOptions } from 'jspdf-autotable';
import { GlobalContext } from "../../Context/GlobalState";

interface Usuario {
  id: number;
  first_name: string;
  last_name: string;
  rol: number;
  email: string;
}

interface IngresosPorUsuario {
  id: number;
  nombre: string;
  rol: string;
  email: string;
  ingresos: number;
  cantidadTurnos: number;
}

const Ingresos: React.FC = () => {
  const global = useContext(GlobalContext)
  const [ingresosPorUsuario, setIngresosPorUsuario] = useState<IngresosPorUsuario[]>([]);
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalTurnos, setTotalTurnos] = useState(0);
  const [promedioIngresoPorTurno, setPromedioIngresoPorTurno] = useState(0);
  const [usuarioMasIngresos, setUsuarioMasIngresos] = useState<IngresosPorUsuario | null>(null);

  useEffect(() => {
    const calcularIngresos = () => {
      const usuarios = usersData.users as Usuario[];
      const pagos = global?.pagosInforme ? global?.pagosInforme : [];

      const ingresosPorUsuario = usuarios.map(usuario => {
        const pagosPorUsuario = pagos.filter(pago => pago.usuario === usuario.id.toString());
        const ingresos = pagosPorUsuario.reduce((total, pago) => total + pago.monto, 0);
        return {
          id: usuario.id,
          nombre: `${usuario.first_name} ${usuario.last_name}`,
          rol: usuario.rol === 3 ? "Administrador" : "Usuario",
          email: usuario.email,
          ingresos: ingresos,
          cantidadTurnos: pagosPorUsuario.length
        };
      }).filter(usuario => usuario.ingresos > 0);

      const totalIngresos = ingresosPorUsuario.reduce((total, usuario) => total + usuario.ingresos, 0);
      const totalTurnos = ingresosPorUsuario.reduce((total, usuario) => total + usuario.cantidadTurnos, 0);
      const promedioIngresoPorTurno = totalTurnos > 0 ? totalIngresos / totalTurnos : 0;
      const usuarioMasIngresos = ingresosPorUsuario.reduce((max, usuario) => max.ingresos > usuario.ingresos ? max : usuario);

      setIngresosPorUsuario(ingresosPorUsuario);
      setTotalIngresos(totalIngresos);
      setTotalTurnos(totalTurnos);
      setPromedioIngresoPorTurno(promedioIngresoPorTurno);
      setUsuarioMasIngresos(usuarioMasIngresos);
    };

    calcularIngresos();
  }, []);

  const generarInformePDF = () => {
    const doc = new jsPDF();
    
    // Configuración de colores
    const colorPrimario = '#ff80ab';
    const colorSecundario = '#333333';
    
    // Agregar logo
    doc.addImage(logoSpa, 'PNG', 10, 10, 30, 30);
    
    // Título y slogan
    doc.setFontSize(24);
    doc.setTextColor(colorPrimario);
    doc.text('SENTIRSE BIEN', 50, 25);
    doc.setFontSize(12);
    doc.setTextColor(colorSecundario);
    doc.text('Tu oasis de bienestar y relajación', 50, 35);
    
    // Línea separadora
    doc.setDrawColor(colorPrimario);
    doc.line(10, 45, 200, 45);
    
    // Título del informe
    doc.setFontSize(18);
    doc.setTextColor(colorPrimario);
    doc.text('Informe Detallado de Ingresos', 105, 60, { align: 'center' });
    
    // Resumen general
    doc.setFontSize(14);
    doc.setTextColor(colorSecundario);
    doc.text('Resumen General', 20, 75);
    doc.setFontSize(12);
    doc.text(`Total de Ingresos: $${totalIngresos.toLocaleString()}`, 20, 85);
    doc.text(`Total de Turnos: ${totalTurnos}`, 20, 95);
    doc.text(`Promedio de Ingreso por Turno: $${promedioIngresoPorTurno.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, 105);
    
    // Usuario destacado
    if (usuarioMasIngresos) {
      doc.setFontSize(14);
      doc.text('Usuario con Más Ingresos', 20, 120);
      doc.setFontSize(12);
      doc.text(`Nombre: ${usuarioMasIngresos.nombre}`, 20, 130);
      doc.text(`Rol: ${usuarioMasIngresos.rol}`, 20, 140);
      doc.text(`Email: ${usuarioMasIngresos.email}`, 20, 150);
      doc.text(`Total de Ingresos: $${usuarioMasIngresos.ingresos.toLocaleString()}`, 20, 160);
      doc.text(`Cantidad de Turnos: ${usuarioMasIngresos.cantidadTurnos}`, 20, 170);
    }
    
    // Tabla de ingresos por usuario
    doc.addPage();
    doc.setFontSize(14);
    doc.text('Desglose por Usuario', 20, 20);
    
    const headers = [['Usuario', 'Rol', 'Email', 'Ingresos', 'Cantidad de Turnos', 'Promedio por Turno']];
    const data = ingresosPorUsuario.map(usuario => [
      usuario.nombre,
      usuario.rol,
      usuario.email,
      `$${usuario.ingresos.toLocaleString()}`,
      usuario.cantidadTurnos,
      `$${(usuario.ingresos / usuario.cantidadTurnos).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    ]);
    
    (doc as jsPDF & { autoTable: (options: UserOptions) => void }).autoTable({
      head: headers,
      body: data,
      startY: 30,
      theme: 'striped',
      headStyles: { fillColor: [255, 128, 171], textColor: 255 },
      bodyStyles: { textColor: 51 },
    });
    
    // Pie de página
    const pageCount = doc.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(colorSecundario);
      doc.text('SENTIRSE BIEN - Tu camino hacia el bienestar', 105, 290, { align: 'center' });
      doc.text(`Página ${i} de ${pageCount}`, 105, 295, { align: 'center' });
    }
    
    // Guardar el PDF
    doc.save('informe-ingresos.pdf');
  };

  return (
    <>
      <Header />
      <MenuLateral />
      <div className="ingresos-container">
        <h1>Informe Detallado de Ingresos</h1>
        <button onClick={generarInformePDF} className="btn-imprimir">Descargar PDF</button>
        <div className="resumen">
          <h2>Resumen General</h2>
          <p>Total de Ingresos: ${totalIngresos.toLocaleString()}</p>
          <p>Total de Turnos: {totalTurnos}</p>
          <p>Promedio de Ingreso por Turno: ${promedioIngresoPorTurno.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        {usuarioMasIngresos && (
          <div className="usuario-destacado">
            <h2>Usuario con Más Ingresos</h2>
            <p>Nombre: {usuarioMasIngresos.nombre}</p>
            <p>Rol: {usuarioMasIngresos.rol}</p>
            <p>Email: {usuarioMasIngresos.email}</p>
            <p>Total de Ingresos: ${usuarioMasIngresos.ingresos.toLocaleString()}</p>
            <p>Cantidad de Turnos: {usuarioMasIngresos.cantidadTurnos}</p>
          </div>
        )}
        <div className="tabla-container">
          <h2>Desglose por Usuario</h2>
          <table className="tabla-ingresos">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Email</th>
                <th>Ingresos</th>
                <th>Cantidad de Turnos</th>
                <th>Promedio por Turno</th>
              </tr>
            </thead>
            <tbody>
              {ingresosPorUsuario.map(usuario => (
                <tr key={usuario.id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.rol}</td>
                  <td>{usuario.email}</td>
                  <td>${usuario.ingresos.toLocaleString()}</td>
                  <td>{usuario.cantidadTurnos}</td>
                  <td>${(usuario.ingresos / usuario.cantidadTurnos).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Ingresos;
