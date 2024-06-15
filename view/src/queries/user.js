import server from "../config/axiosInstance";
import endpoints from "../constants/endpoints";

export const getUsers = async () => {
  try {
    const user = await server.get(endpoints.user.base);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleUser = async (userId) => {
  try {
    const user = await server.get(endpoints.user.single(userId));
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    const user = await server.post(endpoints.user.base, data);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editUser = async (userId, data) => {
  try {
    const user = await server.put(endpoints.user.single(userId), data);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editPassword = async (userId, newPassword) => {
  try {
    const user = await server.patch(endpoints.user.password(userId), newPassword);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const user = await server.delete(endpoints.user.single(userId));
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
