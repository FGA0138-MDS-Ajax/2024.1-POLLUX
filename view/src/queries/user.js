/*
   Funções de Serviço para Usuários utilizando Axios e Endpoints definidos.
   - Cada função utiliza Axios para realizar requisições HTTP para os endpoints definidos.
   - As URLs dos endpoints são obtidas do objeto `endpoints`.
   - As funções tratam erros capturando exceções e registrando no console antes de lançá-los novamente.
*/

import server from "../config/axiosInstance";
import endpoints from "../constants/endpoints";

// Busca todos os usuários através da API.
export const getUsers = async () => {
  try {
    const user = await server.get(endpoints.user.base);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Busca um único usuário pelo ID.
export const getSingleUser = async (userId) => {
  try {
    const user = await server.get(endpoints.user.single(userId));
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Cria um novo usuário utilizando os dados fornecidos.
export const createUser = async (data) => {
  try {
    const user = await server.post(endpoints.user.base, data);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Edita um usuário existente com os dados fornecidos.
export const editUser = async (userId, data) => {
  try {
    const user = await server.put(endpoints.user.single(userId), data);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Edita a senha de um usuário com o novo password fornecido.
export const editPassword = async (userId, newPassword) => {
  try {
    const user = await server.patch(endpoints.user.password(userId), newPassword);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Deleta um usuário existente pelo ID.
export const deleteUser = async (userId) => {
  try {
    const user = await server.post(endpoints.user.delete(userId));
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
