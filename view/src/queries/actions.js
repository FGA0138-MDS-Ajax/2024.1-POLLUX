import server from "../config/axiosInstance";
import endpoints from "../constants/endpoints";

export const getActions = async () => {
  try {
    const action = await server.get(endpoints.action.base);
    return action;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleActions = async (actionId) => {
  try {
    const action = await server.get(endpoints.action.single(actionId));
    return action;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createAction = async (data) => {
  try {
    const action = await server.post(endpoints.action.base, data);
    return action;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editAction = async (actionId, data) => {
  try {
    const action = await server.put(endpoints.action.single(actionId), data);
    return action;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAction = async (actionId) => {
  try {
    const action = await server.delete(endpoints.action.single(actionId));
    return action;
  } catch (error) {
    console.log(error);
    throw error;
  }
};