import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalState';
import logo from "../../../assets/logo.png"
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function RolChanger() {
    const global = useContext(GlobalContext)
    const [user, setUser] = useState({
        name: "",
        last_name: "",
        email: ""    
    })
    const [rol, setRol] = useState("0")
    const [disabledBtn, setDisable] = useState(false)

    useEffect(() => {
        if(global?.userToChange) {
            global?.allUsers.forEach((u) => {
                if(u.id === global.userToChange){
                    setUser({
                        name: u.first_name,
                        last_name: u.last_name,
                        email: u.email
                    })
                }
            })
        }
    },[global?.userToChange])

    const closeBtn = () => {
        global?.changeMenuRol(!global.MRol, null)
    }


  const handleChange = (event: SelectChangeEvent) => {
    setRol(event.target.value);
  };

  const changeRol = async () => {
    console.log("New role: ",rol)
    if(global?.userToChange){
        setDisable(true)
        const result = await global?.changeUserRol(global?.userToChange, parseInt(rol))
        if(result){
            global?.alertStatus(true, "success", "Rol cambiado")
            setTimeout(() => {
                setDisable(false)
                window.location.reload()
            }, 1500);
        }
        else{
            global?.alertStatus(true, "error", "Error al cambiar rol")
            setDisable(false)
        }
    }
  }

    return(
        <Backdrop open={global ? global.MRol : false} sx={{ zIndex: 10 }}>
            <Paper>
                <Box width={420} padding={0.3}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <img src={logo} width="40px" />
                        <IconButton onClick={() => closeBtn()} aria-label='close'><CloseIcon color='primary' /></IconButton>
                    </Box>
                    <Divider />
                    <Typography>Nombre Completo:</Typography>
                    <Typography>{user.name + " " + user.last_name}</Typography>
                    <Divider />
                    <Typography>Email:</Typography>
                    <Typography>{user.email}</Typography>
                    <Divider />
                    <Typography>Eliga el rol nuevo:</Typography>
                    <Select id="roles" value={rol} onChange={handleChange}>
                        <MenuItem value={"0"}>Usuario</MenuItem>
                        <MenuItem value={"1"}>Profesional</MenuItem>
                        <MenuItem value={"2"}>Secretario/a</MenuItem>
                    </Select>
                    <Box display={"flex"} justifyContent={"flex-end"} marginTop={"8px"}>
                        <Button onClick={() => changeRol()} disabled={disabledBtn} variant="contained" size="small" color='secondary' >Cambiar rol</Button>
                    </Box>
                </Box>
            </Paper>
        </Backdrop>
    )
}
