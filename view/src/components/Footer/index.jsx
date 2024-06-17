import './Footer.css';

function Footer() {
    return (
        <footer className='footer'>
            <div className='logoNome'>
                <img src="edraB.svg" alt="edraB" className='logoEdraHeader' />
                <p className='descricao'>EDRA - Equipe de Robótica Aérea</p>
            </div>
            <div className='meio1'>
                <strong>Localização:</strong>
                <div className='localizacao'>
                    <img src="loc.svg" alt="loc" className='loc' />
                    <a href='https://maps.app.goo.gl/ca8kbVzQ98NpzUFLA' target="_blank" rel="noopener noreferrer">St. Leste Projeção A - Gama Leste, Brasília-DF /72444-240</a>
                </div>
            </div>
            <div className="meio2">
                <strong>Contatos:</strong>
                <div className='contatos'>
                    <img src="insta.svg" alt="insta" className='contato-icon' />
                    <a href='https://www.instagram.com/edraunb?igsh=MTZwbHhndGxua3g0MQ==' target="_blank" rel="noopener noreferrer">@edraunb</a>
                </div>
                <div className='contatos'>
                    <img src="git.svg" alt="git" className='contato-icon' />
                    <a href='http://www.github.com/edra-unb-fga' target='_blank' rel="noopener noreferrer">github.com/edra-unb-fga</a>
                </div>
                <div className='contatos'>
                    <img src="linkedin.svg" alt="linkedin" className='contato-icon' />
                    <a href='http://www.linkedin.com/company/edra-unb/' target='_blank' rel="noopener noreferrer">linkedin.com/company/edra-unb/</a>
                </div>
            </div>
            <div className="meio3">
                <strong>Notícias:</strong>
                <a href="https://bsbcapital.com.br/drone-leva-estudantes-a-madri/?fbclid=IwAR1PY0myy1npAyXhQhjOd6oHayBDdkn0gBU25ZZGEvvNgbg1IrWvwEVJon0">Drone leva estudantes a Madri </a>
                <a href='https://www.correiobraziliense.com.br/app/noticia/eu-estudante/trabalho-e-formacao/2019/07/28/interna-trabalhoeformacao-2019,774255/produtores-de-drone-do-gama.shtml' target='_blank' rel="noopener noreferrer">Produtores de drone do Gama  </a>
                <a href='https://www.noticias.unb.br/67-ensino/3172-semana-aeroespacial-apresenta-oportunidades-da-area' target='_blank' rel="noopener noreferrer">Estudantes fazem drone para competição internacional </a>
            </div>
            <div className='direita'>
                <img src="unb.svg" alt="unb" className='unbFooter' />
                <img src="hydra.svg" alt="hydra" className='hydra' />
            </div>
        </footer>
    );
}

export default Footer;
