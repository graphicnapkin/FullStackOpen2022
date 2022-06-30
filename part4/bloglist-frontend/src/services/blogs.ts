import axios from "axios";
const baseUrl = "/api/blogs";
let options = {};

const setToken = (token: string) =>
  (options = { headers: { Authorization: "Bearer " + token } });

const login = async (username: string, password: string) => {
  const response = await axios.post("/api/login", { username, password });
  return response.data as User;
};

const getAllBlogs = async () => {
  const request = await axios.get(baseUrl, options);
  return request.data as BlogResponse[];
};

const addBlog = async ({ author, title, url }: Blog) => {
  const request = await axios.post(
    baseUrl,
    {
      title,
      author,
      url,
    },
    options
  );
  return request.data as BlogResponse;
};

const editBlog = async ({ author, title, url, likes, id }: BlogResponse) => {
  const request = await axios.put(
    `${baseUrl}/${id}`,
    {
      title,
      author,
      url,
      likes,
    },
    options
  );
  return request.data as BlogResponse;
};

const deleteBlog = async (id: string) => {
  const request = await axios.delete(`${baseUrl}/${id}`, options);
  return request.data;
};

const api = {
  addBlog,
  editBlog,
  getAllBlogs,
  login,
  setToken,
  deleteBlog,
};

export interface User {
  username: string;
  name: string;
  token: string;
  id: string;
}

export interface Blog {
  author: string;
  title: string;
  url?: string;
  user: BlogUser;
}

export interface BlogUser {
  username: string;
  name: string;
  id: string;
}
export interface BlogResponse extends Blog {
  id: string;
  likes: number;
}

export default api;
