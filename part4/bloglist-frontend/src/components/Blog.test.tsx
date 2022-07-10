import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

//blog: { author, title, url, likes, id, user },
test("renders content", () => {
  const blog = {
    author: "me",
    title: "mytitle",
    url: "dubdubdub",
    likes: 5,
    id: "blogid",
    user: "myuserid",
  };

  //@ts-ignore
  render(<Blog blog={blog} />);
  //const element = screen.getByText("mytitle");
  const element = screen.getByRole("document");
  // eslint-disable-next-line
  screen.debug(element);
  expect(element).toBeDefined();
});
