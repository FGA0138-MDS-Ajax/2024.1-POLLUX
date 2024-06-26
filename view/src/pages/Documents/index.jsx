import React, { useState, useEffect } from 'react';
import SideBar from "../../components/SideBar"
import './Documents.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createDocument, deleteDocument, getDocuments } from '../../queries/documents';


function Documents() {
  const [showPopup, setShowPopup] = useState(false);
  const [link, setLink] = useState('');
  const [descricao, setDescricao] = useState('');
  const [links, setLinks] = useState([]);
  const [documentos, setDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    get()
    try {
      document.title = 'Documentos';
      var cookieValue = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
      let token = cookieValue.jwtToken.toString();
      axios.post("http://localhost:3000/users/token", {
          token: token
      }).then(function(response) {
        if(!(response.data < 0)){
          axios.get("http://localhost:3000/users/"+response.data.id).then(function (resposta){
            if(resposta.data.acesso.acesso_documents){
            }else{
              navigate("/detail")
            }
          });
        }else{
            navigate("/login")
        }
      }).catch(function(error) {
          console.error(error);
      });
  } catch (err) {
      navigate("/login");
  }
  }, []);

  const deletarDoc = async (id) => {
    try {
      await deleteDocument({
        id: id
      })
      get()
    } catch (error) {
      console.log(error)
      alert("Erro ao deletar documento!")
    }
  }
  
  const criarDocumento = async (descricao, link) => {
    // Variável para armazenar o ID do usuário
  
    // Dados a serem enviados no corpo da solicitação POST
    const data = {
      nome: descricao,
      link: link
    };
  
    // Fazendo a solicitação POST usando Axios
    try {
      await createDocument(data)
      get()
    } catch (error) {
      console.log(error)
      alert("Erro ao criar documento!")
    }
  }

  const get = async () => {
    const response = await getDocuments()
    setDocs(response.data);
  }

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
                  <button type="submit" className='botao' onClick={() => criarDocumento(descricao, link)}>Adicionar</button>
                </form>
              </div>
            </div>
          )}

          <div className="displayed-links">
            {documentos.map((item, index) => (
              <div key={index} className='item-container-geral'>
                <div className='img-text-container'>
                  <img src="trash.svg" alt='img-trash' className='trash' onClick={() => deletarDoc(item.id)}></img>
                  <p className='fonteDetalheGeral3'>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">{item.nome}</a>
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
