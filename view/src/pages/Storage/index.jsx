import React, { useState } from 'react';
import SideBar from "../../components/SideBar"
import './Storage.css';

function Storage() {
  const [showPopup, setShowPopup] = useState(false);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [status, setStatus] = useState('');
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

  const handleQuantidadeChange = (e) => {
    setQuantidade(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleImageSelection = (imagem) => {
    setImagemSelecionada(imagem);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim() !== '' && quantidade.trim() !== '' && status.trim() !== '') {
      // Adicione a lógica para salvar os dados aqui
      console.log(nome, quantidade, status, imagemSelecionada);
    }
    setShowPopup(false);
    setNome('');
    setQuantidade('');
    setStatus('');
    setImagemSelecionada(null);
  };

  return (
    <>
      <SideBar />

      <div className='estoqueTitulo'>
        <h1>Estoque</h1>
      </div>

      <div className='estoqueCorpo'>
        <div className='img-text-container2'>
          <img src="plus.svg" alt="img-plus" onClick={handleImageClick} />
          <p className='fonte'>Adicionar nova peça</p>
        </div>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={handleClosePopup}>&times;</span>
              <form onSubmit={handleSubmit}>
                <label className='caixa'>
                  Nome:
                  <input className='caixa' type="text" value={nome} onChange={handleNomeChange} required />
                </label>
                <label className='caixa'>
                  Quantidade:
                  <input className='caixa' type="text" value={quantidade} onChange={handleQuantidadeChange} required />
                </label>
                
                <label className='caixa'>
                  Status:
                  <img  
                    src="/disponivel.svg"
                    alt="Disponível"
                    className="opcao-imagem"
                    onClick={() => handleImageSelection("/disponivel.svg")}
                  />
                  <img
                    src="/indisponivel.svg"
                    alt="Indisponível"
                    className="opcao-imagem"
                    onClick={() => handleImageSelection("/indisponivel.svg")}
                  />
                  <img
                    src="/alerta.svg"
                    alt="Alerta"
                    className="opcao-imagem"
                    onClick={() => handleImageSelection("/alerta.svg")}
                  />
                </label>
                <button type="submit" className='botao'>Adicionar</button>
              </form>
            </div>
          </div>
        )}

        <div className="displayed-links">
          {/* Lista de itens já cadastrados */}
        </div>

        {imagemSelecionada && (
          <div className="imagem-selecionada-container">
            <button className='bntMaiseMenos'>+</button>
            <p>{quantidade}</p>
            <button className='bntMaiseMenos'>-</button>
            <p>{nome}</p>
            <img src={imagemSelecionada} alt="Imagem Selecionada" className="imagem-selecionada" />
          </div>
        )}
      </div>
    </>
  );
}

export default Storage;
