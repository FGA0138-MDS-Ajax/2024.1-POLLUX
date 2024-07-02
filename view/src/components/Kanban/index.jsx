/* 
   Este componente representa um quadro Kanban para gerenciamento de tarefas, dividido em três colunas:
   Pendente, Em andamento e Finalizado. Permite adicionar, editar, excluir e arrastar tarefas entre as 
   diferentes colunas e na mesma coluna. Presente na Tela Calendário
*/

import { getTasks, createTask, updateTask, deleteTask, batchUpdateTask } from '../../queries/kanban';
import './Kanban.css';
import React, { useEffect, useState } from 'react';

function Kanban() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [tarefa, setTarefa] = useState('');
  const [quem, setQuem] = useState('');
  const [position, setPosition] = useState('');
  const [editIndex, setEditIndex] = useState(-1); // Adiciona um estado para controlar o índice da tarefa em edição

  // Define o título da coluna

  const [tarefas, setTarefas] = useState({
    Pendente: [],
    'Em andamento': [],
    Finalizado: []
  });

  useEffect(() => {
    loadTasks();
  }, []);

  // Carrega as tarefas ao montar o componente

  const loadTasks = async () => {
    const response = await getTasks();
    const tasks = response.data.reduce((acc, task) => {
      acc[task.status] = acc[task.status] || [];
      acc[task.status].push({ id: task.id, quem: task.assignee, tarefa: task.title });
      return acc;
    }, {
      Pendente: [],
      'Em andamento': [],
      Finalizado: []
    });
    setTarefas(tasks);
  };

  // Abre o popup para adicionar uma nova tarefa na coluna especificada

  const handleBntClick = (column) => {
    setCurrentColumn(column);
    setShowPopup(true);
    setEditIndex(-1); // Limpar o editIndex ao abrir o pop-up para adicionar nova tarefa
    const newPosition = tarefas[column].length + 1; //posição de uma nova tarefa
    setTarefa(''); // Limpar os campos ao abrir o pop-up para adicionar nova tarefa
    setQuem(''); // Limpar os campos ao abrir o pop-up para adicionar nova tarefa
    setPosition(newPosition); //setar a posição na coluna de cada card
  };

  // Fecha o popup de adição/edição de tarefa

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditIndex(-1); // Limpar o editIndex ao fechar o popup
  };

  // Atualiza o estado da tarefa conforme o usuário digita a descrição da tarefa

  const handleTarefaChange = (e) => {
    setTarefa(e.target.value);
  };

  // Atualiza o estado do responsável conforme o usuário digita o nome do responsável

  const handleQuemChange = (e) => {
    setQuem(e.target.value);
  };

  // Manipula o envio do formulário para adicionar/editar uma tarefa

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tarefa.trim() !== '' && quem.trim() !== '') {
      const taskData = {
        title: tarefa,
        assignee: quem,
        status: currentColumn,
        position: position
      };
      if (editIndex >= 0) {// Alterado para verificar se editIndex é maior ou igual a 0
        // Se editIndex for maior ou igual a 0, significa que estamos editando uma tarefa existente
        const task = tarefas[currentColumn][editIndex];
        await updateTask(task.id, taskData);
        loadTasks();
      } else {
        // Caso contrário, estamos adicionando uma nova tarefa
        await createTask(taskData);
        loadTasks();
      }
      setShowPopup(false);
      setTarefa('');
      setQuem('');
    }
  };

  // Remove uma tarefa da coluna especificada

  const handleRemoveTarefa = async (column, index) => {
    const task = tarefas[column][index];
    await deleteTask(task.id);
    loadTasks();
  };

  // Inicia o processo de arrastar uma tarefa

  const handleDragStart = (ev, column, index) => {
    ev.dataTransfer.setData('text/plain', JSON.stringify({ column, index }));
  };

  // Lida com o evento de arrastar sobre uma área válida

  const handleDragOver = (ev) => {
    ev.preventDefault();
  };

  // Lida com o evento de soltar uma tarefa em uma nova coluna

  const handleDrop = async (ev, targetColumn) => {
    ev.preventDefault();
    const data = JSON.parse(ev.dataTransfer.getData('text/plain'));
    const { column: sourceColumn, index: sourceIndex } = data;
    let newTasks = { ...tarefas };

    if (sourceColumn === targetColumn) {
      // Reordenar na mesma coluna
      const reorderedTasks = Array.from(newTasks[targetColumn]);
      const [movedTask] = reorderedTasks.splice(sourceIndex, 1);
      const targetIndex = parseInt(ev.target.dataset.index, 10);
      reorderedTasks.splice(targetIndex, 0, movedTask);

      // Atualiza posições
      reorderedTasks.forEach((task, idx) => task.position = idx);
      newTasks[targetColumn] = reorderedTasks;

      await batchUpdateTask({ tasks: reorderedTasks });
    } else {
      // Mover para outra coluna
      const sourceTasks = Array.from(newTasks[sourceColumn]);
      const [movedTask] = sourceTasks.splice(sourceIndex, 1);
      movedTask.position = newTasks[targetColumn].length;
      movedTask.status = targetColumn;
      newTasks[targetColumn] = [...newTasks[targetColumn], movedTask];
      newTasks[sourceColumn] = sourceTasks;

      // Mudar posições na coluna
      newTasks[targetColumn].forEach((task, idx) => task.position = idx);
      newTasks[sourceColumn].forEach((task, idx) => task.position = idx);

      await batchUpdateTask({ tasks: [...newTasks[targetColumn], ...newTasks[sourceColumn]] });
    }

    setTarefas(newTasks);
  };

  // Lida com o evento de duplo clique em uma tarefa para editar

  const handleDoubleClick = (task, column) => {
    setTarefa(task.tarefa);
    setQuem(task.quem);
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
                  data-index={index} // Adiciona um rastreador para os dados
                  onDoubleClick={() => handleDoubleClick(tarefa, column)} // Handler do double click (editar/excluir)
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
