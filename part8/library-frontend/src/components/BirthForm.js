import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const BirthForm = (props) => {
  const [ editAuthor ] = useMutation(EDIT_AUTHOR)
  const authors = useQuery(ALL_AUTHORS)

  if (authors.loading) {
    return <div>Loading...</div>
  }

  if (!props.show) {
    return null
  }

  const updateBirthyear = async (event) => {
    event.preventDefault()
    const name = event.target.name.value
    const setBornTo = parseInt(event.target.born.value)

    editAuthor({
      variables: { name, setBornTo },
      refetchQueries: [ { query: ALL_AUTHORS } ]
    })

    event.target.name.value = ''
    event.target.born.value = ''
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={updateBirthyear}>
        <div>
          name
          <select name="name">
            {authors.data.allAuthors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
          </select>
        </div>
        <div>
          born<input type="text" name="born" />
        </div>
        <div>
          <button>update author</button>
        </div>
      </form>
    </div>
  )
}

export default BirthForm