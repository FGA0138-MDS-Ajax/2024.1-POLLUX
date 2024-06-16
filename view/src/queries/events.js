import server from "../config/axiosInstance";
import endpoints from "../constants/endpoints";

export const getEvents = async () => {
  try {
    const event = await server.get(endpoints.event.base);
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleEvent = async (eventId) => {
  try {
    const event = await server.get(endpoints.event.single(eventId));
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createEvent = async (data) => {
  try {
    const event = await server.post(endpoints.event.base, data);
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editEvent = async (eventId, data) => {
  try {
    const event = await server.put(endpoints.event.single(eventId), data);
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const event = await server.delete(endpoints.event.single(eventId));
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
};