import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Card, CardContent, CardActions } from '@material-ui/core'

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

  if (!blog) {
    return null
  }

  let userCondition = false
  if (user && blog.user) {
    if (user.username === blog.user.username) {
      userCondition = true
    }
  }

  return (
    <Card>
      {detail ? (
        <div className="box long detailed">
          <CardContent>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            <div><a href="#">{blog.url}</a></div>
            <div>
              <span>Likes: </span>
              <span className="likesNum" style={{ marginRight: '1em' }}>
                {blog.likes}
              </span>
              <Button
                onClick={handleUpdateLikes}
                variant="contained"
                color="primary"
                size="small"
                style={{ maxHeight: '18px', maxWidth: '20px' }}
              >like</Button>
            </div>
            <div>{blog.author}</div>
            {userCondition && <Button
              onClick={handleRemove}
              variant="contained"
              color="primary"
              size="small"
              style={{ maxHeight: '18px', maxWidth: '20px' }}
            >remove</Button>}
          </CardContent>
          <CardActions>
            <Button
              className="boxButton"
              onClick={toggleDetail}
              color="primary"
              size="small"
            >hide</Button>
          </CardActions>
        </div>
      ) : (
        <div className="box short" style={{ minHeight: '3.5em' }}>
          <CardContent>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>, by {blog.author}
          </CardContent>
          <CardActions>
            <Button
              className="boxButton show"
              onClick={toggleDetail}
              color="primary"
              size="small"
            >show</Button>
          </CardActions>
        </div>
      )}
    </Card>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleBlogRemove: PropTypes.func.isRequired,
}

export default Blog
