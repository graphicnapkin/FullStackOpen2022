import { AuthorType } from "./Author"

const Book = ({ book: { title, author, published } }: { book: BookType }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{author.name}</td>
      <td>{published}</td>
    </tr>
  )
}

export type BookType = {
  title: string
  id: string
  author: AuthorType
  published?: number
  genres: string[]
}

export default Book
