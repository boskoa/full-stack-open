import React from 'react'
import Blog from './Blog'
import { Grid } from '@material-ui/core'

const Blogs = ({ blogs, user, handleLikes, handleBlogRemove }) => {
  return(
    <Grid container spacing={5}>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Grid item xs={12} sm={6} md={4}
            key={blog.id || Math.floor(Math.random() * 1000)}>
            <Blog
              blog={blog}
              user={user}
              handleLikes={handleLikes}
              handleBlogRemove={handleBlogRemove}
            />
          </Grid>
        ))}
    </Grid>
  )
}

export default Blogs