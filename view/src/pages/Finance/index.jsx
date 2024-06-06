import React, { useState, useEffect } from "react";
import './Finance.css';
import SideBar from "../../components/SideBar";

function Finance() {
  const [showPopup, setShowPopup] = useState(false);
  const [ano, setAno] = useState('2024');
  const [mes, setMes] = useState('Junho');
  const [acao, setAcao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('Entrada');
  const [acoes, setAcoes] = useState([]);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    calcularSaldo();
  }, [acoes]);

  const handleAnoChange = (e) => {
    setAno(e.target.value);
  };

  const handleMesChange = (e) => {
    setMes(e.target.value);
  };

  const handleAcaoChange = (e) => {
    setAcao(e.target.value);
  };

  const handleValorChange = (e) => {
    setValor(e.target.value);
  };

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
  };

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaAcao = {
      ano,
      mes,
      acao,
      valor: parseFloat(valor),
      tipo
    };
    setAcoes([...acoes, novaAcao]);
    setShowPopup(false);
    setAcao('');
    setValor('');
  };

  const calcularSaldo = () => {
    let total = 0;
    acoes.forEach(acao => {
      if (acao.tipo === 'Entrada') {
        total += acao.valor;
      } else if (acao.tipo === 'Saída') {
        total -= acao.valor;
      }
    });
    setSaldo(total);
  };

  const handleDelete = (index) => {
    const novaListaAcoes = [...acoes];
    const acaoRemovida = novaListaAcoes.splice(index, 1)[0];
    
    setAcoes(novaListaAcoes);
    
    // Atualizar o saldo após a remoção do registro
    let novoSaldo = saldo;
    if (acaoRemovida.tipo === 'Entrada') {
      novoSaldo -= acaoRemovida.valor;
    } else if (acaoRemovida.tipo === 'Saída') {
      novoSaldo += acaoRemovida.valor;
    }
    setSaldo(novoSaldo);
  };

  return (
    <>
      <SideBar />
      <div id="paginaFinance">
        <div className='financeTitulo'>
          <h1>Financeiro</h1>
        </div>
        <div className='img-text-container2'>
          <div className='caixa'>
            <label htmlFor="ano">Ano:</label>
            <select id="ano" value={ano} onChange={handleAnoChange}>
              {Array.from({ length: 11 }, (_, i) => 2020 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className='caixa'>
            <label htmlFor="mes">Mês:</label>
            <select id="mes" value={mes} onChange={handleMesChange}>
              {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='financeCorpo'>
          <h2>{mes} - Ações:</h2>
          <ul>
            {acoes.filter(acao => acao.mes === mes && acao.ano === ano).map((acao, index) => (
              <li key={index} className={acao.tipo === 'Entrada' ? 'entrada' : 'saida'}>
                {acao.tipo}: {acao.acao} - R$ {acao.valor.toFixed(2)}
                <img src="trash.svg" alt="Delete" onClick={() => handleDelete(index)} />
              </li>
            ))}
          </ul>
          <h3>Saldo Atual: R$ {saldo.toFixed(2)}</h3>
          <div className="botao-container">
            <button className='botao' onClick={handleImageClick}>Adicionar Entrada/Saída</button>
          </div>
        </div>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={handleClosePopup}>&times;</span>
              <form onSubmit={handleSubmit}>
                <div className='caixa'>
                  <label htmlFor="acao">Ação:</label>
                  <input type="text" id="acao" value={acao} onChange={handleAcaoChange} required />
                </div>
                <div className='caixa'>
                  <label htmlFor="valor">Valor:</label>
                  <input type="number" step="0.01" id="valor" value={valor} onChange={handleValorChange} required />
                </div>
                <div className='caixa'>
                  <label htmlFor="tipo">Tipo:</label>
                  <select id="tipo" value={tipo} onChange={handleTipoChange}>
                    <option value="Entrada">Entrada</option>
                    <option value="Saída">Saída</option>
                  </select>
                </div>
                <button type="submit" className='botao'>Salvar</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Finance;

