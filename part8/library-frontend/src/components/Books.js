import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import { useState, useEffect } from 'react'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState('')
  const booksForGenres = useQuery(ALL_BOOKS)
  const client = useApolloClient()
  const getBooks = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
  })

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded

      window.alert(`New book added: ${newBook.title}`)
      const currentBooks = client.readQuery({
        query: ALL_BOOKS,
      })
      const alreadyEntered = currentBooks.allBooks
        .map((b) => b.id)
        .includes(newBook.id)

      if (!alreadyEntered) {
        client.writeQuery({
          query: ALL_BOOKS,
          variables: { genre: '' },
          data: { allBooks: currentBooks.allBooks.concat(newBook) },
        })

        for (let i = 0; i < newBook.genres.length; i++) {
          const genre = newBook.genres[i]
          const currentBooksGenred = client.readQuery({
            query: ALL_BOOKS,
            variables: { genre },
          })

          if (currentBooksGenred) {
            client.writeQuery({
              query: ALL_BOOKS,
              variables: { genre },
              data: { allBooks: currentBooksGenred.allBooks.concat(newBook) },
            })
          }
        }
      }
    },
  })

  useEffect(() => {
    if (booksForGenres.data && booksForGenres.data.allBooks) {
      const bookGenres = booksForGenres.data.allBooks.map((b) => b.genres)
      const uniqueGenres = [...new Set(bookGenres.flat(1))]
      setGenres(uniqueGenres)
    }
  }, [booksForGenres.data])

  useEffect(() => {
    if (getBooks.data && getBooks.data.allBooks) {
      setBooks(getBooks.data.allBooks)
    }
  }, [getBooks, filter])

  if (!props.show) {
    return null
  }

  if (getBooks.loading) {
    return <div>Loading books...</div>
  }

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
        {genres.map((g) => {
          return (
            <button key={g} onClick={() => setFilter(g)}>
              {g}
            </button>
          )
        })}
        <button onClick={() => setFilter('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
