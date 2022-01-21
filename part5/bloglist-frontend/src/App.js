import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Newblog from './components/Newblog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({text: null, style: null})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({text: 'Wrong username or password', style: 'error'})
      setTimeout(() => {
        setMessage({text: null, style: null})
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleNewBlog = async newBlog => {
    try {
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      setMessage(
        {
          text: `A new blog "${response.title}" by ${response.author} added.`, 
          style: 'note'}
      )
      setTimeout(() => {
        setMessage({text: null, style: null})
      }, 5000)
    } catch (exception) {
      setMessage({text: `${exception}`, style: 'error'})
      setTimeout(() => {
        setMessage({text: null, style: null})
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
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

  const noteForm = () => (
    <div>
      <p>
        {user.name} is logged in
        <input type="button" value="logout" onClick={handleLogout} />
      </p>
      <Newblog createBlog={handleNewBlog} />
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div> 
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user
        ? noteForm() 
        : loginForm()
      }
    </div>
  )
}

export default App