import { useState } from "react"
import { ALL_BOOKS, NEW_BOOK } from "../services"
import { useMutation } from "@apollo/client"

const NewBook = ({
  show,
  setError,
}: {
  show: boolean
  setError: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [published, setPublished] = useState("")
  const [genre, setGenre] = useState("")
  const [genres, setGenres] = useState<string[]>([])

  const [createBook] = useMutation(NEW_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  if (!show) {
    return null
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const variables: { [key: string]: string | string[] } = {
      title,
      author,
      genres,
    }
    if (published) variables.published = published

    await createBook({ variables })
    setTitle("")
    setPublished("")
    setAuthor("")
    setGenres([])
    setGenre("")
  }

  const addGenre = () => {
    setGenres([...genres, genre])
    setGenre("")
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
