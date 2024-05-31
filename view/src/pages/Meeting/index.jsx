import React, {useState} from "react";
import './Meeting.css';
import SideBar from "../../components/SideBar"

function Meeting(){
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
      <SideBar/>
      
      <div className='documentosTitulo'>
          <h1>Reuniões</h1> 
      </div>
      
      <div className='documentosCorpo'>
      <div className='img-text-container'>
        <img src="plus.svg" alt="img-plus"
          onClick={handleImageClick} />
        <p className='fonte'>Adicionar reunião</p>
        </div>
        {showPopup && (
          <div className="popup" >
            <div className="popup-content">
              <span className="close" onClick={handleClosePopup}>
                &times; </span>
              <form onSubmit={handleSubmit}>
                <label className='caixa'>
                  Ata de reunião:
                  <input className='caixa'
                    type="text"
                    value={link}
                    onChange={handleLinkChange}
                    required
                  />
                </label>
                <label className='caixa'>
                  Presença:
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
                <a href={item.link} target="_blank" rel="noopener noreferrer">{item.descricao}</a>
              </p>
              
            </div>
          </div>
          ))}
        </div>
      </div>
      </>
    );
    
  }

export default Meeting ; 