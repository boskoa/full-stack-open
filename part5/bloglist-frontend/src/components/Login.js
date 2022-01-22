import React, { useState } from 'react'

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input 
        type="text" 
          name="Username" 
          autoFocus 
          value={username} 
          onChange={({ target }) => setUsername(target.value)} 
        />
      </div>
      <div>
        password
        <input 
          type="text" 
          name="Password" 
          autoComplete="off" 
          value={password} 
          onChange={({ target }) => setPassword(target.value)} 
        />
      </div>
      <input type="submit" value="login" />
    </form>
  )
}

export default Login