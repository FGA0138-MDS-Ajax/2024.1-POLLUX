import server from "../config/axiosInstance";
import endpoints from "../constants/endpoints";

export const getDocuments = async () => {
  try {
    const documents = await server.get(endpoints.document.base);
    return documents;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleDocument = async (documentId) => {
  try {
    const document = await server.get(endpoints.document.single(documentId));
    return document;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createDocument = async (data) => {
  try {
    const document = await server.post(endpoints.document.base, data);
    return document;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editDocument = async (data) => {
  try {
    const document = await server.post(endpoints.document.edit, data);
    return document;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteDocument = async (data) => {
  try {
    const document = await server.post(endpoints.document.delete, data);
    return document;
  } catch (error) {
    console.log(error);
    throw error;
  }
};