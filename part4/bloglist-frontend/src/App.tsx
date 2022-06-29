import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import api, { User, BlogResponse } from "./services/blogs";

//custom components
import AddBlog from "./components/AddBlog";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState<BlogResponse[]>([]);
  const [user, setUser] = useState<User | undefined>();
  const [message, setMessage] = useState("");

  useEffect(() => {
    user &&
      (async () => {
        api.setToken(user.token);
        const blogs = await api.getAllBlogs();
        setBlogs(blogs);
      })();
  }, [user]);

  useEffect(() => {
    const savedData = window.localStorage.getItem("user");
    if (savedData) {
      const user = JSON.parse(savedData);
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(undefined);
    setBlogs([]);
  };

  const setNotification = (input: string) => {
    setMessage(input);
    setTimeout(() => {
      setMessage("");
      console.log("should be gone");
    }, 5000);
  };

  return (
    <>
      {message && <div>{message}</div>}
      {!user && <LoginForm setMessage={setNotification} setUser={setUser} />}
      {user && (
        <>
          <p>
            {user.name} is logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </p>
          <AddBlog
            setMessage={setNotification}
            blogs={blogs}
            setBlogs={setBlogs}
          />
        </>
      )}
      <Blogs blogs={blogs} user={user} />
    </>
  );
};

export default App;
