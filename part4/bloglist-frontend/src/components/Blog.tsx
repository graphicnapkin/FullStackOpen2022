import { BlogResponse } from "../services/blogs";

const Blog = ({ blog }: { blog: BlogResponse }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

export default Blog;
