import Togglable from "./Togglable";
import api, { BlogResponse } from "../services/blogs";

const Blog = ({
  blog: { author, title, url, likes, id },
  blogs,
  setBlogs,
}: {
  blog: BlogResponse;
  blogs: BlogResponse[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogResponse[]>>;
}) => {
  const like = async () => {
    const updatedBlog = { author, title, url, likes: likes + 1, id };
    await api.editBlog(updatedBlog);
    setBlogs(
      blogs.map((blog) => {
        if (blog.id === id) {
          return updatedBlog;
        }
        return blog;
      })
    );
  };

  return (
    <div style={{ border: "solid black", margin: 10, padding: 5 }}>
      {title} {author}
      <Togglable labels={["view", "hide"]}>
        <div>Website: {url}</div>
        <div>Likes: {likes}</div>
        <div>Author:{author}</div>
        <button onClick={like}>like</button>
      </Togglable>
    </div>
  );
};

export default Blog;
