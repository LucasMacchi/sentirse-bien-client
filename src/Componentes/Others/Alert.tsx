import Alert from '@mui/material/Alert';
import { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { GlobalContext } from '../../Context/GlobalState';

export default function Alerta() {
    const global = useContext(GlobalContext)

    //Desactiva el alerta despues del tiempo determinado
    const disableAlert = () => {
        global?.alertStatus(false, global?.alert.type, "")
    };

    return(
        <Snackbar open={global?.alert.status} autoHideDuration={5000} onClose={() => disableAlert()}>
            <Alert variant="filled" severity={global?.alert.type} >{global?.alert.msg}</Alert>
        </Snackbar>

    )
}
