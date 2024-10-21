import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { IFactura } from '../../Interfaces/Interfaces';
import logo from "../../assets/logo.jpg"

const titulo = 16;
const subtitulo = 16;
const texto = 10;
const header_tabla = 8;
const contenido_tabla = 8;
const seccion = 6;
const columnas_articulo = '35%';
const columnas_observacion = '26%';
const columnas_cantidad = '9%';
const columnas_precio = '15%';
const columnas_importe = '15%';

const stylesDocument = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: texto,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerLeft: {
        textAlign: 'left',
        width: '33%',
    },
    headerCenter: {
        textAlign: 'center',
        width: '33%',
    },
    headerRight: {
        textAlign: 'left',
        width: '33%',
    },
    title: {
        fontSize: titulo,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: subtitulo,
        marginBottom: 5,
    },
    section: {
        marginBottom: 5,
        padding: 5,
        border: '1px solid #bfbfbf',
        borderRadius: 5,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    table: {
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    totalSection: {
        marginTop: 20,
        textAlign: 'right',
    },
    totalText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    observations: {
        marginTop: 10,
        fontSize: 8,
    },
    tableColHeaderArticulo: {
        width: columnas_articulo,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#e0e0e0',
    },
    tableCellHeaderArticulo: {
        margin: 5,
        fontSize: header_tabla,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableColHeaderObservacion: {
        width: columnas_observacion,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#e0e0e0',
    },
    tableCellHeaderObservacion: {
        margin: 5,
        fontSize: header_tabla,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableColHeaderCantidad: {
        width: columnas_cantidad,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#e0e0e0',
    },
    tableCellHeaderCantidad: {
        margin: 5,
        fontSize: header_tabla,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableColHeaderPrecio: {
        width: columnas_precio,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#e0e0e0',
    },
    tableCellHeaderPrecio: {
        margin: 5,
        fontSize: header_tabla,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableColHeaderImporte: {
        width: columnas_importe,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#e0e0e0',
    },
    tableCellHeaderImporte: {
        margin: 5,
        fontSize: header_tabla,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableColArticulo: {
        width: columnas_articulo,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCellArticulo: {
        margin: 5,
        fontSize: contenido_tabla,
        textAlign: 'left',
    },
    tableColObservacion: {
        width: columnas_observacion,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCellObservacion: {
        margin: 5,
        fontSize: contenido_tabla,
        textAlign: 'left',
    },
    tableColCantidad: {
        width: columnas_cantidad,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCellCantidad: {
        margin: 5,
        fontSize: contenido_tabla,
        textAlign: 'right',
    },
    tableColPrecio: {
        width: columnas_precio,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCellPrecio: {
        margin: 5,
        fontSize: contenido_tabla,
        textAlign: 'right',
    },
    tableColImporte: {
        width: columnas_importe,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCellImporte: {
        margin: 5,
        fontSize: contenido_tabla,
        textAlign: 'right',
    },
    presupuestoDatos: {
        textAlign: 'right',
        marginTop: 10,
    },
    empresaDireccion: {
        textAlign: 'left',
    },
    clienteDatos: {
        textAlign: 'left',
        marginTop: 0,
    },
    logo: {
        marginBottom: 1,
    },
});


interface Props {
    data: IFactura
}

const PlantillaPDF: React.FC<Props> = ({ data }) => (
    <Document>
        <Page size="A4" style={stylesDocument.page}>
            <View style={stylesDocument.header}>
                <View style={stylesDocument.headerLeft}>
                    {logo ? (
                        <Image
                            style={stylesDocument.logo}
                            src={logo}
                        />
                    ) : (
                        <View style={{ height: 0 }} />
                    )}
                    <Text style={stylesDocument.title}>{data.empresa.nombre_empresa}</Text>
                    <View style={stylesDocument.empresaDireccion}>
                        <Text style={{ fontSize: 8 }}>
                            {data.empresa.direccion && `${data.empresa.direccion}, `}
                            {data.empresa.localidad && `${data.empresa.localidad},`}
                        </Text>
                        <Text style={{ fontSize: 8 }}>
                            {data.empresa.provincia && `${data.empresa.provincia}, `}
                            {data.empresa.pais}.
                        </Text>
                    </View>
                </View>
                <View style={stylesDocument.headerCenter}>
                    <View style={{ height: 65 }} />
                    <Text style={stylesDocument.page}>{data.empresa.categoria_fiscal}</Text>
                </View>
                <View style={stylesDocument.headerRight}>
                    <Text style={[stylesDocument.subtitle, { textAlign: "left" }]}>PRESUPUESTO</Text>
                    <View style={[stylesDocument.presupuestoDatos, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <View>
                            <Text>Número:</Text>
                            <Text>Fecha:</Text>
                            <Text>CUIT:</Text>
                            <Text>Ing. Brutos:</Text>
                            <Text>Inicio Act.:</Text>
                        </View>
                        <View>
                            <Text>{data.numero}</Text>
                            <Text>{data.fecha.replace(/-/g, '/')}</Text>
                            <Text>
                                {data.empresa.cuit.slice(0, 2) + '-' + data.empresa.cuit.slice(2, 10) + '-' + data.empresa.cuit.slice(10)}
                            </Text>
                            <Text>
                                {data.empresa.nro_ingresos_brutos.slice(0, 2) + '-' + data.empresa.nro_ingresos_brutos.slice(2, 10) + '-' + data.empresa.nro_ingresos_brutos.slice(10)}
                            </Text>
                            <Text>{data.empresa.fecha_inicio_actividad.replace(/-/g, '/')}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={stylesDocument.section}>
                <View style={[stylesDocument.clienteDatos, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                    <View style={{ marginRight: 20 }}>
                        <Text style={{ marginBottom: seccion }}>Sr. (es):</Text>
                        <Text style={{ marginBottom: seccion }}>Domicilio:</Text>
                        <Text style={{ marginBottom: seccion }}>Identificación:</Text>
                        <Text>Cond. IVA:</Text>
                    </View>
                    <View>
                        <Text style={{ marginBottom: seccion }}>{data.cliente.nombre_apellido}</Text>
                        <Text style={{ marginBottom: seccion }}>
                            {data.cliente.domicilio && `${data.cliente.domicilio}, `}
                            {data.cliente.localidad && `${data.cliente.localidad}, `}
                            {data.cliente.provincia && `${data.cliente.provincia}, `}
                            {data.cliente.pais}
                        </Text>
                        <Text style={{ marginBottom: seccion }}>
                            {data.cliente.tipo_identificacion === 'NO ESPECIFICADO'
                                ? 'NO ESPECIFICADO'
                                : data.cliente.tipo_identificacion === 'OTRO'
                                    ? `${data.cliente.otro_identificacion}: ${data.cliente.numero_identificacion}`
                                    : `${data.cliente.tipo_identificacion}: ${data.cliente.numero_identificacion}`
                            }
                        </Text>
                        <Text>{data.cliente.condicion_iva}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Moneda: {data.moneda}</Text>
                <Text>Fecha Vto.: {data.fechaVencimiento.replace(/-/g, '/')}</Text>
            </View>
            <View style={stylesDocument.table}>
                <View style={stylesDocument.tableRow}>
                    <View style={stylesDocument.tableColHeaderArticulo}>
                        <Text style={stylesDocument.tableCellHeaderArticulo}>Artículo</Text>
                    </View>
                    <View style={stylesDocument.tableColHeaderObservacion}>
                        <Text style={stylesDocument.tableCellHeaderObservacion}>Observaciones</Text>
                    </View>
                    <View style={stylesDocument.tableColHeaderCantidad}>
                        <Text style={stylesDocument.tableCellHeaderCantidad}>Cantidad</Text>
                    </View>
                    <View style={stylesDocument.tableColHeaderPrecio}>
                        <Text style={stylesDocument.tableCellHeaderPrecio}>Precio</Text>
                    </View>
                    <View style={stylesDocument.tableColHeaderImporte}>
                        <Text style={stylesDocument.tableCellHeaderImporte}>Importe</Text>
                    </View>
                </View>
                {/* Table Rows */}
                {data.items.map((item, index) => (
                    <View style={stylesDocument.tableRow} key={index}>
                        <View style={stylesDocument.tableColArticulo}>
                            <Text style={stylesDocument.tableCellArticulo}>{item.nombre}</Text>
                        </View>
                        <View style={stylesDocument.tableColObservacion}>
                            <Text style={stylesDocument.tableCellObservacion}>{item.descripcion}</Text>
                        </View>
                        <View style={stylesDocument.tableColCantidad}>
                            <Text style={stylesDocument.tableCellCantidad}>{item.cantidad}</Text>
                        </View>
                        <View style={stylesDocument.tableColPrecio}>
                            <Text style={stylesDocument.tableCellPrecio}>{Number(item.precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</Text>
                        </View>
                        <View style={stylesDocument.tableColImporte}>
                            <Text style={stylesDocument.tableCellImporte}>{item.importe.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</Text>
                        </View>
                    </View>
                ))}
            </View>
            <View style={stylesDocument.totalSection}>
                <Text style={stylesDocument.totalText}>Total: {data.total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</Text>
            </View>
            <View style={stylesDocument.observations}>
                <Text>Observaciones:</Text>
                {data.observaciones.map((obs, index) => (
                    <Text key={index}>{obs}</Text>
                ))}
            </View>
        </Page>
    </Document>
);

export default PlantillaPDF;