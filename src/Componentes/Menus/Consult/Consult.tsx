import { FormEvent, useContext, useState } from 'react';
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
export default function Consult() {

    const global = useContext(GlobalContext)
    const [consult, setConsult] = useState<string>("")
    const [btn, setbtn] = useState(false)

    const closeBtn = () => {
        global?.changeMenuConsult(!global.MConsult)
    }

    const make_consult = async (event: FormEvent) => {
        event.preventDefault()
        setbtn(true)
        const result = await global?.makeConsult(consult)
        if (result) {
            global?.alertStatus(true, "success", "Consulta hecha correctamente")
            setTimeout(() => {
                window.location.reload()
                //console.log(global?.consults)
            }, 1500);

        }
        else {
            global?.alertStatus(true, "error", "Hubo un problema para realizar la consulta")
            setbtn(false)
        }
    }

    return (
        <Backdrop open={global ? global.MConsult : false} sx={{ zIndex: 10 }}>
            <Paper>
                <Box width={{ sm: 700, xs: 420 }} padding={1}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <img src={logo} width="40px" />
                        <IconButton onClick={() => closeBtn()} aria-label='close'><CloseIcon color='primary' /></IconButton>
                    </Box>
                    <Divider />
                    <Box component="form" onSubmit={(e: FormEvent) => make_consult(e)} autoComplete='off'>
                        <Typography variant='h6'>Escribe tu consulta!</Typography>
                        <Box padding={1}>
                            <TextField multiline rows={6} fullWidth type="text" id='email' size="small" value={consult} onChange={(e) => setConsult(e.target.value)} required />
                        </Box>
                        <Box display={"flex"} justifyContent={"flex-end"} marginTop={"20px"}>
                            <Button disabled={btn} size="small" color='secondary' variant="contained" type="submit">
                                <Typography sx={{ marginLeft: "20px" }} variant='body2'>Hacer consulta</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Backdrop>
    )
}
