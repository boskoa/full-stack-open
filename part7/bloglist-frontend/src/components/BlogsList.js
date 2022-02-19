import { List, ListItem, ListItemText } from '@material-ui/core'
import { ListItemButton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const BlogsList = ({ blogs }) => {
  return (
    <List>
      {blogs.map(blog => <ListItem key={blog.id || Math.floor(Math.random() * 1000)}>
        <ListItemButton>
          <ListItemText>
            <Link to={`/blogs/${blog.id}`} style={{ color: 'orange' }}>
              {blog.title} by {blog.author}
            </Link>
          </ListItemText>
        </ListItemButton>
      </ListItem>
      )}
    </List>
  )
}

export default BlogsList