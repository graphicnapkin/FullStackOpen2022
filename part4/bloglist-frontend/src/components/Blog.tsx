import Togglable from "./Togglable";
import api, { BlogResponse, User } from "../services/blogs";

const Blog = ({
  blog: { author, title, url, likes, id, user },
  blogs,
  setBlogs,
  localUser,
}: {
  blog: BlogResponse;
  blogs: BlogResponse[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogResponse[]>>;
  localUser: User | undefined;
}) => {
  const like = async () => {
    const updatedBlog = { author, title, url, user, likes: likes + 1, id };
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

  const deleteBlog = async () => {
    const confirmed = window.confirm(`Remove blog ${title} by ${author}`);
    if (confirmed) {
      await api.deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <div style={{ border: "solid black", margin: 10, padding: 5 }}>
      {title} {author}
      <Togglable labels={["view", "hide"]}>
        <div>Website: {url}</div>
        <div>Likes: {likes}</div>
        <div>Author:{author}</div>
        <button onClick={like}>like</button>
        {localUser?.id === user.id && (
          <button onClick={deleteBlog}>delete</button>
        )}
      </Togglable>
    </div>
  );
};

export default Blog;
