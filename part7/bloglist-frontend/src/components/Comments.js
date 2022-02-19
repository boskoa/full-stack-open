import { Card,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Button
} from '@material-ui/core'
import { ListItemButton } from '@mui/material'
import React from 'react'

const Comments = ({ blog, handleComments }) => {
  const handleCommentSubmit = (event) => {
    event.preventDefault()
    if (event.target.comment.value === '') {
      return null
    }
    const commentedBlog = {
      ...blog, comments: blog.comments.concat(event.target.comment.value)
    }
    handleComments(commentedBlog)
    event.target.comment.value = ''
  }

  return (
    <div>
      <form
        onSubmit={handleCommentSubmit}
        style={{
          display: 'flex',
          margin: '1em',
          padding: '1em',
          backgroundColor: 'lightgreen',
          borderRadius: '5px',
          alignItems: 'center'
        }}>
        <TextField
          label="Enter new comment"
          color="secondary"
          type="text"
          name="comment"
          style={{ maxHeight: '80%' }}
        />
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          style={{ maxHeight: '30px', maxWidth: '40px' }}
          type="submit">add</Button>
      </form>
      <Card style={{ backgroundColor: 'lightgreen', margin: '1em' }}>
        <Typography variant="h6" style={{ margin: '1em' }}>Comments</Typography>
        <List>
          {blog && blog.comments.map(comment => {
            return (
              <ListItem key={Math.floor(Math.random() * 100000)}>
                <ListItemButton>
                  <ListItemText primary={comment} />
                </ListItemButton>
              </ListItem>)})}
        </List>
      </Card>
    </div>
  )
}

export default Comments