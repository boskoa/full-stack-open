import { useLazyQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = (props) => {
  const [getMe, me] = useLazyQuery(ME, {
    fetchPolicy: 'cache-first',
  })
  const [getResultBooks, resultBooks] = useLazyQuery(ALL_BOOKS)
  const [currentUser, setCurrentUser] = useState(null)
  const [favouriteGenre, setFavouriteGenre] = useState(null)

  useEffect(() => {
    if (props.show) {
      getMe()
    }
  }, [getMe, props.show])

  useEffect(() => {
    if (me.data && me.data.me) {
      setCurrentUser(me.data.me)
      setFavouriteGenre(me.data.me.favouriteGenre)
      getResultBooks({ variables: { genre: me.data.me.favouriteGenre } })
    }
  }, [me.data, currentUser, getResultBooks])

  if (me.loading) {
    return <div />
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre {favouriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {resultBooks.data &&
            resultBooks.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
