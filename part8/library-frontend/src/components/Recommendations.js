import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, ME } from "../queries"

const Recommendations = ({ show }) => {
  const currentUser = useQuery(ME, {
    fetchPolicy: 'no-cache',
  })
  const [user, setUser] = useState({})
  const [recommendedBooks, resultBooks] = useLazyQuery(ALL_BOOKS)
  const [booksToRecommend, setBooksToRecommend] = useState([])

  useEffect(() => {
    if (currentUser.data && currentUser.data.me) {
      setUser(currentUser.data.me)
    }
  }, [currentUser])

  useEffect(() => {
    if (user) {
      recommendedBooks({ variables: { genre: user.favouriteGenre } })
    }
  }, [user, recommendedBooks])

  useEffect(() => {
    if (resultBooks.data) {
      setBooksToRecommend(resultBooks.data.allBooks)
    }
  }, [resultBooks])

  if (!show) {
    return null
  }

  if(currentUser.loading) {
    return <div>User loading...</div>
  }

  return(
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre {currentUser.data.me.favouriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToRecommend.map((a) => (
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