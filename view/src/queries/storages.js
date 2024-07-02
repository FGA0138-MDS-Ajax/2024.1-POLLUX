/*
   Funções de Serviço para Armazenamentos utilizando Axios e Endpoints definidos.
   - Cada função utiliza Axios para realizar requisições HTTP para os endpoints definidos.
   - As URLs dos endpoints são obtidas do objeto `endpoints`.
   - As funções tratam erros capturando exceções e registrando no console antes de lançá-los novamente.
*/

import server from "../config/axiosInstance";
import endpoints from "../constants/endpoints";

// Busca todos os armazenamentos através da API.

export const getStorages = async () => {
  try {
    const storage = await server.get(endpoints.storage.base);
    return storage;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Busca um único armazenamento pelo ID.

export const getSingleStorage = async (storageId) => {
  try {
    const storage = await server.get(endpoints.storage.single(storageId));
    return storage;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Cria um novo armazenamento utilizando os dados fornecidos.

export const createStorage = async (data) => {
  try {
    const storage = await server.post(endpoints.storage.base, data);
    return storage;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Edita um armazenamento existente com os dados fornecidos.

export const editStorage = async (storageId, data) => {
  try {
    const storage = await server.post(endpoints.storage.edit(storageId), data);
    return storage;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Deleta um armazenamento existente pelo ID.

export const deleteStorage = async (storageId) => {
  try {
    const storage = await server.post(endpoints.storage.delete(storageId));
    return storage;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
