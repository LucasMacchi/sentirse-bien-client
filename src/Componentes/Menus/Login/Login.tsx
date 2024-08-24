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
import { useContext, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalState';

export default function Login () {

    const global = useContext(GlobalContext)

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const closeBtn = () => {
        global?.changeMenuLogin(!global.Mlogin)
    }

    const login = () => {
        console.log(userLogin)
    }

    //Va añadiendo los datos al estado de userlogin
    const handleUser = (prop: string, payload: string) => {
        setUserLogin({
            ...userLogin,
            [prop]: payload
        });
    };

    return(
        <Backdrop open={global ? global.Mlogin : false } sx={{zIndex: 10}}>
            <Paper>
                <Box width={320} padding={1}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <img src={logo} width="40px"/>
                        <IconButton onClick={() => closeBtn()} aria-label='close'><CloseIcon color='primary'/></IconButton>
                    </Box>
                    <Divider/>
                    <Box width={280} component="form" onSubmit={() => login()} autoComplete='off'>
                        <Typography variant='h6'>Ingresar</Typography>
                        <Box padding={1}>
                            <TextField fullWidth type="email" id='email' size="small" label="Email" value={userLogin.email} onChange={(e) => handleUser("email", e.target.value)} required/>
                        </Box>
                        <Box padding={1}>
                            <TextField fullWidth type='password' id='password' size="small" label="Contraseña" value={userLogin.password} onChange={(e) => handleUser("password", e.target.value)} required/>
                        </Box>
                        <Box display={"flex"} justifyContent={"flex-end"} marginTop={"20px"}>
                            <Button size="small" color='secondary' variant="contained" type="submit" startIcon={<LoginIcon/>}>
                                <Typography sx={{marginLeft: "20px"}} variant='body2'>INGRESAR</Typography> 
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Backdrop>
    )
}