import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState<
    { title: string; author: string; id: string }[]
  >([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<{
    username: string;
    name: string;
    token: string;
  }>();

  useEffect(() => {
    user && blogService.getAll(user.token).then((blogs) => setBlogs(blogs));
  }, [user]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    blogService.login(username, password).then((data) => {
      if (data.token) {
        setUser(data);
      }
    });
  };

  if (!user)
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );

  return (
    <>
      <div>
        <h2>blogs</h2>
        <p>{user.name} is logged in</p>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default App;
