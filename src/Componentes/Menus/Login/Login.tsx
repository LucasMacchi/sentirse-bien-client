import { FormEvent, useContext, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalState';
import logo from "../../../assets/logo.png";
import './Login.css'; // Asegúrate de crear este archivo CSS

export default function Login() {
    const global = useContext(GlobalContext);
    const [userLogin, setUserLogin] = useState({ username: "", password: "" });
    const [btn, setbtn] = useState(false);

    const closeBtn = () => {
        global?.changeMenuLogin(!global.Mlogin);
    };

    const login = async (event: FormEvent) => {
        setbtn(true);
        event.preventDefault();
        const access = await global?.login(userLogin.username, userLogin.password);
        if (access) {
            global?.alertStatus(true, "success", "Ingresaste correctamente");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            global?.alertStatus(true, "error", "Error al ingresar");
            setbtn(false);
        }
    };

    const handleUser = (prop: string, payload: string) => {
        setUserLogin({ ...userLogin, [prop]: payload });
    };

    const registerSwitch = () => {
        global?.changeMenuRegister(true);
        global?.changeMenuLogin(false);
    };

    return (
        <div className={`login-backdrop ${global?.Mlogin ? 'active' : ''}`}>
            <div className="login-modal">
                <div className="login-header">
                    <img src={logo} alt="Logo" className="login-logo" />
                    <button onClick={closeBtn} className="login-close-btn">&times;</button>
                </div>
                <form onSubmit={login} className="login-form">
                    <h2>Ingresar</h2>
                    <div className="login-input-group">
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="Nombre de usuario"
                            value={userLogin.username} 
                            onChange={(e) => handleUser("username", e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="login-input-group">
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Contraseña"
                            value={userLogin.password} 
                            onChange={(e) => handleUser("password", e.target.value)} 
                            required 
                        />
                    </div>
                    <p className="login-register-text">
                        ¿No tienes una cuenta? <span onClick={registerSwitch}>Regístrate</span>
                    </p>
                    <button type="submit" className="login-submit-btn" disabled={btn}>
                        INGRESAR
                    </button>
                </form>
            </div>
        </div>
    );
}
