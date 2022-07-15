import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"

const App = () => {
  const [page, setPage] = useState("authors")
  const [notify, setNotify] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)

  const logOut = () => {
    localStorage.setItem("library-user-token", "")
    setLoggedIn(false)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {loggedIn && <button onClick={() => setPage("add")}>add book</button>}
        {!loggedIn && <button onClick={() => setPage("login")}>login</button>}

        {loggedIn && <button onClick={logOut}>logout</button>}
      </div>

      {notify && <h3>{notify}</h3>}
      <LoginForm
        setLoggedIn={setLoggedIn}
        show={page === "login"}
        setPage={setPage}
        setError={setNotify}
      />
      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook setError={setNotify} show={page === "add"} />
    </div>
  )
}

export default App
