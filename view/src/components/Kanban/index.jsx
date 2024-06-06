import './Kanban.css';
import React, { useState } from 'react';

function Kanban() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [tarefa, setTarefa] = useState('');
  const [quem, setQuem] = useState('');
  const [tarefas, setTarefas] = useState({
    Pendente: [],
    'Em andamento': [],
    Finalizado: []
  });

  const handleBntClick = (column) => {
    setCurrentColumn(column);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleTarefaChange = (e) => {
    setTarefa(e.target.value);
  };

  const handleQuemChange = (e) => {
    setQuem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tarefa.trim() !== '' && quem.trim() !== '') {
      setTarefas(prevTarefas => ({
        ...prevTarefas,
        [currentColumn]: [...prevTarefas[currentColumn], { quem, tarefa }]
      }));
      setShowPopup(false);
      setTarefa('');
      setQuem('');
    }
  };

  const handleRemoveTarefa = (column, index) => {
    const updatedTarefas = [...tarefas[column]];
    updatedTarefas.splice(index, 1);
    setTarefas(prevTarefas => ({
      ...prevTarefas,
      [column]: updatedTarefas
    }));
  };

  return (
    <div className='kanban'>
      <div className='inicio'>
        <h1>Kanban</h1>
      </div>

      <div className='container'>
        {['Pendente', 'Em andamento', 'Finalizado'].map(column => (
          <div className='colunas' key={column}>
            <div className='tituloColuna'>
              <h3>{column}</h3>
            </div>
            <div className='corpoColuna'>
              {tarefas[column].map((tarefa, index) => (
                <div key={index} className='tarefaItem'>
                  <p>{tarefa.tarefa}</p>
                  <hr color='black'/>
                  <p>{tarefa.quem}</p>
                  <img src="trash.svg" alt='img-trash' onClick={() => handleRemoveTarefa(column, index)} />
                </div>
              ))}
            </div>
            <button className='bntTarefa' onClick={() => handleBntClick(column)}>+</button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>&times;</span>
            <form onSubmit={handleSubmit}>
              <label className='caixa'>
                Insira a tarefa:
                <input
                  type="text"
                  value={tarefa}
                  onChange={handleTarefaChange}
                  required
                />
              </label>
              <label className='caixa'>
                Quem vai fazer:
                <input
                  type="text"
                  value={quem}
                  onChange={handleQuemChange}
                  required
                />
              </label>
              <button type="submit" className='botao'>Adicionar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Kanban;
