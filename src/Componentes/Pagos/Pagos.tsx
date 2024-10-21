import { useState, useEffect, useContext } from "react";
import { Header } from "../Header/Header";
import MenuLateral from "../MenuLateral/MenuLateral";
import "./Pagos.css";
import jsPDF from 'jspdf';
import logoSpa from '../../assets/logo.png'; // Asegúrate de tener el logo en esta ruta
import { GlobalContext } from "../../Context/GlobalState";
import { IPago } from "../../Interfaces/Interfaces";


export default function Pagos() {
  const global = useContext(GlobalContext);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [filtro, setFiltro] = useState("");
  

  useEffect(() => {
    global?.getPagos();
  }, []);

  const filtrarPagos = () => {
    return global?.pagosInforme.filter((pago) => {
      const usuario = pago.usuario ? pago.usuario : "NaN";
      const fechaPago = pago.fecha ? new Date(pago.fecha) : new Date;
      const inicio = fechaInicio ? new Date(fechaInicio) : new Date(0);
      const fin = fechaFin ? new Date(fechaFin) : new Date();
      const cumpleFiltroFecha = fechaPago >= inicio && fechaPago <= fin;
      const cumpleFiltroTexto = usuario.toLowerCase().includes(filtro.toLowerCase())
      return cumpleFiltroFecha && cumpleFiltroTexto;
    });
  };

  const calcularTotal = () => {
    const pagos = filtrarPagos()
    if(pagos) return pagos.reduce((total, pago) => total + pago.monto, 0);
    else return 0
  };

  const pagosFiltrados = filtrarPagos();

  const generarReciboPDF = (pago: IPago) => {
    const doc = new jsPDF();
    
    // Configuración de colores
    const colorPrimario = '#ff80ab';
    const colorSecundario = '#333333';
    
    // Agregar logo (más pequeño)
    doc.addImage(logoSpa, 'PNG', 10, 10, 30, 30);
    
    // Nombre del lugar y slogan
    doc.setFontSize(24);
    doc.setTextColor(colorPrimario);
    doc.text('SENTIRSE BIEN', 50, 25);
    doc.setFontSize(12);
    doc.setTextColor(colorSecundario);
    doc.text('Tu oasis de bienestar y relajación', 50, 35);
    
    // Línea separadora
    doc.setDrawColor(colorPrimario);
    doc.line(10, 45, 200, 45);
    
    // Título
    doc.setFontSize(18);
    doc.setTextColor(colorPrimario);
    doc.text('Recibo de Pago', 105, 60, { align: 'center' });
    
    // Detalles del pago
    doc.setFontSize(12);
    doc.setTextColor(colorSecundario);
    const detalles = [
      `Fecha: ${pago.fecha}`,
      `Usuario: ${pago.usuario}`,
      `Turno: ${pago.turno}`,
      `Monto: $${pago.monto.toFixed(2)}`
    ];
    detalles.forEach((detalle, index) => {
      doc.text(detalle, 20, 80 + (index * 10));
    });
    
    // Agradecimiento
    doc.setFontSize(14);
    doc.setTextColor(colorPrimario);
    doc.text('¡Gracias por elegirnos!', 105, 150, { align: 'center' });
    
    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(colorSecundario);
    doc.text('SENTIRSE BIEN - Tu camino hacia el bienestar', 105, 280, { align: 'center' });
    
    // Guardar el PDF
    doc.save(`recibo.pdf`);
  };

  return (
    <div className="pagos-page">
      <Header />
      <MenuLateral />
      <div className="content-wrapper">
        <div className="pagos-container">
          <h1>Informe de Pagos</h1>
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
            <input
              type="text"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              placeholder="Buscar por usuario, turno o ID"
              className="filtro-texto"
            />
          </div>
          <div className="resumen-pagos">
            <div className="resumen-item">
              <h3>Total de Pagos</h3>
              <p>{pagosFiltrados?.length}</p>
            </div>
            <div className="resumen-item">
              <h3>Monto Total</h3>
              <p>${calcularTotal().toFixed(2)}</p>
            </div>
            <div className="resumen-item">
              <h3>Promedio por Pago</h3>
              <p>${pagosFiltrados ? (calcularTotal() / pagosFiltrados.length || 0).toFixed(2) : 0}</p>
            </div>
          </div>
          <div className="tabla-container">
            <table className="tabla-pagos">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Usuario</th>
                  <th>Turno</th>
                  <th>Precio</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {pagosFiltrados?.map((pago) => (
                  <tr key={pago.fecha}>
                    <td>{pago.fecha}</td>
                    <td>{pago.usuario}</td>
                    <td>{pago.turno}</td>
                    <td>${pago.monto}</td>
                    <td>
                      <button onClick={() => generarReciboPDF(pago)} className="btn-imprimir">
                        Descargar PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
