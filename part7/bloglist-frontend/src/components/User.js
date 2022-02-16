import React from 'react'
import { useParams, Link } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const userFound = users.find(us => us.id === id)
  if (!userFound) {
    return null
  }

  return(
    <div>
      <h3>{userFound.name}</h3>
      {userFound.blogs.map(blog => {
        return <p key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </p>
      })}
    </div>
  )
}

export default User