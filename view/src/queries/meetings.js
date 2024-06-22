import server from "../config/axiosInstance";
import endpoints from "../constants/endpoints";

export const getMeetings = async () => {
  try {
    const meeting = await server.get(endpoints.meeting.base);
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleMeeting = async (meetingId) => {
  try {
    const meeting = await server.get(endpoints.meeting.single(meetingId));
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createMeeting = async (data) => {
  try {
    const meeting = await server.post(endpoints.meeting.base, data);
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editMeeting = async (meetingId, data) => {
  try {
    const meeting = await server.put(endpoints.meeting.edit(meetingId), data);
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteMeeting = async (meetingId) => {
  try {
    const meeting = await server.post(endpoints.meeting.delete(meetingId))
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createLink = async (meetingId, data) => {
  try {
    const meeting = await server.post(endpoints.meeting.newLink(meetingId), data)
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editLink = async (meetingId, linkId, data) => {
  try {
    const meeting = await server.post(endpoints.meeting.updateLink(meetingId, linkId), data)
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const destroyLink = async (meetingId, linkId) => {
  try {
    const meeting = await server.post(endpoints.meeting.deleteLink(meetingId, linkId))
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const savePresence = async (meetingId, data) => {
  try {
    const meeting = await server.put(endpoints.meeting.editPresence(meetingId), data)
    return meeting;
  } catch (error) {
    console.log(error);
    throw error;
  }
};