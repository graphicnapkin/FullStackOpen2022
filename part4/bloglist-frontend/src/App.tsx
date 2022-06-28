import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import api from "./services/blogs";

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
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    user &&
      (async () => {
        const blogs = await api.getAllBlogs(user.token);
        setBlogs(blogs);
      })();
  }, [user]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await api.login(username, password);
      setUser(response);
      setUsername("");
      setPassword("");
    } catch (err) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}
      {!user && (
        <LoginForm
          errorMessage={errorMessage}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
      {user && (
        <>
          <p>{user.name} is logged in</p>
          <AddBlog
            token={user.token}
            setError={setErrorMessage}
            blogs={blogs}
            setBlogs={setBlogs}
          />
        </>
      )}
      <Blogs blogs={blogs} />
    </>
  );
};
const AddBlog = ({
  setError,
  setBlogs,
  token,
  blogs,
}: {
  setError: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  setBlogs: React.Dispatch<
    React.SetStateAction<{ title: string; author: string; id: string }[]>
  >;
  blogs: { title: string; author: string; id: string }[];
}) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.addBlog({ author, title, url, token });
      setBlogs([...blogs, { title, author, id: response.id }]);
    } catch (err) {
      setError("Invalid Blog");
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

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}: {
  errorMessage: string;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) => {
  return (
    <>
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
    </>
  );
};

const Blogs = ({
  blogs,
}: {
  blogs: { title: string; author: string; id: string }[];
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

export default App;
