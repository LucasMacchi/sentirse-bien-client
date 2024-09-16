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

export default function Response() {

    const global = useContext(GlobalContext)
    const [response, setResponse] = useState<string>("")
    const [btn, setbtn] = useState(false)

    const closeBtn = () => {
        global?.changeMenuResponse(false, "")
    }

    const make_response = (event: FormEvent) => {
        event.preventDefault()
        setbtn(true)
        global?.respondConsult(response, global.idConsult)
        global?.alertStatus(true, "info", "Consulta respondida")
        setTimeout(() => {
            setbtn(false)
            window.location.reload()
        }, 1500);
    }

    return (
        <Backdrop open={global ? global.MResponse : false} sx={{ zIndex: 10 }}>
            <Paper>
                <Box width={{ sm: 700, xs: 420 }} padding={1}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <img src={logo} width="40px" />
                        <IconButton onClick={() => closeBtn()} aria-label='close'><CloseIcon color='primary' /></IconButton>
                    </Box>
                    <Divider />
                    <Box component="form" onSubmit={(e: FormEvent) => make_response(e)} autoComplete='off'>
                        <Typography variant='h6'>Respuesta</Typography>
                        <Box padding={1}>
                            <TextField multiline rows={4} fullWidth type="text" id='email' size="small" value={response} onChange={(e) => setResponse(e.target.value)} required />
                        </Box>
                        <Box display={"flex"} justifyContent={"flex-end"} marginTop={"20px"}>
                            <Button disabled={btn} size="small" color='secondary' variant="contained" type="submit">
                                <Typography sx={{ marginLeft: "20px" }} variant='body2'>Responder</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Backdrop>
    )
}
