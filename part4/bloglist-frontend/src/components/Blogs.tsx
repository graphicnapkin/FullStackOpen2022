import React from "react";
import Blog from "./Blog";
import { BlogResponse, User } from "../services/blogs";

const Blogs = ({
  blogs,
  user,
}: {
  user: User | undefined;
  blogs: BlogResponse[];
}) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
