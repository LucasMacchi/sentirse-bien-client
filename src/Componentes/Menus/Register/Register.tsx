import { FormEvent, useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../../Context/GlobalState';
import logo from "../../../assets/logo.png";
import './Register.css';

const cod_reg = import.meta.env.VITE_REGISTRO

export default function Register() {
    const global = useContext(GlobalContext);

    const [userToRegister, setUserReg] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password_con: "",
        username: "",
        telefono: "",
    });
    const [registerCode, setCode] = useState("");
    const [btn, setBtn] = useState(false);
    const [password_err_con, setPasswordError] = useState({
        status: false,
        error: ""
    });

    const errorCheck = () => {
        if (userToRegister.password !== userToRegister.password_con) {
            setPasswordError({ status: true, error: "Contraseñas no coinciden" });
            setBtn(true);
        } else {
            setPasswordError({ status: false, error: "" });
            setBtn(false);
        }
        if (registerCode !== cod_reg) {
            setBtn(true);
        } else {
            setBtn(false);
        }
    };

    useEffect(errorCheck, [userToRegister.password, userToRegister.password_con, registerCode]);

    const closeBtn = () => {
        global?.changeMenuRegister(!global.MRegister);
    };

    const register = async (event: FormEvent) => {
        event.preventDefault();
        setBtn(true);
        const access = await global?.register(userToRegister);
        if (access) {
            global?.alertStatus(true, "success", "Registrado correctamente");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            global?.alertStatus(true, "error", "Error al registrarse");
            setBtn(false);
        }
    };

    const handleUser = (prop: string, payload: string) => {
        setUserReg({
            ...userToRegister,
            [prop]: payload
        });
    };

    return (
        <div className={`register-backdrop ${global?.MRegister ? 'active' : ''}`}>
            <div className="register-modal">
                <div className="register-header">
                    <img src={logo} alt="Logo" className="register-logo" />
                    <button onClick={closeBtn} className="register-close-btn">&times;</button>
                </div>
                <form onSubmit={register} className="register-form">
                    <h2>Únete a nuestra familia</h2>
                    <div className="register-input-group">
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={userToRegister.email} 
                            onChange={(e) => handleUser("email", e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="register-input-group">
                        <input 
                            type="text" 
                            placeholder="Nombre"
                            value={userToRegister.first_name} 
                            onChange={(e) => handleUser("first_name", e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="register-input-group">
                        <input 
                            type="text" 
                            placeholder="Apellido"
                            value={userToRegister.last_name} 
                            onChange={(e) => handleUser("last_name", e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="register-input-group">
                        <input 
                            type="tel" 
                            placeholder="Teléfono"
                            value={userToRegister.telefono} 
                            onChange={(e) => handleUser("telefono", e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="register-input-group">
                        <input 
                            type="password" 
                            placeholder="Contraseña"
                            value={userToRegister.password} 
                            onChange={(e) => handleUser("password", e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="register-input-group">
                        <input 
                            type="password" 
                            placeholder="Confirmar Contraseña"
                            value={userToRegister.password_con} 
                            onChange={(e) => handleUser("password_con", e.target.value)} 
                            required 
                        />
                        {password_err_con.status && <p className="register-error">{password_err_con.error}</p>}
                    </div>
                    <div className="register-input-group">
                        <input 
                            type="text" 
                            placeholder="Código de Registro"
                            value={registerCode} 
                            onChange={(e) => setCode(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="register-checkbox">
                        <input 
                            type="checkbox" 
                            id="adult" 
                            required 
                        />
                        <label htmlFor="adult">¿Eres mayor de edad?</label>
                    </div>
                    <button type="submit" className="register-submit-btn" disabled={btn}>
                        REGISTRARSE
                    </button>
                </form>
            </div>
        </div>
    );
}
