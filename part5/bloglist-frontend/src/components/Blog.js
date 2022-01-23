import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLikes, handleBlogRemove }) => {
  const [detail, setDetail] = useState(false)

  const toggleDetail = () => {
    setDetail(!detail)
  }

  const handleUpdateLikes = () => {
    const updatedObject = { ...blog, likes: blog.likes + 1 }
    handleLikes(updatedObject)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleBlogRemove(blog)
    }
  }

  let userCondition = false
  if (user === undefined) {
    userCondition = false
  } else {
    userCondition = user.username === blog.user.username
  }

  return(
    <div>
      {detail
        ? <div className="box">
          <div>
            {blog.title}
            <input id="boxButton" type="button" value="hide" onClick={toggleDetail} />
          </div>
          <div>{blog.url}</div>
          <div>
              Likes: {blog.likes}
            <input type="button" value="like" onClick={handleUpdateLikes} />
          </div>
          <div>{blog.author}</div>
          {userCondition &&
              <button onClick={handleRemove}>remove</button>
          }
        </div>
        : <div className="box">
          {blog.title}, by {blog.author}
          <input id="boxButton" type="button" value="show" onClick={toggleDetail} />
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleBlogRemove: PropTypes.func.isRequired
}

export default Blog