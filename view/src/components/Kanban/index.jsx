import './Kanban.css';
import React, { useState } from 'react';

function Kanban() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [tarefa, setTarefa] = useState('');
  const [quem, setQuem] = useState('');
  const [editIndex, setEditIndex] = useState(-1); // Adiciona um estado para controlar o índice da tarefa em edição

  const [tarefas, setTarefas] = useState({
    Pendente: [],
    'Em andamento': [],
    Finalizado: []
  });

  const handleBntClick = (column) => {
    setCurrentColumn(column);
    setShowPopup(true);
    setEditIndex(-1); // Limpar o editIndex ao abrir o pop-up para adicionar nova tarefa
    setTarefa(''); // Limpar os campos ao abrir o pop-up para adicionar nova tarefa
    setQuem(''); // Limpar os campos ao abrir o pop-up para adicionar nova tarefa
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditIndex(-1); // Limpar o editIndex ao fechar o popup
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
      if (editIndex >= 0) { // Alterado para verificar se editIndex é maior ou igual a 0
        // Se editIndex for maior ou igual a 0, significa que estamos editando uma tarefa existente
        setTarefas((prevTarefas) => {
          const newTarefas = [...prevTarefas[currentColumn]];
          newTarefas[editIndex] = { quem, tarefa };
          return {
            ...prevTarefas,
            [currentColumn]: newTarefas,
          };
        });
        setEditIndex(-1); // Limpa o editIndex após a edição
      } else {
        // Caso contrário, estamos adicionando uma nova tarefa
        setTarefas((prevTarefas) => ({
          ...prevTarefas,
          [currentColumn]: [...prevTarefas[currentColumn], { quem, tarefa }]
        }));
      }
      setShowPopup(false);
      setTarefa('');
      setQuem('');
    }
  };


  const handleRemoveTarefa = (column, index) => {
    const updatedTarefas = [...tarefas[column]];
    updatedTarefas.splice(index, 1);
    setTarefas((prevTarefas) => ({
      ...prevTarefas,
      [column]: updatedTarefas
    }));
  };

  const handleDragStart = (ev, column, index) => {
    ev.dataTransfer.setData('text/plain', JSON.stringify({ column, index }));
  };

  const handleDragOver = (ev) => {
    ev.preventDefault();
  };

  const handleDrop = (ev, targetColumn) => {
    ev.preventDefault();
    const data = JSON.parse(ev.dataTransfer.getData('text/plain'));
    const { column: sourceColumn, index: sourceIndex } = data;
    if (sourceColumn === targetColumn) {
      // Reorganiza na mesma coluna
      const newTasks = Array.from(tarefas[targetColumn]);
      const [removedTask] = newTasks.splice(sourceIndex, 1);
      newTasks.splice(ev.target.dataset.index, 0, removedTask);
      setTarefas((prevTarefas) => ({
        ...prevTarefas,
        [targetColumn]: newTasks
      }));
    } else {
      // Move para uma coluna diferente
      const task = tarefas[sourceColumn][sourceIndex];
      const newSourceTasks = tarefas[sourceColumn].filter((_, i) => i !== sourceIndex);
      setTarefas((prevTarefas) => ({
        ...prevTarefas,
        [sourceColumn]: newSourceTasks,
        [targetColumn]: [...prevTarefas[targetColumn], task]
      }));
    }
  };

  const handleDoubleClick = (task, column) => {
    const { quem, tarefa } = task;
    setTarefa(tarefa);
    setQuem(quem);
    setEditIndex(tarefas[column].findIndex(t => t.tarefa === task.tarefa)); // Encontra o índice da tarefa na coluna específica comparando o texto da tarefa
    setCurrentColumn(column); // Define a coluna atual para uso na edição
    setShowPopup(true); // Mostrar o popup de edição
  };



  return (
    <div className='kanban'>

      <div className='container'>
        {['Pendente', 'Em andamento', 'Finalizado'].map(column => (
          <div
            key={column}
            className='colunas'
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column)}
          >
            <div className='tituloColuna'>
              <h3>{column}</h3>
            </div>
            <div className='corpoColuna'>
              {tarefas[column].map((tarefa, index) => (
                <div
                  key={index}
                  className='tarefaItem'
                  draggable='true'
                  onDragStart={(e) => handleDragStart(e, column, index)}
                  data-index={index} // Add index to the data attribute
                  onDoubleClick={() => handleDoubleClick(tarefa, column)} // Handle double click
                >
                  <p>{tarefa.tarefa}</p>
                  <div className="separador"></div>
                  <p>{tarefa.quem}</p>
                  <img
                    src='trash.svg'
                    alt='img-trash'
                    onClick={() => handleRemoveTarefa(column, index)}
                  />
                </div>
              ))}
            </div>
            <button className='bntTarefa' onClick={() => handleBntClick(column)}>
              +
            </button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className='popup'>
          <div className='popup-content'>
            <span className='close' onClick={handleClosePopup}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <label className='caixa'>
                Insira a tarefa:
                <input
                  type='text'
                  value={tarefa}
                  onChange={handleTarefaChange}
                  required
                />
              </label>
              <label className='caixa'>
                Responsáveis:
                <input
                  type='text'
                  value={quem}
                  onChange={handleQuemChange}
                  required
                />
              </label>
              <button type='submit' className='botao'>
                {editIndex > -1 ? 'Salvar' : 'Adicionar'} {/* Alterar o texto do botão dependendo se está editando ou adicionando */}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Kanban;
