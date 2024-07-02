/*
   Funções de Serviço para Tarefas utilizando Axios e Endpoints definidos.
   - Cada função utiliza Axios para realizar requisições HTTP para os endpoints definidos.
   - As URLs dos endpoints são obtidas do objeto `endpoints`.
   - As funções tratam erros capturando exceções e registrando no console antes de lançá-los novamente.
*/

import server from "../config/axiosInstance";
import endpoints from "../constants/endpoints";

// Busca todas as tarefas através da API.

export const getTasks = async () => {
  try {
    const kanban = await server.get(endpoints.task.base);
    return kanban;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Busca uma única tarefa pelo ID.

export const getSingleTask = async (taskId) => {
  try {
    const kanban = await server.get(endpoints.task.single(taskId));
    return kanban;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Cria uma nova tarefa utilizando os dados fornecidos.

export const createTask = async (data) => {
  try {
    const kanban = await server.post(endpoints.task.base, data);
    return kanban;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Atualiza uma tarefa existente com os dados fornecidos.

export const updateTask = async (taskId, data) => {
  try {
    const kanban = await server.put(endpoints.task.single(taskId), data);
    return kanban;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Deleta uma tarefa existente pelo ID.

export const deleteTask = async (taskId) => {
  try {
    const kanban = await server.post(endpoints.task.delete(taskId));
    return kanban;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Atualiza várias tarefas simultaneamente.

export const batchUpdateTask = async (taskData) => {
  try {
    const kanban = await server.patch(endpoints.task.batch, taskData);
    return kanban;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
