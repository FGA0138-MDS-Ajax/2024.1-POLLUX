/*
   Funções de Serviço para Reuniões utilizando Axios e Endpoints definidos.
   - Cada função utiliza Axios para realizar requisições HTTP para os endpoints definidos.
   - As URLs dos endpoints são obtidas do objeto `endpoints`.
   - As funções tratam erros capturando exceções e registrando no console antes de lançá-los novamente.
*/

import server from "../config/axiosInstance";
import endpoints from "../constants/endpoints";

// Busca todas as reuniões através da API.

export const getMeetings = async () => {
  try {
    const meeting = await server.get(endpoints.meeting.base);
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Busca uma única reunião pelo ID.

export const getSingleMeeting = async (meetingId) => {
  try {
    const meeting = await server.get(endpoints.meeting.single(meetingId));
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Cria uma nova reunião utilizando os dados fornecidos.

export const createMeeting = async (data) => {
  try {
    const meeting = await server.post(endpoints.meeting.base, data);
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Edita uma reunião existente com os dados fornecidos.

export const editMeeting = async (meetingId, data) => {
  try {
    const meeting = await server.put(endpoints.meeting.edit(meetingId), data);
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Deleta uma reunião existente pelo ID.

export const deleteMeeting = async (meetingId) => {
  try {
    const meeting = await server.post(endpoints.meeting.delete(meetingId))
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Cria um novo link para uma reunião.

export const createLink = async (meetingId, data) => {
  try {
    const meeting = await server.post(endpoints.meeting.newLink(meetingId), data)
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Edita um link existente em uma reunião.

export const editLink = async (meetingId, linkId, data) => {
  try {
    const meeting = await server.post(endpoints.meeting.updateLink(meetingId, linkId), data)
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Remove um link de uma reunião.

export const destroyLink = async (meetingId, linkId) => {
  try {
    const meeting = await server.post(endpoints.meeting.deleteLink(meetingId, linkId))
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Salva a presença em uma reunião.

export const savePresence = async (meetingId, data) => {
  try {
    const meeting = await server.put(endpoints.meeting.editPresence(meetingId), data)
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
