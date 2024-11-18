import "../AppMovil/AppMovil.css"

export default function AppMovil(){
    return(
        <>
            <div className="banner">
                <p className="descarga">
                Descarga nuestra app móvil y obtené 10% de descuento al pedir un turno!
                </p>
            <a href="/src/assets/app-debug.apk" className="descarga-btn" download>
                Descargar
            </a>
            </div>
        </>
    )
}