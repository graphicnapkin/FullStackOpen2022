import axios from "axios";
const baseUrl = "/api/blogs";

const login = async (username: string, password: string) => {
  const response = await axios.post("/api/login", { username, password });
  return response.data;
};

const getAllBlogs = async (token: string) => {
  const request = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return request.data as { id: string; title: string; author: string }[];
};

const addBlog = async ({
  token,
  author,
  title,
  url,
}: {
  token: string;
  author: string;
  title: string;
  url: string;
}) => {
  const request = await axios.post(
    baseUrl,
    {
      title,
      author,
      url,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return request.data as {
    id: string;
    user: string;
    likes: number;
    author: string;
    title: string;
  };
};

const api = {
  addBlog,
  getAllBlogs,
  login,
};

export default api;
