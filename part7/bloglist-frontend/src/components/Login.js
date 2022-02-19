import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core'
import LoginIcon from '@mui/icons-material/Login'

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: '40em', marginBottom: '0.5em' }}
    >
      <TextField
        id="username"
        type="text"
        name="Username"
        autoFocus
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        label="Enter username"
        color="secondary"
        inputProps={{ style: { color: 'white' } }}
        InputLabelProps={{ style: { color: 'white' } }}
      />
      <span> </span>
      <TextField
        id="password"
        type="password"
        name="Password"
        autoComplete="off"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        label="Enter password"
        color="secondary"
        inputProps={{ style: { color: 'white' } }}
        InputLabelProps={{ style: { color: 'white' } }}
      />
      <Button
        id="login"
        type="submit"
        color="secondary"
        size="small"
        style={{ marginTop: '0.8em' }}
      ><LoginIcon /></Button>
    </form>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default Login
