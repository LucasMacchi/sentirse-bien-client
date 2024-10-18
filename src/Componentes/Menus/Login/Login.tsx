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
import LoginIcon from '@mui/icons-material/Login';
import { FormEvent, useContext, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalState';

export default function Login() {

    const global = useContext(GlobalContext)

    const [userLogin, setUserLogin] = useState({
        username: "",
        password: ""
    });


    const [btn, setbtn] = useState(false)

    const closeBtn = () => {
        global?.changeMenuLogin(!global.Mlogin)
    }

    const login = async (event: FormEvent) => {
        setbtn(true)
        event.preventDefault()
        const access = await global?.login(userLogin.username, userLogin.password)
        if (access) {
            global?.alertStatus(true, "success", "Ingresaste correctamente")
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
        }
        else {
            global?.alertStatus(true, "error", "Error al ingresar")
            setbtn(false)
        }
    }

    //Va añadiendo los datos al estado de userlogin
    const handleUser = (prop: string, payload: string) => {
        setUserLogin({
            ...userLogin,
            [prop]: payload
        });
    };
    const registerSwitch = () => {
        global?.changeMenuRegister(true)
        global?.changeMenuLogin(false)
    }

    return (
        <Backdrop open={global ? global.Mlogin : false} sx={{ zIndex: 10 }}>
            <Paper>
                <Box width={320} padding={1}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <img src={logo} width="40px" />
                        <IconButton onClick={() => closeBtn()} aria-label='close'><CloseIcon color='primary' /></IconButton>
                    </Box>
                    <Divider />
                    <Box component="form" onSubmit={(e: FormEvent) => login(e)} autoComplete='off'>
                        <Typography variant='h6'>Ingresar</Typography>
                        <Box padding={1}>
                            <TextField fullWidth type="username" id='username' size="small" label="username" value={userLogin.username} onChange={(e) => handleUser("username", e.target.value)} required />
                        </Box>
                        <Box padding={1}>
                            <TextField fullWidth type='password' id='password' size="small" label="Contraseña" value={userLogin.password} onChange={(e) => handleUser("password", e.target.value)} required />
                        </Box>
                        <Typography variant='body2'>No tienes una cuenta? <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => registerSwitch()}>Registrate!</span></Typography>
                        <Box display={"flex"} justifyContent={"flex-end"} marginTop={"20px"}>
                            <Button disabled={btn} size="small" color='secondary' variant="contained" type="submit" startIcon={<LoginIcon />}>
                                <Typography sx={{ marginLeft: "20px" }} variant='body2'>INGRESAR</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Backdrop>
    )
}
