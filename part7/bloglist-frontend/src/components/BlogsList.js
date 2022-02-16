import React from 'react'
import { Link } from 'react-router-dom'

const BlogsList = ({ blogs }) => {
  return (
    <div>
      {blogs.map(blog => <p key={blog.id || Math.floor(Math.random() * 1000)}>
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
      </p>
      )}
    </div>
  )
}

export default BlogsList