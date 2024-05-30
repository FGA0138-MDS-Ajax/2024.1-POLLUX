import React, { useState } from 'react';
import SideBar from "../../components/SideBar"
import './Storage.css';

function Storage() {
  const [showPopup, setShowPopup] = useState(false);
  const [nome, setLink] = useState('');
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
    if (nome.trim() !== '' && descricao.trim() !== '') {
      setLinks([...links, { descricao, nome }]);
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
    <SideBar/>
    
    <div className='documentosTitulo'>
        <h1>Estoque</h1> 
    </div>
    
    <div className='documentosCorpo'>
    <div className='img-text-container'>
      <img src="plus.svg" alt="img-plus"
        onClick={handleImageClick} />
      <p className='fonte'>Adicionar nova peça</p>
      </div>
      {showPopup && (
        <div className="popup" >
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times; </span>
            <form onSubmit={handleSubmit}>
              <label className='caixa'>
                Nome:
                <input className='caixa'
                  type="text"
                  value={nome}
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
              <button type="submit" className='botao'>Adicionar</button>
            </form>
          </div>
        </div>
      )}

        <div className="displayed-links">
        {links.map((item, index) => (
          <div key={index}>
            <div className='img-text-container'>
            <img src="trash.svg" alt='img-trash' class='trash' onClick={() => handleRemoveLink(index)}></img>
            <p className='fonte2'>
              <a href={item.nome} target="_blank" rel="noopener noreferrer">{item.descricao}</a>
            </p>
            
          </div>
        </div>
        ))}
      </div>
    </div>
    </>
  );
  
}

export default Storage;