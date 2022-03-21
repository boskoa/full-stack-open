import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const getAuthors = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log('Error received:', error.message)
    },
  })

  if (!props.show) {
    return null
  }

  if (getAuthors.loading) {
    return <div>Loading authors...</div>
  }

  const authors = getAuthors.data.allAuthors

  const updateBirthyear = (event) => {
    event.preventDefault()
    const name = event.target.name.value
    const born = parseInt(event.target.born.value)

    editAuthor({
      variables: { name, born },
    })

    event.target.name.value = ''
    event.target.born.value = ''
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
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={updateBirthyear}>
          <div>
            name
            <select name="name">
              {authors.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            born
            <input type="text" name="born" />
          </div>
          <div>
            <button>update author</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Authors
