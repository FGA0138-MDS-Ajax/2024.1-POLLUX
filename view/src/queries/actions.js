/*
   Funções de Serviço para Ações utilizando Axios e Endpoints definidos.
   - Cada função utiliza Axios para realizar requisições HTTP para os endpoints definidos.
   - As URLs dos endpoints são obtidas do objeto `endpoints`.
   - As funções tratam erros capturando exceções e registrando no console antes de lançá-los novamente.
*/

import server from "../config/axiosInstance";
import endpoints from "../constants/endpoints";

// Busca todas as ações através da API.

export const getActions = async () => {
  try {
    const action = await server.get(endpoints.action.base);
    return action;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Busca uma única ação pelo ID.

export const getSingleActions = async (actionId) => {
  try {
    const action = await server.get(endpoints.action.single(actionId));
    return action;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Cria uma nova ação utilizando os dados fornecidos.

export const createAction = async (data) => {
  try {
    const action = await server.post(endpoints.action.base, data);
    return action;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Edita uma ação existente com os dados fornecidos.

export const editAction = async (data) => {
  try {
    const action = await server.post(endpoints.action.edit, data);
    return action;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Deleta uma ação existente com os dados fornecidos.

export const deleteAction = async (data) => {
  try {
    const action = await server.post(endpoints.action.delete, data);
    return action;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
