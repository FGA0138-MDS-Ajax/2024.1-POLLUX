import React, { useState } from 'react';
import SideBar from "../../components/SideBar";
import './Storage.css';

function Storage() {
  const [showPopup, setShowPopup] = useState(false);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [links, setLinks] = useState([]);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handleImageSelection = (imagem) => {
    setImagemSelecionada(imagem);
  };

  const handleQuantidadeChange = (event) => {
    const { value } = event.target;
    if (value === '' || /^\d+$/.test(value)) {
      setQuantidade(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim() !== '' && quantidade.trim() !== '') {
      setLinks([...links, { quantidade, nome, imagem: imagemSelecionada }]);
      setShowPopup(false);
      setNome('');
      setQuantidade('');
      setImagemSelecionada(null);
    }
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  const handleAddQuantity = (index) => {
    const updatedLinks = [...links];
    updatedLinks[index].quantidade = String(parseInt(updatedLinks[index].quantidade) + 1);
    setLinks(updatedLinks);
  };

  const handleRemoveQuantity = (index) => {
    const updatedLinks = [...links];
    updatedLinks[index].quantidade = String(parseInt(updatedLinks[index].quantidade) - 1);
    if (updatedLinks[index].quantidade < 0) {
      updatedLinks[index].quantidade = '0';
    }
    setLinks(updatedLinks);
  };

  return (
    <>
      <SideBar />
      
      <div className='estoqueTitulo'>
        <h1>Estoque</h1> 
      </div>
      
      <div className='estoqueCorpo'>
        <div className='img-text-container'>
          <img src="plus.svg" alt="img-plus" onClick={handleImageClick} />
          <p className='fonte'>Adicionar nova peça</p>
        </div>
        
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={handleClosePopup}>
                &times;
              </span>
              <form onSubmit={handleSubmit}>
                <label className='caixa'>
                  Nome da peça:
                  <input
                    className='caixa'
                    type="text"
                    value={nome}
                    onChange={handleNomeChange}
                    required
                  />
                </label>
                <label className='caixa'>
                  Quantidade:
                  <input
                    className='caixa'
                    type="text"
                    value={quantidade}
                    onChange={handleQuantidadeChange}
                    required
                  />
                </label>
                <label className='caixaImg'>
                  <img  
                    src="/disponivel.svg"
                    alt="Disponível"
                    className={`opcao-imagem ${imagemSelecionada === "/disponivel.svg" ? 'selecionada' : ''}`}
                    onClick={() => handleImageSelection("/disponivel.svg")}
                  />
                  <img
                    src="/indisponivel.svg"
                    alt="Indisponível"
                    className={`opcao-imagem ${imagemSelecionada === "/indisponivel.svg" ? 'selecionada' : ''}`}
                    onClick={() => handleImageSelection("/indisponivel.svg")}
                  />
                  <img
                    src="/alerta.svg"
                    alt="Alerta"
                    className={`opcao-imagem ${imagemSelecionada === "/alerta.svg" ? 'selecionada' : ''}`}
                    onClick={() => handleImageSelection("/alerta.svg")}
                  />
                </label>
                <button type="submit" className='botao'>Adicionar</button>
              </form>
            </div>
          </div>
        )}

        <div className="displayed-links">
          {links.map((item, index) => (
            <div key={index} className='item-container'>
              <div className='img-text-container2'>
                <div className="bntMaiseMenosContainer">
                  <button className='bntMaiseMenos' onClick={() => handleAddQuantity(index)}>+</button>
                  <p className='fonteDetalheEstoque'>
                    {item.quantidade}
                  </p>
                  <button className='bntMaiseMenos' onClick={() => handleRemoveQuantity(index)}>-</button>
                </div>
                <p className='fonteDetalheEstoque'>
                  {item.nome}
                </p>
                {item.imagem && (
                  <img src={item.imagem} alt="Status" className="imagem-selecionada" />
                )}
                <img src="trash.svg" alt='img-trash' className='trashEstoque' onClick={() => handleRemoveLink(index)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Storage;
