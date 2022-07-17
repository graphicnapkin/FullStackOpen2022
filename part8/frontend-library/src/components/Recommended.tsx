import { useQuery } from "@apollo/client"
import { USER, ALL_BOOKS } from "../services"
import Book, { BookType } from "./Book"

const Recommended = ({ show }: { show: boolean }) => {
  const userResult = useQuery(USER)
  const booksResult = useQuery(ALL_BOOKS)

  if (!show) return null

  if (userResult.data && booksResult.data) {
    return (
      <div>
        <h2>recommendations</h2>
        <div>
          books in your favorite genre{" "}
          <b>{userResult.data.me.favouriteGenre}</b>
        </div>
        <br />
        <table>
          <tbody>
            {booksResult.data.allBooks
              .filter((b: BookType) =>
                b.genres.includes(userResult.data.me.favouriteGenre)
              )
              .map((b: BookType) => (
                <Book key={b.id} book={b} />
              ))}
          </tbody>
        </table>
      </div>
    )
  }
  return null
}

export default Recommended
