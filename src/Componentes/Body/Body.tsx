import './Body.css'
import foto1 from '../../assets/foto1.png'
import foto2 from '../../assets/foto2.png'


export function Body(){
    return (
        <>
            <div className='body-bg'>
                <div className='container'>
                        <h1 className='logo-text'>Sentirse Bien</h1>
                    <div className='container-title'>
                        <h1 className='welcome-text'>Relajate y <span className='welcome-text-span'>renová</span></h1>
                        <button className='agenda-btn'>AGENDÁ UN TURNO</button>
                    </div>
                </div>
            </div>
            <div className='body-bg-conocenos'>
                <div className='conocenos'>
                    <div className='conocenos-left'>
                        <h1>Oasis de Bienestar</h1>
                        <p>
                        Descubre el oasis de tranquilidad que mereces en nuestro spa. Te ofrecemos una experiencia única de relajación y renovación, donde cada detalle está pensado para tu bienestar. Disfruta de masajes rejuvenecedores, tratamientos revitalizantes y un ambiente sereno que te permitirá desconectar del estrés y reconectar contigo mismo. Ven y déjate mimar en un lugar donde la paz y el confort son nuestra prioridad.
                        </p>
                        <button className='agenda-btn'>Conocénos</button>
                    </div>
                    <div className='conocenos-right'>
                        <img src={foto1} alt=""  className='conocenos-img img-2'/>
                        <img src={foto2} alt="" className='conocenos-img'/>
                    </div>
                </div>
            </div>
        </>
    )
}