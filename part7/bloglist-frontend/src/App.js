import React, { useEffect, useRef } from 'react'
import Login from './components/Login'
import Newblog from './components/Newblog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { createBlog, deleteBlog, initBlogs, likeBlog, commentBlog } from './reducers/blogReducer'
import { loginUser, logoutUser, alreadyLogged } from './reducers/userReducer'
import Users from './components/Users'
import { initUsers } from './reducers/usersReducer'
import { Link, Routes, Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import User from './components/User'
import SingleViewBlog from './components/SingleViewBlog'
import BlogsList from './components/BlogsList'
import { Container } from 'react-bootstrap'

const App = () => {
  const notification = useSelector(state => state.notification)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(alreadyLogged(user))
      blogService.setToken(user.token)
    }
  }, [])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  // Ne hvata izuzetke... Dodati async, pa i await ako neće i dalje
  const handleLogin = async (userObject) => {
    try {
      await dispatch(loginUser(userObject))
    } catch (exception) {
      dispatch(createNotification({ text: 'Wrong username or password', style: 'error' }))
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleNewBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      await dispatch(createBlog(newBlog))
      dispatch(createNotification({
        text: `A new blog "${newBlog.title}" by ${newBlog.author} added.`,
        style: 'note',
      }))
    } catch (exception) {
      dispatch(createNotification({ text: `${exception}`, style: 'error' }))
    }
  }

  const handleLikes = async (updatedBlog) => {
    try {
      await dispatch(likeBlog(updatedBlog))
    } catch (exception) {
      dispatch(createNotification({ text: `${exception}`, style: 'error' }))
    }
  }

  const handleComments = async (commentedBlog) => {
    try {
      await dispatch(commentBlog(commentedBlog))
    } catch (exception) {
      dispatch(createNotification({ text: `${exception}`, style: 'error' }))
    }
  }

  const handleBlogRemove = async (deletedObject) => {
    try {
      await dispatch(deleteBlog(deletedObject))
      dispatch(createNotification({
        text: `Blog "${deletedObject.title}" by ${deletedObject.author} removed.`,
        style: 'note',
      }))
    } catch (exception) {
      dispatch(createNotification({ text: `${exception}`, style: 'error' }))
    }
  }

  return (
    <div id="mainContainer">
      <Container fluid>
        <div>
          <Link to="/">Home</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/users">Users</Link>
          {user ? (
            <span>
              {user.name} is logged in
              <input
                id="logout"
                type="button"
                value="log out"
                onClick={handleLogout}
              />
            </span>
          ) : (
            <span>
              <Togglable buttonLabel="log in">
                <Login handleLogin={handleLogin} />
              </Togglable>
            </span>
          )}
        </div>
        <h2>Blog app</h2>
        <Notification notification={notification} />
        {user && (
          <div>
            <Togglable buttonLabel="create" ref={blogFormRef}>
              <Newblog createBlog={handleNewBlog} />
            </Togglable>
          </div>
        )}
        <Routes>
          <Route path="/users/:id" element={<User users={users} />} />
          <Route path="/blogs/:id" element={<SingleViewBlog
            blogs={blogs}
            user={user}
            handleLikes={handleLikes}
            handleBlogRemove={handleBlogRemove}
            handleComments={handleComments} />}
          />
          <Route path="/blogs" element={<BlogsList blogs={blogs} />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/" element={<Blogs
            blogs={blogs}
            user={user}
            handleLikes={handleLikes}
            handleBlogRemove={handleBlogRemove} />}
          />
        </Routes>
      </Container>
    </div>
  )
}

export default App
