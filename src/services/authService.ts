import axios from "axios";
export const loginUser = async (
  email: string,
  password: string
): Promise<any | null> => {
  try {
    const response = await axios.get(`http://localhost:5000/users`);
    const employees = response.data;
    const user = employees.find(
      (employee: any) =>
        employee.email === email && employee.password === password
    );
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Login failed");
  }
};
