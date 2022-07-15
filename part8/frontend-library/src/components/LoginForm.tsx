import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../services"

const LoginForm = ({
  setError,
  setPage,
  setLoggedIn,
  show,
}: {
  setError: React.Dispatch<React.SetStateAction<string>>
  setPage: React.Dispatch<React.SetStateAction<string>>
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  show: boolean
}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => setError(error.graphQLErrors[0].message),
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      localStorage.setItem("library-user-token", token)
      setPage("authors")
    }
  }, [result.data]) // eslint-disable-line

  if (!show) return null

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const res = await login({ variables: { username, password } })
    if (res.data) setLoggedIn(true)
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
