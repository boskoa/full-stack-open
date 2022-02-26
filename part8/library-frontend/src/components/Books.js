import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [filter, setFilter] = useState('')

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter }
  })
  const booksForGenres = useQuery(ALL_BOOKS)
  
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }
  const books = result.data.allBooks
  const bookGenres = booksForGenres.data.allBooks
  const genres = bookGenres.map(b => b.genres)
  const uniqueGenres = [...new Set(genres.flat(1))]

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
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map(g => {
          return <button key={g} onClick={() => setFilter(g)}>{g}</button>
        })}
      </div>
    </div>
  )
}

export default Books
