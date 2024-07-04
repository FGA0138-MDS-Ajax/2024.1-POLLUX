import React, { useState, useEffect } from 'react';
import SideBar from "../../components/SideBar"
import './Documents.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createDocument, deleteDocument, getDocuments } from '../../queries/documents';
import { baseURL } from '../../config/baseurl';


function Documents() {
  const [showPopup, setShowPopup] = useState(false);
  const [link, setLink] = useState('');
  const [descricao, setDescricao] = useState('');
  const [links, setLinks] = useState([]);
  const [documentos, setDocs] = useState([]);
  const navigate = useNavigate();

  // Efeito para carregar os documentos ao montar o componente

  useEffect(() => {
    get()
    try {
      document.title = 'Documentos';
      var cookieValue = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
      let token = cookieValue.jwtToken.toString();
      axios.post(baseURL+"users/token", {
        token: token
      }).then(function (response) {
        if (!(response.data < 0)) {
          axios.get(baseURL+"users/" + response.data.id).then(function (resposta) {
            if (resposta.data.acesso.acesso_documents) {
            } else {
              navigate("/detail")
            }
          });
        } else {
          navigate("/login")
        }
      }).catch(function (error) {
        console.error(error);
      });

      // Atualizar a lista de documentos após a exclusão
    } catch (err) {
      navigate("/login");
    }
  }, []);

  // Função assíncrona para deletar um documento

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

  // Função assíncrona para criar um novo documento

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

  // Função assíncrona para obter os documentos da API

  const get = async () => {
    const response = await getDocuments()
    setDocs(response.data);
  }

  // Manipulador de evento para exibir o popup de adicionar link

  const handleImageClick = () => {
    setShowPopup(true);
  };

  // Manipulador de evento para fechar o popup

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Manipulador de evento para atualizar o estado do link

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  // Manipulador de evento para atualizar o estado da descrição

  const handleDescricaoChange = (e) => {
    setDescricao(e.target.value);
  };

  // Manipulador de evento para submeter o formulário de adicionar documento

  const handleSubmit = (e) => {
    e.preventDefault();
    if (link.trim() !== '' && descricao.trim() !== '') {
      setLinks([...links, { descricao, link }]);
    }
    setShowPopup(false);
    setLink('');
    setDescricao('');
  };

  // Manipulador de evento para remover um link da lista

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
