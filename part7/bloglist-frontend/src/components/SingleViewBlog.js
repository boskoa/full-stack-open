import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Comments from './Comments'
import { Card, CardContent, Button } from '@material-ui/core'

const SingleViewBlog = ({
  blogs,
  user,
  handleLikes,
  handleBlogRemove,
  handleComments
}) => {
  const navigate = useNavigate()
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  if (!blog) {
    return null
  }

  const handleUpdateLikes = () => {
    const updatedObject = { ...blog, likes: blog.likes + 1 }
    handleLikes(updatedObject)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleBlogRemove(blog)
    }
    navigate('/blogs')
  }

  let userCondition = false
  if (user.username === blog.user.username) {
    userCondition = true
  }

  return(
    <Card elevation={0} style={{ backgroundColor: 'transparent' }}>
      <div className="long detailed">
        <Card style={{ backgroundColor: 'lightgreen', margin: '1em' }}>
          <CardContent>
            <div>
              {blog.title}
            </div>
            <div>{blog.url}</div>
            <div>
              <span>Likes: </span>
              <span className="likesNum" style={{ marginRight: '1em' }}>{blog.likes}</span>
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
        </Card>
      </div>
      <Comments blog={blog} handleComments={handleComments} />
    </Card>
  )
}

export default SingleViewBlog
