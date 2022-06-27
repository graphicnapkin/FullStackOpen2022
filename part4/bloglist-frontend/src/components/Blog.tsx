const Blog = ({ blog }: { blog: { title: string; author: string } }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

export default Blog;

