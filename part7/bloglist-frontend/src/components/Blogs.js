import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, user, handleLikes, handleBlogRemove }) => {
  console.log('BLOGS', blogs, user)
  return(
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLikes={handleLikes}
            handleBlogRemove={handleBlogRemove}
          />
        ))}
    </div>
  )
}

export default Blogs