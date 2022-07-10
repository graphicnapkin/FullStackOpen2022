const Books = ({ show }: { show: boolean }) => {
  if (show) {
    return null
  }

  const books = [] as Book[]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

type Book = {
  title: string
  author: string
  published?: number
  genres: string[]
}

export default Books
