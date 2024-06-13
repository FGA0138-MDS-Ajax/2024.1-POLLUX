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
                    <section className="paragrafo"></section>A Equipe de Robótica Aérea (EDRA) tem como principal objetivo capacitar seus membros, proporcionando-lhes conhecimentos em áreas essenciais como eletrônica, controle, dinâmica de voo e dinâmica estrutural. Além disso, a EDRA foca significativamente no desenvolvimento de tecnologias de voo autônomo.
                </p>

                <h4 className="subTopico">
                    Conheça a equipe
                </h4>
                <p className="corpoTexto">
                    <strong>Aeropropulsão e Estruturas</strong>  responsavel por pipipi popopo
                </p>

                <div className="fotosIntegrantes">
                    <div className="legendaFotos">
                        <img src="GustavoNeris.svg" alt="fotoIntegrante" className='circular-imagem' />
                        <p> Gustavo Moreira</p>
                    </div>
                    <div className="legendaFotos">
                        <img src="Hugo.svg" alt="fotoIntegrante" className='circular-imagem' />
                        <p>Hugo Eduardo</p>
                    </div>
                    <div className="legendaFotos">
                        <img src="LucasDePaula.svg" alt="fotoIntegrante" className='circular-imagem' />
                        <p>Lucas Araújo</p>
                    </div>
                    <div className="legendaFotos">
                        <img src="MatheusFaria.svg" alt="fotoIntegrante" className='circular-imagem' />
                        <p>Matheus Henrique</p>
                    </div>
                </div>

                <p className="corpoTexto">
                    <strong>Controle e eletrônica</strong>  responsavel por pipipi popopo
                </p>

                <div className="fotosIntegrantes">
                    <div className="legendaFotos">
                        <img src="Danyeclerson.svg" alt="fotoIntegrante" className='circular-imagem' />
                        <p>Dannyeclisson Costa</p>
                    </div>
                    <div className="legendaFotos">
                        <img src="David.svg" alt="fotoIntegrante" className='circular-imagem' />
                        <p> David Zimmermann </p>
                    </div>
                    <div className="legendaFotos">

                        <img src="Fabio.svg" alt="fotoIntegrante" className='circular-imagem' />
                        <p>Fabio Gabriel</p>
                    </div>
                    <div className="legendaFotos">

                        <img src="GlennTakeo.svg" alt="fotoIntegrante" className='circular-imagem' />
                        <p>Glenn Takeo</p>
                    </div>
                    <div className="legendaFotos">


                        <img src="PedroVianna.svg" alt="fotoIntegrante" className='circular-imagem' />
                        <p>Pedro Araujo</p></div>
                </div>
                <p className="corpoTexto">
                    <strong>Software</strong>  responsavel por pipipi popopo
                </p>
                <div className="fotosIntegrantes">
                    <div className="legendaFotos">
                        <img src="LucasMateus.svg" alt="fotoIntegrante" className='circular-imagem' />
                        <p>Lucas Mateus</p>
                    </div>
                    <div className="legendaFotos">
                            <img src="Luis.svg" alt="fotoIntegrante" className='circular-imagem' />
                      <p>Luis Eduardo</p>
                    </div>
                    <div className="legendaFotos">
                        <img src="MatheusRodrigues.svg" alt="fotoIntegrante" className='circular-imagem' />
                        <p>Matheus Rodrigues</p>
                    </div>
        
                     <div className="legendaFotos">
                <img src="Nathan.svg" alt="fotoIntegrante" className='circular-imagem' />
                <p>Nathan Henrique</p>
                        </div >
            <div className="legendaFotos">
                <img src="Suyanne.svg" alt="fotoIntegrante" className='circular-imagem' />
                <p>Pedro Araujo</p>
            </div >
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
                        Ao ingressar na EDRA, você tem a oportunidade de entender como funcionam os relacionamentos empresariais. Além disso, você cria conexões profissionais que podem moldar seu futuro, estabelecendo uma rede de contatos valiosa. Participar de uma equipe multidisciplinar permite que você faça amizades com pessoas de diversos cursos, enriquecendo ainda mais sua experiência e proporcionando um ambiente de aprendizado colaborativo e dinâmico. Essa vivência prática complementa a formação acadêmica, preparando você para os desafios do mercado de trabalho e ampliando suas perspectivas profissionais.
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
                        (*) Atualizado em: 26/06/2024; Caso tenha alterações, mais informações no instagram
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
                        (*) Atualizado em: 26/06/2024. Mais informações no instagram
                    </p>
                    <img className='img-edraV' src='/edraV.svg' alt='logoedraV' />
            </section >

        <Footer />
        </>
    )
}

export default Divulgation
