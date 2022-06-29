import React, { useState } from "react";
import api, { User } from "../services/blogs";

const LoginForm = ({
  setMessage,
  setUser,
}: {
  setMessage: (input: string) => void;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await api.login(username, password);
      setUser(response);
      window.localStorage.setItem("user", JSON.stringify(response));

      setUsername("");
      setPassword("");
    } catch (err) {
      setMessage("Wrong credentials");
    }
  };
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

export default LoginForm;
