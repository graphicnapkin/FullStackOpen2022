import React from "react"

const Author = ({
  author: { name, born, bookCount },
  showBooks,
}: {
  author: AuthorType
  showBooks: () => void
}) => {
  return (
    <tr key={name}>
      <td>{name}</td>
      <td>{born}</td>
      <td>{bookCount}</td>
      <td>
        <button onClick={showBooks}>show books</button>
      </td>
    </tr>
  )
}

export type AuthorType = {
  name: string
  born?: number
  bookCount: number
  id: string
}

export default Author
