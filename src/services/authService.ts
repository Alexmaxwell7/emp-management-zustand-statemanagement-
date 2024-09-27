import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:5000/users", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
