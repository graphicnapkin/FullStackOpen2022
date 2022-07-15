import React, { FormEvent, useState } from "react"
import { ALL_AUTHORS, FIND_AUTHOR, EDIT_AUTHOR } from "../services/index"
import { useQuery, useMutation } from "@apollo/client"
import Book, { BookType } from "./Book"

import Author, { AuthorType } from "./Author"

const Authors = ({ show }: { show: boolean }) => {
  const [nameToSearch, setNameToSearch] = useState<string | null>(null)
  const result = useQuery(ALL_AUTHORS)
  const authorResult = useQuery(FIND_AUTHOR, {
    variables: { nameToSearch },
    skip: !nameToSearch,
    pollInterval: 5000,
  })
  const [name, setName] = useState("")
  const [born, setBorn] = useState<number | null>(null)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const handleBornSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    editAuthor({ variables: { name, born } })
    setBorn(null)
    setName("")
  }

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result?.data?.allAuthors as AuthorType[]

  if (nameToSearch && authorResult.data) {
    const author = authorResult.data.findAuthor as AuthorType
    const authorsBooks = authorResult.data.findAuthor.books as BookType[]
    return (
      <>
        <h2>{author.name}'s Books</h2>
        <table>
          <tbody>
            {authorsBooks.map((b) => (
              <Book
                book={{ ...b, author: authorResult.data.findAuthor }}
                key={b.id}
              />
            ))}
          </tbody>
        </table>
        <button onClick={() => setNameToSearch(null)}>close</button>
      </>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
            <th></th>
          </tr>
          {authors.map((a) => (
            <React.Fragment key={a.id}>
              <Author author={a} showBooks={() => setNameToSearch(a.name)} />
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <h2>Set BirthYear</h2>
      <form onSubmit={handleBornSubmit}>
        name
        <select value={name} onChange={(e) => setName(e.target.value)}>
          <option key={"0"} value={"select"}>
            select
          </option>
          {authors.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <br />
        born
        <input
          value={born || ""}
          onChange={(e) => setBorn(parseInt(e.target.value))}
        />
        <br />
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
