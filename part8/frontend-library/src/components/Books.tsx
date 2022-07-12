import { ALL_BOOKS } from "../services/index"
import Book, { BookType } from "./Book"
import { useQuery } from "@apollo/client"

const Books = ({ show }: { show: boolean }) => {
  const result = useQuery(ALL_BOOKS, { pollInterval: 5000 })

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result?.data?.allBooks as BookType[]

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
    </div>
  )
}

export default Books
