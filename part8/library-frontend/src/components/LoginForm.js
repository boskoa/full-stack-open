import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN, ME } from "../queries"

const LoginForm = ({ setToken, setPage, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
    refetchQueries: [{ query: ME }]
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) //eslint-disable-line

  if (!show) {
    return <div />
  }

  const submit = async (event) => {
    event.preventDefault()

    login({
      variables: { username, password }
    })

    setPage('authors')
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={submit}>
        <div>
          username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )
}

export default LoginForm