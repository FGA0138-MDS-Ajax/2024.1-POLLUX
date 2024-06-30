import Footer from "../../components/Footer"
import Header from "../../components/Header"
import TablePS from "../../components/TablePS";
import TableProx from "../../components/TableProx";
import './Divulgation.css'

const handleButtonClick = (url) => {
    if (!url) {
        alert('Não está disponível no momento');
    } else {
        window.location.href = url;
    }
};

function Divulgation() {

    return (
        <>
            
                <Header />
                <div className="area">
                <img src="edraV.svg" alt="logoEdra" className='logo1' />
                <img src="edraV.svg" alt="logoEdra" className='logo2' />
                <img src="edraV.svg" alt="logoEdra" className='logo3' />
                <img src="edraV.svg" alt="logoEdra" className='logo4' />
                <img src="edraV.svg" alt="logoEdra" className='logo5' />
                <img src="edraV.svg" alt="logoEdra" className='logo6' />
                <img src="edraV.svg" alt="logoEdra" className='logo7' />
                <img src="edraV.svg" alt="logoEdra" className='logo8' />
                <img src="edraV.svg" alt="logoEdra" className='logo9' />
                <img src="fotoGeral.svg" alt="fotoGeral" className='fotoGeral' />

                <section className='containerDivulgacao'>

                    <section id="quemSomos"></section>
                    <h1 className="topicos">
                        Quem somos?
                    </h1>
                    <h4 className="subTopico">
                        Apresentação
                    </h4>
                    <p className="corpoTexto">
                        A Equipe de Robótica Aérea (EDRA) é uma equipe de competição da Universidade de Brasília especializada em aeronaves de voo vertical. A equipe teve início no primeiro semestre de 2016, por iniciativa de um grupo de alunos de Engenharia Aeroespacial que buscavam participar de uma competição de helidesign. Hoje, almejando capacitar-se para uma realidade mais emergente no campo das asas rotativas, o foco da equipe está nas competições de micro-veículos aéreos não tripulados e com rotores, popularmente conhecidos como drones.
                    </p>

                    <p className="corpoTexto">
                        A equipe começou com 18 membros, dentre eles, alunos das engenharias Aeroespacial, Eletrônica e de Software - do campus UnB Gama, evidenciando a interdisciplinaridade da equipe e dos projetos realizados. Nossa principal missão era desenvolver tecnologias e aliar conhecimentos adquiridos em sala de aula à execução de projetos e ao exercício da liderança. Capacitando-nos, assim, para participar de eventos que visem ao desenvolvimento técnico de cada membro, bem como da equipe como um todo.
                    </p>

                    <p className="corpoTexto">
                        Em 2017, a primeira competição da qual a EDRA participou foi organizada pela American Helicopter Society (AHS) e era intitulada "24 Hour Hovering Machine Conceptual Design". O projeto consistia no desenvolvimento conceitual de uma aeronave que fosse capaz de pairar no ar durante 24 horas por um circuito pré-estabelecido. A EDRA foi uma das primeiras equipes do País a participar dessa competição, em que universidades de vários países também submeteram seus projetos.
                    </p>
                    <p className="corpoTexto">
                        Já em 2018, a competição escolhida foi a da Organização Cobruf, na qual a equipe participou da Cobruf Drones, uma competição internacional que visava ao desenvolvimento conceitual de um drone que fosse capaz de voar em Marte.
                    </p>
                    <p className="corpoTexto">
                        Em 2019, a EDRA desenvolveu um projeto para a International Micro Air Vehicle Competition and Conference(IMAV), que ocorreu em 2019. Por ser a primeira vez que a equipe participou de uma competição física de grande porte, todo o conhecimento adquirido nas competições passadas e, juntamente com os estudos de cada uma das áreas, foram investidos nessa competição. O IMAV, no respectivo ano, foi sediado em Madri, na Espanha. Portanto, a atividade da equipe foi desenvolver um drone capaz de cumprir as missões propostas pela comissão da competição.
                    </p>
                    <p className="corpoTexto">
                        (*) Novos membros com ênfase em software ingressaram na equipe, enquanto os membros antigos se formaram e obtiveram ótimas posições no mercado de trabalho, sendo contratados por gigantes como a XMobots, Embraer, entre outras. Até 2022, a EDRA só havia participado de competições internacionais, devido à raridade de competições nacionais de robótica aérea.
                    </p>
                    <p className="corpoTexto">
                        Em 2023, participamos pela primeira vez de uma competição nacional, a Competição Brasileira de Robótica (CBR), que ocorreu em Salvador, na Bahia. Dentro da competição, competimos na Flying Robot League, ao lado de equipes de faculdades brasileiras extremamente renomadas. Assim, mesmo com todas as dificuldades enfrentadas pela equipe durante o processo de planejamento e produção do projeto, conseguimos conquistar o segundo lugar.
                    </p>
                    <h4 className="subTopico">
                        Objetivo
                    </h4>

                    <p className="corpoTexto">
                        (*) A Equipe de Robótica Aérea (EDRA) é uma equipe de competição especializada em competições de aeronaves de voo vertical. Um dos nossos objetivos é integrar os conhecimentos adquiridos na teoria com a prática a fim de aprimorar capacidades.
                    </p>

                    <h4 className="subTopico">
                        Conheça a equipe
                    </h4>

                    <p className="corpoTextoAreas">
                        <strong>Controle e Software</strong>
                    </p>
                    <p className="corpoTexto">
                        A área de Controle e Software é responsável pelo desenvolvimento dos sistemas autônomos de navegação, algoritmos de visão computacional,  simulações de voo,  planejamento dos métodos de resolução das missões e também de analisar os parâmetros de estabilidade do drone para conseguir obter um voo mais fluido e constante.
                    </p>
                    <div className="fotosIntegrantes">
                        <div className="legendaFotos">
                            <img src="Danyeclerson.svg" alt="fotoIntegrante" className='circular-imagem' />
                            <p>Dannyeclisson Costa</p>
                        </div>
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
                            <p>Suyanne Sara</p>
                        </div >
                    </div>

                    <p className="corpoTextoAreas">
                        <strong>Design estrutural</strong>
                    </p>

                    <p className="corpoTexto">
                        A área de Design Estrutural é responsável pelo planejamento, construção, design e testagem de todos os componentes estruturais dos drones. A área determina as dimensões dos drones de cada missão, define os materiais, analisa as cargas estáticas, decide a geometria, analisa as demandas estruturais das áreas adjacentes e soluciona os problemas de otimização dos frames. Além disso, produz simulações estruturais para garantir que todos os critérios estejam sendo seguidos e validados. Dessa forma, consegue chegar nas melhores alternativas estruturais de acordo com a disponibilidade dos componentes da equipe.
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
                    </div>

                    <p className="corpoTextoAreas">
                        <strong>Eletrônica</strong>
                    </p>
                    <p className="corpoTexto">
                        A área de Eletrônica é responsável por embarcar os projetos de Controle e Software no drone, se preocupando com os objetos embarcados, analisando a posição e efetuando a manutenção dos componentes, soldando os dispositivos e distribuição de cabos, evitando curtos-circuitos e disposições incorretas dos fios nas peças. Com isso, a área trabalha efetivamente nos sensores, transmissores, receptores e as placas controladoras, fazendo a interação entre esses componentes, permitindo que todo tipo de dado coletado e produzido pelo drone tenha valor.
                    </p>
                    <div className="fotosIntegrantes">
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
                            <p>Pedro Araujo</p>
                        </div>
                        <div className="legendaFotos">
                            <img src="Raul.svg" alt="fotoIntegrante" className='circular-imagem' />
                            <p>Raul Braga</p>
                        </div>
                    </div>

                    <p className="corpoTextoAreas">
                        <strong>Propulsão e Desempenho:</strong>
                    </p>
                    <p className="corpoTexto">
                        A área de Propulsão e Desempenho é responsável pelo dimensionamento, análise e definição do conjunto propulsivo do drone, composto pelos motores, hélices, baterias e controladores de velocidade (ESC´s), por meio de simulações computacionais e simulações práticas para obter um maior aproveitamento dos componentes e visar a maior eficiência do tempo de voo do drone.
                    </p>
                    <div className="fotosIntegrantes">
                        <div className="legendaFotos">
                            <img src="LucasDePaula.svg" alt="fotoIntegrante" className='circular-imagem' />
                            <p>Lucas Araújo</p>
                        </div>
                        <div className="legendaFotos">
                            <img src="MatheusFaria.svg" alt="fotoIntegrante" className='circular-imagem' />
                            <p>Matheus Faria</p>
                        </div>
                    </div>

                    <section id="nossosDrones"></section>
                    <div className="tituloComIcon">
                        <h1 className="topicos" >
                            Nossos drones
                        </h1>
                        <img src="drone.svg" alt="iconDrone" className='iconDrone' />
                    </div>
                    <div className="tudoDrones">

                        <div className="corpoDrones">
                            <img src="thor.svg" alt="iconThor" className='iconDroneImg' />
                            <div className="textoDrones">
                                <h4 className="subTopico">
                                    Thor 2018
                                </h4>
                                <p className="corpoTexto">
                                    O drone THOR, Tactical Hovering Optimized Rotorcraft, foi o primeiro projeto desenvolvido pela equipe, que consistia em uma aeronave inovadora capaz de suportar os desafios de um voo muito longo, que pairasse no ar por cerca de 24 horas.
                                </p>
                            </div>
                        </div>

                        <div className="corpoDrones">
                            <img src="cobruf.svg" alt="iconCobruf" className='iconDroneImg' />
                            <div className="textoDrones">
                                <h4 className="subTopico">
                                    COBRUF
                                </h4>
                                <p className="corpoTexto">
                                    (*)
                                </p>
                            </div>
                        </div>

                        <div className="corpoDrones">
                            <img src="droninho.svg" alt="iconDroninho" className='iconDroneImg' />
                            <div className="textoDrones">
                                <h4 className="subTopico">
                                    Droninho
                                </h4>
                                <p className="corpoTexto">
                                    (*)
                                </p>
                            </div>
                        </div>

                        <div className="corpoDrones">
                            <img src="ed1.svg" alt="iconEd1" className='iconDroneImg' />
                            <div className="textoDrones">
                                <h4 className="subTopico">
                                    EDRA DRONE 1 - (ED-1)
                                </h4>
                                <p className="corpoTexto">
                                    (*)
                                </p>
                            </div>
                        </div>

                        <div className="corpoDrones">
                            <img src="ed2.svg" alt="iconEd2" className='iconDroneImg' />
                            <div className="textoDrones">
                                <h4 className="subTopico">
                                    EDRA DRONE 2 - (ED-2)
                                </h4>
                                <p className="corpoTexto">
                                    (*)
                                </p>
                            </div>
                        </div>

                        <div className="corpoDrones">
                            <img src="acaiGuarana.svg" alt="iconAcaiGuarana" className='iconDroneImg' />
                            <div className="textoDrones">
                                <h4 className="subTopico">
                                    Acaí e Guaraná
                                </h4>
                                <p className="corpoTexto">
                                    (*)
                                </p>
                            </div>
                        </div>

                        <div className="corpoDrones">
                            <img src="gambyHyarra.svg" alt="iconGambyHyarra" className='iconDroneImg' />
                            <div className="textoDrones">
                                <h4 className="subTopico">
                                    Gamby e Hyarra
                                </h4>
                                <p className="corpoTexto">
                                    (*)
                                </p>
                            </div>
                        </div>

                        <div className="corpoDrones">
                            <img src="tellinho.svg" alt="iconTellinho" className='iconDroneImg' />
                            <div className="textoDrones">
                                <h4 className="subTopico">
                                    Tellinho
                                </h4>
                                <p className="corpoTexto">
                                    (*)
                                </p>
                            </div>
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
                        Ao ingressar na EDRA, você tem a oportunidade de entender como funcionam os relacionamentos empresariais tecnológicos em um ambiente de inovação, visto que constantemente você estará submetido a desafios e trabalhos em equipe, com pessoas de diversas áreas. Além disso, você cria conexões profissionais que podem moldar seu futuro, estabelecendo uma rede de contatos valiosa, tanto no setor de tecnologia quanto no de engenharia. Participar de uma equipe multidisciplinar permite que você faça amizades e colabore com pessoas de diversos cursos, enriquecendo ainda mais sua experiência e proporcionando um ambiente de aprendizado colaborativo e dinâmico, que complementa a sua formação acadêmica, preparando você para os desafios do mercado de trabalho, ampliando suas perspectivas profissionais e suas habilidades pessoais.
                    </p>
                    <p className="corpoTexto">
                        Na EDRA, você terá a chance de trabalhar em projetos reais e inovadores, desenvolvendo habilidades em programação, eletrônica, mecânica, sistemas propulsivos e gestão de projetos. Essa vivência prática será um diferencial no seu currículo, ampliando suas perspectivas profissionais e podendo abrir portas para oportunidades incríveis. Não perca a chance de fazer parte da maior equipe de drones autônomos do Centro-Oeste! Inscreva-se no nosso processo seletivo e dê o primeiro passo rumo a um futuro brilhante!
                    </p>
                    <div className="bntPS">
                        <button className="bntEditalForms" onClick={() => handleButtonClick('')}>
                            Edital
                        </button>
                        <button className="bntEditalForms" onClick={() => handleButtonClick('')}>
                            Forms
                        </button>
                    </div>

                    <h4 className="subTopico">
                        Cronograma do PS
                    </h4>
                    <TablePS />
                    <p className="legenda">
                        (*) Atualizado em: 26/06/2024; Caso tenha alterações, mais informações no instagram.
                    </p>
                    <section id="eventosCompeticoes"></section>
                    <div className="tituloComIcon">


                        <h1 className="topicos">
                            Eventos e competições
                        </h1>
                        <img src="trofeu.svg" alt="iconAgenda" className='iconAgenda' />
                    </div>
                    <div className="tudoEventosComp">
                        <div className="corpoEventosContainer">
                            <div className="corpoEventos">
                                <div className="legendaFotos">
                                    <img src="ahs.svg" alt="eventoCampus18" className='IconEventoImg2' />
                                    <p className="legendaEventos"> Campus Party 2018 </p>
                                </div>
                            </div>

                            <div className="corpoEventos">
                                <div className="legendaFotos">
                                    <img src="ahs.svg" alt="eventoCampus19" className='IconEventoImg2' />
                                    <p className="legendaEventos"> Campus Party 2019 </p>
                                </div>
                            </div>

                            <div className="corpoEventos">
                                <div className="legendaFotos">
                                    <img src="ahs.svg" alt="eventoCampus22" className='IconEventoImg2' />
                                    <p className="legendaEventos"> Campus Party 2022 </p>
                                </div>
                            </div>

                            <div className="corpoEventos">
                                <div className="legendaFotos">
                                    <img src="ahs.svg" alt="eventoSpace22" className='IconEventoImg2' />
                                    <p className="legendaEventos"> SpaceBR 2022 </p>
                                </div>
                            </div>

                            <div className="corpoEventos">
                                <div className="legendaFotos">
                                    <img src="ahs.svg" alt="eventoSpace23" className='IconEventoImg2' />
                                    <p className="legendaEventos"> SpaceBR 2023 </p>
                                </div>
                            </div>

                            <div className="corpoEventos">
                                <div className="legendaFotos">
                                    <img src="ahs.svg" alt="eventoCampus23" className='IconEventoImg2' />
                                    <p className="legendaEventos"> Campus Party 2023 </p>
                                </div>
                            </div>

                            <div className="corpoEventos">
                                <div className="legendaFotos">
                                    <img src="ahs.svg" alt="eventoSpace24" className='IconEventoImg2' />
                                    <p className="legendaEventos"> SpaceBR 2024 </p>
                                </div>
                            </div>

                            <div className="corpoEventos">
                                <div className="legendaFotos">
                                    <img src="ahs.svg" alt="eventoCampus24" className='IconEventoImg2' />
                                    <p className="legendaEventos"> Campus Party 2024 </p>
                                </div>
                            </div>
                        </div>

                        <div className="corpoEventos">
                            <img src="ahs.svg" alt="ahs" className='iconEventoImg' />
                            <div className="textoEventos">
                                <h4 className="subTopico">
                                    AHS 2017
                                </h4>
                                <p className="corpoTexto">
                                    A primeira competição da equipe, o 34º Concurso Internacional de Design, da AHS, tinha como objetivo a elaboração de um projeto de máquina conceitual que pairasse por 24 horas, seguindo determinadas regras e restrições determinadas pela competição.                        </p>
                            </div>
                        </div>

                        <div className="corpoEventos">
                            <img src="cobruf18.svg" alt="campeonatoCobruf18" className='iconEventoImg' />
                            <div className="textoEventos">
                                <h4 className="subTopico">
                                    COBRUF 2018
                                </h4>
                                <p className="corpoTexto">
                                    (*)
                                </p>
                            </div>
                        </div>

                        <div className="corpoEventos">
                            <img src="imav19.svg" alt="campeonatoImva19" className='iconEventoImg' />
                            <div className="textoEventos">
                                <h4 className="subTopico">
                                    IMAV 2019:
                                </h4>
                                <p className="corpoTexto">
                                    (*)
                                </p>
                            </div>
                        </div>

                        <div className="corpoEventos">
                            <img src="imav20.svg" alt="campeonatoImav20" className='iconEventoImg' />
                            <div className="textoEventos">
                                <h4 className="subTopico">
                                    IMAV 2020:
                                </h4>
                                <p className="corpoTexto">
                                    (*)
                                </p>
                            </div>
                        </div>

                        <div className="corpoEventos">
                            <img src="imav22.svg" alt="campeonatoImav22" className='iconEventoImg' />
                            <div className="textoEventos">
                                <h4 className="subTopico">
                                    IMAV 2022
                                </h4>
                                <p className="corpoTexto">
                                    (*)
                                </p>
                            </div>
                        </div>

                        <div className="corpoEventos">
                            <img src="cbr23.svg" alt="campeonatoCbr23" className='iconEventoImg' />
                            <div className="textoEventos">
                                <h4 className="subTopico">
                                    CBR 2023
                                </h4>
                                <p className="corpoTexto">
                                    (*)
                                </p>
                            </div>
                        </div>

                        <div className="corpoEventos">
                            <img src="cbr24.svg" alt="campeonatoCbr24" className='iconEventoImg' />
                            <div className="textoEventos">
                                <h4 className="subTopico">
                                    CBR 2024
                                </h4>
                                <p className="corpoTexto">
                                    (*)
                                </p>
                            </div>
                        </div>
                    </div>


                    <h4 className="subTopico">
                        Próximos eventos e competições
                    </h4>
                    <TableProx />
                    <p className="legenda">
                        (*) Atualizado em: 26/06/2024. Mais informações no instagram.
                    </p>
                </section >
                </div>
                <Footer />
            
        </>
    )
}

export default Divulgation
