import server from "../config/axiosInstance";
import endpoints from "../constants/endpoints";

export const getTasks = async () => {
  try {
    const kanban = await server.get(endpoints.task.base);
    return kanban;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleTask = async (taskId) => {
  try {
    const kanban = await server.get(endpoints.task.single(taskId));
    return kanban;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createTask = async (data) => {
  try {
    const kanban = await server.post(endpoints.task.base, data);
    return kanban;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateTask = async (taskId, data) => {
  try {
    const kanban = await server.put(endpoints.task.single(taskId), data);
    return kanban;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const kanban = await server.post(endpoints.task.delete(taskId));
    return kanban;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const batchUpdateTask = async (taskData) => {
  try {
    const kanban = await server.patch(endpoints.task.batch, taskData);
    return kanban;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
