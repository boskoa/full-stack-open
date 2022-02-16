import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Comments from './Comments'

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
    <div>
      <div className="box long detailed">
        <div>
          {blog.title}
        </div>
        <div>{blog.url}</div>
        <div>
        Likes: <span className="likesNum">{blog.likes}</span>
          <button onClick={handleUpdateLikes}>like</button>
        </div>
        <div>{blog.author}</div>
        {userCondition && <button onClick={handleRemove}>remove</button>}
      </div>
      <Comments blog={blog} handleComments={handleComments} />
    </div>
  )
}

export default SingleViewBlog
