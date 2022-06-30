import React from "react";
import Blog from "./Blog";
import { BlogResponse, User } from "../services/blogs";

const Blogs = ({
  blogs,
  setBlogs,
  user,
}: {
  blogs: BlogResponse[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogResponse[]>>;
  user: User | undefined;
}) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            localUser={user}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
          />
        ))}
    </div>
  );
};

export default Blogs;
