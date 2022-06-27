import axios from "axios";
const baseUrl = "/api/blogs";

const login = async (username: string, password: string) => {
  try {
    const response = await axios.post("/api/login", { username, password });
    return response.data;
  } catch (err) {
    return err;
  }
};

const getAll = async (token: string) => {
  const request = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return request.data as { id: string; title: string; author: string }[];
};

const blogService = {
  getAll,
  login,
};

export default blogService;
