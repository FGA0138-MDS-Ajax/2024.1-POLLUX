/* 
   Este componente representa o rodapé(footer) da aplicação, o qual exibe informações e links 
   úteis relacionados à EDRA - Equipe de Robótica Aérea da Universidade de Brasília (UnB).
   Ele inclui o logotipo da EDRA, informações de localização, contatos nas redes sociais 
   (Instagram, GitHub, LinkedIn), notícias recentes e logotipos da UnB e HYDRA.
*/

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
                <a href="https://noticias.unb.br/ensino/6927-unb-leva-podio-na-competicao-brasileira-de-robotica-2023" target='_blank' rel="noopener noreferrer">UnB leva pódio na CBR 2023 </a>
                <a href="https://spacebrshow.com/es/2022/05/04/equipe-de-robotica-aerea-da-unb-marca-presenca-no-spacebr-show-2022/ " target='_blank' rel="noopener noreferrer"> EDRA presente no SpaceBR Show 2022</a>
                <a href="https://www.correiobraziliense.com.br/euestudante/trabalho-e-formacao/2022/05/5010477-equipe-de-robotica-da-unb-cria-vaquinha-para-participar-de-competicao-internacional.html " target='_blank' rel="noopener noreferrer">Vaquinha para participar de competição internacional.</a>
            </div>
            <div className='direita'>
                <img src="unb.svg" alt="unb" className='unbFooter' />
                <img src="hydra.svg" alt="hydra" className='hydra' />
            </div>
        </footer>
    );
}

export default Footer;
