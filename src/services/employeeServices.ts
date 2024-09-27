import axios from "axios";

const BASE_URL = "http://localhost:5000/userDetails";

export const fetchUserById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user", error);
      throw error;
    }
  };

export const createUser = async (data: any) => {
  try {
    const response = await axios.post(BASE_URL, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: string, data: any) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUsersList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users list", error);
      throw error;
    }
  };