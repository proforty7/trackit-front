import Axios from "axios";

export const createProfile = async values => {
  const response = await Axios.post("/api/profile", values);
  return response;
};

export const getAllProfiles = async () => {
  const response = await Axios.get("/api/profile/all");
  return response;
};

export const addDoctor = async id => {
  await Axios.post(`/api/user/add/${id}`);
};

export const getConnectionList = async () => {
  const res = await Axios.get("/api/user/people");
  return res;
};

export const getProfile = async id => {
  if (id === null || id === undefined) {
    const response = await Axios.get("/api/profile");
    return response;
  } else {
    const response = await Axios.get(`/api/profile/user/${id}`);
    return response;
  }
};
