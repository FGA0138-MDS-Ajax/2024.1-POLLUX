import Footer from "../../components/Footer"
import Header from "../../components/Header"
import TablePS from "../../components/TablePS";
import TableProx from "../../components/TableProx";
import './Divulgation.css'

function Divulgation() {
    return (
        <>
            <Header />
            <section className='containerDivulgacao'>
                <img className='img-edraV' src='/edraV.svg' alt='logoedraV' />
                <img src="fotoGeral.svg" alt="fotoGeral" className='fotoGeral' />
                <section id="quemSomos"></section>
                <h1 className="topicos">
                    Quem somos?
                </h1>

                <h4 className="subTopico">
                    Apresentação e objetivo
                </h4>
                <p className="corpoTexto">
                    Jorem ipsum   aaaaaaaaaaaaaaa           jbvj h j cj v v  badhv  dh vh h ch h b dj j hjdh pbepj d hbuvbh  h  b    i  j bd        a jnf sibiub cibv aaaaaaaaaaaaaaaaaaaaaaaaaa dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                </p>

                <h4 className="subTopico">
                    Conheça a equipe
                </h4>
                <p className="corpoTexto">
                    <strong>equipe x</strong>  responsavel por pipipi popopo
                </p>
                <div className="fotosIntegrantes">
                    <img src="fotoIntegrante.svg" alt="fotoIntegrante" className='fotointegrante' />
                    <img src="fotoIntegrante.svg" alt="fotoIntegrante" className='fotointegrante' />
                    <img src="fotoIntegrante.svg" alt="fotoIntegrante" className='fotointegrante' />
                    <p className="corpoTexto">
                        <strong>equipe y</strong>  responsavel por pipipi popopo
                    </p>
                    <img src="fotoIntegrante.svg" alt="fotoIntegrante" className='fotointegrante' />
                    <img src="fotoIntegrante.svg" alt="fotoIntegrante" className='fotointegrante' />
                    <img src="fotoIntegrante.svg" alt="fotoIntegrante" className='fotointegrante' />
                </div>
                <section id="nossosDrones"></section>
                <div className="tituloComIcon">

                    <h1 className="topicos" >
                        Nossos drones
                    </h1>
                    <img src="drone.svg" alt="iconDrone" className='iconDrone' />
                </div>
                <div className="corpoDrones">
                    <img src="droneX.svg" alt="iconDroneX" className='iconDroneX' />
                    <div className="textoDrones">
                        <h4 className="subTopico">
                            DRONE X
                        </h4>
                        <p className="corpoTexto">
                            Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                        </p>
                    </div>
                </div>

                <div className="corpoDrones">
                    <img src="droneY.svg" alt="iconDroneY" className='iconDroneY' />
                    <div className="textoDrones">
                        <h4 className="subTopico">
                            DRONE Y
                        </h4>
                        <p className="corpoTexto">
                            Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                        </p>
                    </div>
                </div>
                <section id="processoSeletivo"></section>
                <div className="tituloComIcon">
                    <h1 className="topicos">
                        Processo seletivo
                    </h1>
                    <img src="lupa.svg" alt="iconLupa" className='iconLupa' />
                </div>
                <h4 className="subTopico">
                    Porque entrar para a EDRA?
                </h4>
                <p className="corpoTexto">
                    Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                </p>
                <div className="bntPS">
                    <button className="bntEditalForms">Edital</button>
                    <button className="bntEditalForms">Forms</button>
                </div>

                <h4 className="subTopico">
                    Cronograma do PS
                </h4>
                <TablePS />
                <p className="legenda">
                    (*) Atualizado em: DATA. Caso tenha alterações, mais informações no instagram
                </p>
                <section id="eventosCompeticoes"></section>
                <div className="tituloComIcon">

                    <h1 className="topicos">
                        Eventos e competições
                    </h1>
                    <img src="trofeu.svg" alt="iconAgenda" className='iconAgenda' />
                </div>
                <div className="corpoEventos">
                    <img src="campeonatoX.svg" alt="campeonatoX" className='campeonatoX' />
                    <div className="textoEventos">
                        <h4 className="subTopico">
                            Campeonato X
                        </h4>
                        <p className="corpoTexto">
                            Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                        </p>
                    </div>
                </div>

                <div className="corpoEventos">
                    <img src="campeonatoY.svg" alt="campeonatoY" className='campeonatoY' />
                    <div className="textoEventos">
                        <h4 className="subTopico">
                            CampeonatoY
                        </h4>
                        <p className="corpoTexto">
                            Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                        </p>
                    </div>
                </div>

                <h4 className="subTopico">
                    Próximos eventos e competições
                </h4>
                <TableProx />
                <p className="legenda">
                    (*) Atualizado em: DATA. Mais informações no instagram
                </p>
                <img className='img-edraV' src='/edraV.svg' alt='logoedraV' />
            </section>

            <Footer />
        </>
    )
}

export default Divulgation
