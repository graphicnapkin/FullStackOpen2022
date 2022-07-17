import { useState } from "react"
import { ALL_BOOKS } from "../services/index"
import Book, { BookType } from "./Book"
import { useQuery } from "@apollo/client"

const Books = ({ show }: { show: boolean }) => {
  const [filter, setFilter] = useState<null | string>(null)
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 5000,
    variables: { genre: filter },
  })
  const genres = new Set<string>()
  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result?.data?.allBooks as BookType[]
  if (books) {
    books.forEach((b) => b.genres && b.genres.forEach((g) => genres.add(g)))
  }
  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr style={{ textAlign: "left" }}>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <Book book={b} key={b.id} />
          ))}
        </tbody>
      </table>
      {genres &&
        [...genres].map((g) => (
          <button onClick={() => setFilter(g)} key={g}>
            {g}
          </button>
        ))}
      {filter && <button onClick={() => setFilter(null)}>clear</button>}
    </div>
  )
}

export default Books
