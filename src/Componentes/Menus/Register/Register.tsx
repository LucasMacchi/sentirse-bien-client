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
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Register () {

    const global = useContext(GlobalContext)

    const [userToRegister, setUserReg] = useState({
        email: "",
        name: "",
        surname: "",
        password: "",
        password_con: "",
        cuil: "",
        phone: "",
        codigo: ""
    });

    const errorCheck = () => {
        if(userToRegister.password !== userToRegister.password_con){
            setPasswordError({status: true, error: "Contraseñas no coinciden"})
            setbtn(true)
        }
        else {
            setPasswordError({status: false, error: ""})
            setbtn(false)
        }
    }

    const [password_err_con, setPasswordError] = useState({
        status: false,
        error: ""
    })

    const [btn, setbtn] = useState(false)

    const closeBtn = () => {
        global?.changeMenuRegister(!global.MRegister)
    }

    //Va añadiendo los datos al estado de usertoregister
    const handleUser = (prop: string, payload: string) => {
        setUserReg({
            ...userToRegister,
            [prop]: payload
        });

    };

    const register = async (event: FormEvent) => {
        setbtn(true)
        event.preventDefault()
        const access = await global?.register(userToRegister)
        if(access){
            global?.alertStatus(true, "success", "Registrado correctamente")
            setTimeout(() => {
                window.location.reload()
            }, 5000);
        }
        else {
            global?.alertStatus(true, "error", "Error al registrarse")
            setbtn(false)
        }  
    }

    useEffect(errorCheck,[userToRegister.password])
    useEffect(errorCheck,[userToRegister.password_con])


    return(
        <Backdrop open={global ? global.MRegister : false } sx={{zIndex: 10}}>
            <Paper>
                <Box width={320} padding={1}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <img src={logo} width="40px"/>
                        <IconButton onClick={() => closeBtn()} aria-label='close'><CloseIcon color='primary'/></IconButton>
                    </Box>
                    <Divider/>
                    <Box width={280} component="form" onSubmit={(e: FormEvent) => register(e)} autoComplete='off'>
                        <Typography variant='h6'>Unete a nuestra familia!</Typography>
                        <Box padding={1}>
                            <TextField fullWidth type="email" id='email' size="small" label="Email" value={userToRegister.email} onChange={(e) => handleUser("email", e.target.value)} required/>
                        </Box>
                        <Box padding={1}>
                            <TextField fullWidth type="text" id='name' size="small" label="Nombre" value={userToRegister.name} onChange={(e) => handleUser("name", e.target.value)} required/>
                        </Box>
                        <Box padding={1}>
                            <TextField fullWidth type="text" id='surname' size="small" label="Apellido" value={userToRegister.surname} onChange={(e) => handleUser("surname", e.target.value)} required/>
                        </Box>
                        <Box padding={1}>
                            <TextField fullWidth type="number" id='phone' size="small" label="Telefono" value={userToRegister.phone} onChange={(e) => handleUser("phone", e.target.value)} required/>
                        </Box>
                        <Box padding={1}>
                            <TextField fullWidth type="number" id='cuil' size="small" label="Cuil" value={userToRegister.cuil} onChange={(e) => handleUser("cuil", e.target.value)} required/>
                        </Box>
                        <Box padding={1}>
                            <TextField fullWidth type='password' id='password' size="small" label="Contraseña" value={userToRegister.password} onChange={(e) => handleUser("password", e.target.value)} required/>
                        </Box>
                        <Box padding={1}>
                            <TextField fullWidth type='password' id='password_con' size="small" label="Confirmar Contraseña" error={password_err_con.status} helperText={password_err_con.error} value={userToRegister.password_con} onChange={(e) => handleUser("password_con", e.target.value)} required/>
                        </Box>
                        <Box padding={1}>
                            <TextField fullWidth type="text" id='cod' size="small" label="Codigo de Registro" value={userToRegister.codigo} onChange={(e) => handleUser("codigo", e.target.value)} required/>
                        </Box>
                        <Box padding={1}>
                            <FormControlLabel control={<Checkbox/>} required label={"¿Eres mayor de edad?"}/>
                        </Box>
                        <Box display={"flex"} justifyContent={"flex-end"} marginTop={"20px"}>
                            <Button disabled={btn} size="small" color='secondary' variant="contained" type="submit" startIcon={<HowToRegIcon/>}>
                                <Typography sx={{marginLeft: "20px"}} variant='body2'>Registrarse</Typography> 
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Backdrop>
    )

}