import { FormEvent, useContext, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalState';
import logo from "../../../assets/logo.png";
import './Respond.css';

export default function Response() {
    const global = useContext(GlobalContext);
    const [response, setResponse] = useState<string>("");
    const [btn, setBtn] = useState(false);

    const closeBtn = () => {
        global?.changeMenuResponse(false, "");
    };

    const make_response = (event: FormEvent) => {
        event.preventDefault();
        setBtn(true);
        global?.respondConsult(response, global.idConsult);
        global?.alertStatus(true, "info", "Consulta respondida");
        setTimeout(() => {
            setBtn(false);
            window.location.reload();
        }, 1500);
    };

    return (
        <div className={`respond-backdrop ${global?.MResponse ? 'active' : ''}`}>
            <div className="respond-modal">
                <div className="respond-header">
                    <img src={logo} alt="Logo" className="respond-logo" />
                    <button onClick={closeBtn} className="respond-close-btn">&times;</button>
                </div>
                <form onSubmit={make_response} className="respond-form">
                    <h2>Respuesta</h2>
                    <div className="respond-input-group">
                        <textarea 
                            rows={4}
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            required
                            placeholder="Escribe aquí tu respuesta..."
                        />
                    </div>
                    <button type="submit" className="respond-submit-btn" disabled={btn}>
                        Responder
                    </button>
                </form>
            </div>
        </div>
    );
}
