import React, { useState } from "react";
import api, { BlogResponse } from "../services/blogs";

const AddBlog = ({
  setMessage,
  setBlogs,
  blogs,
}: {
  setMessage: (input: string) => void;
  setBlogs: React.Dispatch<React.SetStateAction<BlogResponse[]>>;
  blogs: BlogResponse[];
}) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.addBlog({ author, title, url });
      setBlogs([...blogs, { title, author, id: response.id }]);
      setMessage(`${title} by ${author} was sucessfully added...`);
    } catch (err) {
      setMessage("Invalid Blog");
    }
  };

  return (
    <form onSubmit={addBlog}>
      author:{" "}
      <input
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
      />
      <br />
      title:{" "}
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      url:{" "}
      <input
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      <br />
      <button type="submit">save</button>
    </form>
  );
};

export default AddBlog;
