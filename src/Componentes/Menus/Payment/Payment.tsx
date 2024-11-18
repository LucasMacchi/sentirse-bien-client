import { FormEvent, useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../../Context/GlobalState';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../../../assets/logo.png"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import PaidIcon from '@mui/icons-material/Paid';
import { IFactura, IPago } from '../../../Interfaces/Interfaces';
import makeFactura from '../../../Utils/makeFactura';
import { pdf } from '@react-pdf/renderer';
import PlantillaPDF from '../../Factura/Factura';
import { Tab, Tabs } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export default function Payment() {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const regex_number = /^[0-9]+$/;
    const global = useContext(GlobalContext)
    const [paymentData, setPaymentData] = useState({
        card_number: "",
        card_security_number: "",
        fullname: "",
        card_expiration_month: "",
        card_expiration_year: "",
        address: ""
    })
    const [type, setType] = useState("0")
    const [cardNumberError, setNumberErr] = useState({
        status: false,
        msg: ""
    })
    const [cardSecError, setSecErr] = useState({
        status: false,
        msg: ""
    })
    const [cardExError, setExErr] = useState({
        status: false,
        msg: ""
    })
    const [disabledBtn, setDisable] = useState(false)

    const closeBtn = () => {
        global?.changeMenuPayment(!global.MPayment, {servicio: "", fecha: "", hora: "", cliente: 0, pagado: false, monto: 0})
    }

    const errorCheck = () => {
        const monthInt = parseInt(paymentData.card_expiration_month)
        const yearInt = parseInt(paymentData.card_expiration_year)
        
        if(paymentData.card_number.length > 16 || paymentData.card_number.length < 16){
            setNumberErr({status: true, msg: "Limite de numeros es 16"})
        }
        else if(regex_number.test(paymentData.card_number) === false){
            setNumberErr({status: true, msg: "Ingrese solo numeros"})
        }
        else {
            setNumberErr({status: false, msg: ""})
        }
        if(paymentData.card_security_number.length > 3 || paymentData.card_security_number.length < 3){
            setSecErr({status: true, msg: "Ingrese un codigo de seguridad valido"})
        }
        else if(regex_number.test(paymentData.card_security_number) === false){
            setNumberErr({status: true, msg: "Ingrese solo numeros"})
        }
        else {
            setSecErr({status: false, msg: ""})
        }
        if(yearInt > currentYear){
            if(monthInt < 1 || monthInt >12 ) setExErr({status: true, msg: "Ingrese una fecha valida"})
            else setExErr({status: false, msg: ""})
        }
        else if(yearInt === currentYear){
            if(monthInt < currentMonth) setExErr({status: true, msg: "Ingrese una fecha valida"})
            else setExErr({status: false, msg: ""})
        }
        else {
            setExErr({status: true, msg: "Ingrese una fecha valida"})
        }
        if(cardExError.status || cardNumberError.status || cardSecError.status){
            setDisable(true)
        }
        else setDisable(false)
        if(type === "0"){
            setSecErr({status: false, msg: ""})
            setNumberErr({status: false, msg: ""})
            setExErr({status: false, msg: ""})
        }
    }

    //Va añadiendo los datos al estado de paymentData
    const handlePayment = (prop: string, payload: string) => {
        setPaymentData({
            ...paymentData,
            [prop]: payload
        });
    };

    //descargar PDF
    const downloadPDF = async (factura: IFactura) => {

        const blob = await pdf(<PlantillaPDF data={factura} />).toBlob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'documento.pdf';
        link.click();
    }

    const payTurn = async (event: FormEvent) => {
        event.preventDefault()
        setDisable(true)
        const factura = makeFactura(global?.turnToPay.servicio ? global?.turnToPay.servicio : "Servicio no especificado", global?.turnToPay.monto ? global?.turnToPay.monto : 0, 
            global?.turnToPay.fecha ? global?.turnToPay.fecha : "01-01-2020", global?.user.first_name ? global?.user.first_name : "No especificado", 
            global?.user.last_name ? global?.user.last_name : "", paymentData.address)

            const price: IPago = {
                monto: global?.turnToPay.monto ? global?.turnToPay.monto : 0,

                turno: global?.turnToPay.id,

                tipo: parseInt(type)
            }
            global?.emptyTurnToPay()
            const result = await global?.makePayment(price)
            if(result){
                global?.alertStatus(true, "success", "Gracias por pagar!")
                if(type !== "0") downloadPDF(factura)
                setTimeout(() => {
                    setDisable(false)
                    window.location.reload()
                }, 1500);
            }
            else{
                global?.alertStatus(true, "error", "Error al pagar")
                setDisable(false)
            }
    }

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setType(newValue);
      }; 

    useEffect(errorCheck, [cardExError])
    useEffect(errorCheck, [cardNumberError])
    useEffect(errorCheck, [cardSecError])

    return(
        <Backdrop open={global ? global.MPayment : false} sx={{ zIndex: 10 }}>
            <Paper>
                <Box width={420} padding={0.3}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <img src={logo} width="40px" />
                        <IconButton onClick={() => closeBtn()} aria-label='close'><CloseIcon color='primary' /></IconButton>
                    </Box>
                    <Divider />
                    <Box component="form" onSubmit={(e: FormEvent) => payTurn(e)} autoComplete='off'>
                        <Tabs value={type} onChange={handleChange}>
                            <Tab label="Credito" value={"2"}/>
                            <Tab label="Debito" value={"1"}/>
                            <Tab label="Efectivo" value={"0"}/>
                        </Tabs>
                        <Box padding={0.3} display={type === "0" ? "none" : "block"}>
                            <TextField disabled={type === "0"} fullWidth type="text" id='card_number' size="small" 
                            label="Numero de Tarjeta" value={paymentData.card_number} 
                            onChange={(e) => handlePayment("card_number", e.target.value)} required 
                            error={cardNumberError.status} 
                            />
                        </Box>
                        <Box padding={0.3} display={type === "0" ? "none" : "block"}>
                        <TextField sx={{width: 150}} disabled={type === "0"} type="text" id='card_sec' size="small" 
                            label="Cod. seguridad" value={paymentData.card_security_number} 
                            onChange={(e) => handlePayment("card_security_number", e.target.value)} required 
                            error={cardSecError.status} 
                            />
                        <TextField disabled={type === "0"}
                        type="text" id='name' size="small" 
                        label="Nombre del Titular" value={paymentData.fullname} 
                        onChange={(e) => handlePayment("fullname", e.target.value)} required 
                        />
                        <TextField disabled={type === "0"}
                        type="text" id='adress' size="small" 
                        label="Direccion de Facturacion" value={paymentData.address} fullWidth
                        onChange={(e) => handlePayment("address", e.target.value)} required 
                        />

                        </Box>
                        <Typography display={type === "0" ? "none" : "block"}>Fecha de Vencimiento</Typography>
                        <Divider/>
                        <Box padding={0.3} display={type === "0" ? "none" : "block"}>
                        <TextField sx={{width: 100}} type="number" disabled={type === "0"} id='card_month' size="small" 
                            label="Mes" value={paymentData.card_expiration_month} 
                            onChange={(e) => handlePayment("card_expiration_month", e.target.value)} required 
                            error={cardExError.status} />
                        <TextField sx={{width: 100}} type="number" id='card_month' size="small" 
                            label="Año" disabled={type === "0"} value={paymentData.card_expiration_year} 
                            onChange={(e) => handlePayment("card_expiration_year", e.target.value)} required 
                            error={cardExError.status} />
                        </Box>
                        <Typography>Precio de consulta: ${global?.turnToPay.monto}</Typography>
                        <Divider/>
                        {type === "0" && (<Typography> <InfoIcon color='info'/> Recuerde que debe abonar en efectivo en la sucursal en un tiempo menor a las 48 horas de haber sacado el turno</Typography>)}
                        <Box display={"flex"} justifyContent={"flex-end"} marginTop={"8px"}>
                            <Button disabled={disabledBtn} size="small" color='secondary' variant="contained" type="submit" startIcon={<PaidIcon />}>
                                <Typography sx={{ marginLeft: "20px" }} variant='body2'>{type === "0" ? "Sacar turno" : "Pagar Turno"}</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Backdrop>
    )



}