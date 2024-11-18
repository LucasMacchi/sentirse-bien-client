import "../AppMovil/AppMovil.css"

export default function AppMovil(){
    return(
        <>
            <div className="banner">
                <p className="descarga">
                Descarga nuestra app móvil y obtené 10% de descuento al pedir un turno!
                </p>
            <a href="/src/assets/sba-1-0.apk" className="descarga-btn" download>
                Descargar
            </a>
            </div>
        </>
    )
}