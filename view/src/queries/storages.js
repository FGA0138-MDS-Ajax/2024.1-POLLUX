import server from "../config/axiosInstance";
import endpoints from "../constants/endpoints";

export const getStorages = async () => {
  try {
    const storage = await server.get(endpoints.storage.base);
    return storage;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleStorage = async (storageId) => {
  try {
    const storage = await server.get(endpoints.storage.single(storageId));
    return storage;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createStorage = async (data) => {
  try {
    const storage = await server.post(endpoints.storage.base, data);
    return storage;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editStorage = async (storageId, data) => {
  try {
    const storage = await server.post(endpoints.storage.edit(storageId), data);
    return storage;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteStorage = async (storageId) => {
  try {
    const storage = await server.post(endpoints.storage.delete(storageId));
    return storage;
  } catch (error) {
    console.log(error);
    throw error;
  }
};