/*
   Funções de Serviço para Eventos utilizando Axios e Endpoints definidos.
   - Cada função utiliza Axios para realizar requisições HTTP para os endpoints definidos.
   - As URLs dos endpoints são obtidas do objeto `endpoints`.
   - As funções tratam erros capturando exceções e registrando no console antes de lançá-los novamente.
*/

import server from "../config/axiosInstance";
import endpoints from "../constants/endpoints";

// Busca todos os eventos através da API.

export const getEvents = async () => {
  try {
    const event = await server.get(endpoints.event.base);
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Busca um único evento pelo ID.

export const getSingleEvent = async (eventId) => {
  try {
    const event = await server.get(endpoints.event.single(eventId));
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Cria um novo evento utilizando os dados fornecidos.

export const createEvent = async (data) => {
  try {
    const event = await server.post(endpoints.event.base, data);
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Edita um evento existente com os dados fornecidos.

export const editEvent = async (data) => {
  try {
    const event = await server.post(endpoints.event.edit, data);
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Deleta um evento existente com os dados fornecidos.

export const deleteEvent = async (data) => {
  try {
    const event = await server.post(endpoints.event.delete, data);
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
