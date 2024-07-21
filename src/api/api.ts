import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data: { email: string; password: string }) => {
  const response = await api.post("/api/users/login", data);
  return response.data;
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/api/users/register", data);
  return response.data;
};

export const getBooks = async () => {
  const response = await api.get("/api/books");
  return response.data;
};
