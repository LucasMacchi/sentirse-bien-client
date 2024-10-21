import { IFactura } from "../Interfaces/Interfaces";

export default function makeFactura (servicios: string, monto: number, 
    fechaTurno: string, nombre: string, apellido: string, direccion: string): IFactura {
    
    const currentDay = new Date()
    const formatDay = currentDay.getDate() + "-" + currentDay.getMonth() + "-" + currentDay.getFullYear()
    const factura: IFactura = {
        moneda: "Pesos Argentinos",
        fechaVencimiento: fechaTurno,
        cliente: {
            nombre_apellido: nombre + " " + apellido,
            numero_identificacion: "20111111115",
            condicion_iva: "consumidor final",
            domicilio: direccion,
            tipo_identificacion: "CUIT"
        },
        empresa: {
            nro_ingresos_brutos: "20111111115",
            fecha_inicio_actividad: "01-07-2024",
            categoria_fiscal: "",
            cuit: "20111111115",
            localidad: "Resistencia",
            direccion: "French 414",
            provincia: "Chaco",
            pais: "Argentina",
            nombre_empresa: "Sentirse bien Spa"
        },
        numero: Math.floor(Math.random() * 10000).toString(),
        fecha: formatDay,
        observaciones: [],
        total: 0,
        items: [
            {
                nombre: "Turno",
                descripcion: servicios,
                cantidad: 1,
                precio: monto,
                importe: monto
            }
        ]
    }
    return factura

}