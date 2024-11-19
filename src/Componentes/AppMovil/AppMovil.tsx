import "../AppMovil/AppMovil.css"

export default function AppMovil(){
    return(
        <>
            <div className="banner">
                <p className="descarga">
                Descarga nuestra app móvil y obtené 10% de descuento al pedir un turno!
                </p>
                <a href="https://drive.google.com/file/d/1EjkB7GSVQiANRdXajTPT1hrqERN6hRsW/view?usp=drivesdk" className="descarga-btn" download>
                    Descargar
                </a>
            </div>
        </>
    )
}