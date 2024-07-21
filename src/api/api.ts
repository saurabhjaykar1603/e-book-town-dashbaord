import axios from "axios";
import useTokenStore from "../store/store";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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

export const createBook = async (data: FormData) => {
  const response = await api.post("/api/books/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateBook = async (data: FormData, id: string) => {
  const response = await api.patchForm(`/api/books/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getBook = async (id: string) => api.get(`/api/books/${id}`);
