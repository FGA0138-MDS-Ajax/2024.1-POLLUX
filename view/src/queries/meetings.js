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
    const meeting = await server.put(endpoints.meeting.single(meetingId), data);
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