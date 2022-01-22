import React, { useState } from 'react'

const Blog = ({ blog, handleLikes }) => {
  const [detail, setDetail] = useState(false)

  const toggleDetail = () => {
    setDetail(!detail)
  }

  const handleUpdateLikes = event => {
    event.preventDefault()
    const updatedObject = {...blog, likes: blog.likes + 1}
    handleLikes(updatedObject)
  }

  return(
    <div className="box">
      {detail
        ? <div>
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
          </div>
        : <div>
            {blog.title}, by {blog.author}
            <input id="boxButton" type="button" value="show" onClick={toggleDetail} />
          </div>
      }
    </div>
  )
}

export default Blog