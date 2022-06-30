import React from "react";
import Blog from "./Blog";
import { BlogResponse, User } from "../services/blogs";

const Blogs = ({
  blogs,
  setBlogs,
}: {
  blogs: BlogResponse[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogResponse[]>>;
}) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
      ))}
    </div>
  );
};

export default Blogs;
