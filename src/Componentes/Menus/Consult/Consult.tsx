import { FormEvent, useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../../Context/GlobalState";
import logo from "../../../assets/logo.png";
import './Consult.css';

export default function Consult() {
    const global = useContext(GlobalContext);
    const [consult, setConsult] = useState<string>("");
    const [btn, setBtn] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const closeBtn = () => {
        setIsClosing(true);
        setTimeout(() => {
            global?.changeMenuConsult(false);
            setIsClosing(false);
        }, 500); // Ajusta este tiempo según la duración de tu animación de salida
    }

    const make_consult = async (event: FormEvent) => {
        event.preventDefault()
        setBtn(true)
        const result = await global?.makeConsult(consult)
        if (result) {
            global?.alertStatus(true, "success", "Consulta hecha correctamente")
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        }
        else {
            global?.alertStatus(true, "error", "Hubo un problema para realizar la consulta")
            setBtn(false)
        }
    }

    useEffect(() => {
        if (global?.MConsult) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [global?.MConsult]);

    return (
        <div className={`consult-backdrop ${global?.MConsult ? 'active' : ''} ${isClosing ? 'closing' : ''}`}>
            <div className="consult-modal">
                <div className="consult-header">
                    <img src={logo} alt="Logo" className="consult-logo" />
                    <button onClick={closeBtn} className="consult-close-btn">&times;</button>
                </div>
                <form onSubmit={make_consult} className="consult-form">
                    <h2>Escribe tu consulta</h2>
                    <div className="consult-input-group">
                        <textarea 
                            rows={6}
                            value={consult}
                            onChange={(e) => setConsult(e.target.value)}
                            required
                            placeholder="Escribe aquí tu consulta..."
                        />
                    </div>
                    <button type="submit" className="consult-submit-btn" disabled={btn}>
                        Hacer consulta
                    </button>
                </form>
            </div>
        </div>
    )
}
