import{ useState, useEffect, useContext } from "react";
import { Header } from "../Header/Header";
import "./Pagos.css";
import jsPDF from 'jspdf';
import logoSpa from '../../assets/logo.png';
import { GlobalContext } from "../../Context/GlobalState";
import { IPago, IPagoComplete } from "../../Interfaces/Interfaces";
import { useNavigate } from "react-router-dom";



export default function Pagos() {
  const [pagos, setPagos] = useState<IPagoComplete[]>([])
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [filtro, setFiltro] = useState("");
  const global = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const complete = global?.completePagos(global.clientes, global.pagosInforme)
    setPagos(complete ? complete : [] )
  }, []);

  
  useEffect(() => {
    const token = localStorage.getItem('jwToken')
    if(!token) navigate("/")
    const filtrado = filtrarPagos()
    setPagos(filtrado ? filtrado : pagos)
  },[fechaFin, fechaInicio, filtro])

  const filtrarPagos = (): IPagoComplete[] | undefined => {
    const complete = global?.completePagos(global.clientes, global.pagosInforme)
    if(complete){
      if(fechaInicio || fechaFin || filtro){
        const filtered = complete.filter((p) => {
          if(p.fecha){
            const pagoFecha = new Date(p.fecha)
            const fechaStart = fechaInicio ? new Date(fechaInicio) : new Date(0)
            const fechaEnd = fechaFin ? new Date(fechaFin) : new Date("01-01-2050")
            if(pagoFecha <= fechaEnd && pagoFecha >= fechaStart){
              if(filtro){
                if(p.fullname?.toLocaleLowerCase()?.includes(filtro.toLocaleLowerCase()) ||
                    p.typeString?.toLocaleLowerCase()?.includes(filtro.toLocaleLowerCase())) {
                  console.log("Searching ",filtro)
                  return p
                }
              }
              else return p
            }
          }
        })
        return filtered
      }
      else {
        return complete
      }
    }
    else {
      return complete
    } 
  };

  const calcularTotal = ():number => {
    if(pagos) {
      let total = 0
      pagos.forEach(p => {
        total = p.monto + total
      });
      return total
    }
    else return 0
  };

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
      `Usuario: ${pago.usuario}`,
      `Turno: ${pago.turno}`,
      `Monto: $${pago.monto}`
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


  const showTabla = () => {
    if(pagos){
      return(
        <table className="tabla-pagos">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Turno</th>
            <th>Precio</th>
            <th>Forma de Pago</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {pagos?.map((pago) => (
            <tr key={pago.fecha}>
              <td>{pago.fecha}</td>
              <td>{pago.fullname}</td>
              <td>{pago.turno}</td>
              <td>${pago.monto}</td>
              <td>{pago.typeString}</td>
              <td>
                <button onClick={() => generarReciboPDF(pago)} className="btn-imprimir">
                  Descargar PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )
    }
  }

  return (
    <div className="pagos-page">
      <Header />
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
              placeholder="Buscar por usuario o tipo de pago."
              className="filtro-texto"
            />
          </div>
          <div className="resumen-pagos">
            <div className="resumen-item">
              <h3>Total de Pagos</h3>
              <p>{pagos?.length ? pagos?.length : 0}</p>
            </div>
            <div className="resumen-item">
              <h3>Monto Total</h3>
              <p>${calcularTotal()}</p>
            </div>
            <div className="resumen-item">
              <h3>Promedio por Pago</h3>
              <p>${pagos ? (calcularTotal() / pagos.length || 0) : 0}</p>
            </div>
          </div>
          <div className="tabla-container">
            {showTabla()}
          </div>
        </div>
      </div>
    </div>
  );
}
