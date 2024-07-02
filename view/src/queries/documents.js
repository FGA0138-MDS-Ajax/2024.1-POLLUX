/*
   Funções de Serviço para Documentos utilizando Axios e Endpoints definidos.
   - Cada função utiliza Axios para realizar requisições HTTP para os endpoints definidos.
   - As URLs dos endpoints são obtidas do objeto `endpoints`.
   - As funções tratam erros capturando exceções e registrando no console antes de lançá-los novamente.
*/

import server from "../config/axiosInstance";
import endpoints from "../constants/endpoints";

// Busca todos os documentos através da API.

export const getDocuments = async () => {
  try {
    const documents = await server.get(endpoints.document.base);
    return documents;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Busca um único documento pelo ID.

export const getSingleDocument = async (documentId) => {
  try {
    const document = await server.get(endpoints.document.single(documentId));
    return document;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Cria um novo documento utilizando os dados fornecidos.

export const createDocument = async (data) => {
  try {
    const document = await server.post(endpoints.document.base, data);
    return document;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Edita um documento existente com os dados fornecidos.

export const editDocument = async (data) => {
  try {
    const document = await server.post(endpoints.document.edit, data);
    return document;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Deleta um documento existente com os dados fornecidos.

export const deleteDocument = async (data) => {
  try {
    const document = await server.post(endpoints.document.delete, data);
    return document;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
