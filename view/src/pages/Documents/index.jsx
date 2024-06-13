import React, { useState } from 'react';
import SideBar from "../../components/SideBar"
import './Documents.css';
import axios from 'axios';

function criarDocumento(descricao, link) {
  // Variável para armazenar o ID do usuário
  const userId = 12; // Altere conforme necessário

  // Dados a serem enviados no corpo da solicitação POST
  const data = {
    nome: descricao,
    link: link,
    user_id: userId
  };

  // Fazendo a solicitação POST usando Axios
  axios.post("http://localhost:3000/documentos", data)
    .then(function (response) {
      // Resposta recebida com sucesso
      console.log("Documento criado com sucesso:", response.data);
    })
    .catch(function (error) {
      // Ocorreu um erro ao fazer a solicitação
      console.error("Erro ao criar documento:", error);
    });
}


function Documents() {
  const [showPopup, setShowPopup] = useState(false);
  const [link, setLink] = useState('');
  const [descricao, setDescricao] = useState('');
  const [links, setLinks] = useState([]);

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleDescricaoChange = (e) => {
    setDescricao(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (link.trim() !== '' && descricao.trim() !== '') {
      setLinks([...links, { descricao, link }]);
    }
    setShowPopup(false);
    setLink('');
    setDescricao('');
  };
  

  const handleRemoveLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  return (
    <>
      <SideBar />
      <section className='containerGeral'>
        <div className='tituloGeral'>
          <h1>Documentos</h1>
        </div>

        <div className='docsCorpo'>
          <div className='img-text-container'>
            <img src="plus.svg" alt="img-plus" className='img-plusE' onClick={handleImageClick} />
            <p >Adicionar link</p>
          </div>

          {showPopup && (
            <div className="popup" >
              <div className="popup-content">
                <span className="close" onClick={handleClosePopup}>
                  &times; </span>
                <form onSubmit={handleSubmit}>
                  <label className='caixa'>
                    Insira o link:
                    <input className='caixa'
                      type="text"
                      value={link}
                      onChange={handleLinkChange}
                      required
                    />
                  </label>
                  <label className='caixa'>
                    Descrição:
                    <input className='caixa'
                      type="text"
                      value={descricao}
                      onChange={handleDescricaoChange}
                      required
                    />
                  </label>
                  <button type="submit" className='botao' onClick={()=>criarDocumento(descricao,link)}>Adicionar</button>
                </form>
              </div>
            </div>
          )}

          <div className="displayed-links">
            {links.map((item, index) => (
              <div key={index} className='item-container-geral'>
                <div className='img-text-container'>
                  <img src="trash.svg" alt='img-trash' class='trash' onClick={() => handleRemoveLink(index)}></img>
                  <p className='fonteDetalheGeral3'>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">{item.descricao}</a>
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

}

export default Documents;
