import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'

const Newblog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewPost = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="formDiv">
      <form onSubmit={handleNewPost}
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '1em',
          padding: '1em',
          backgroundColor: 'lightgreen',
          borderRadius: '5px',
          alignItems: 'center'
        }}>
        <div>
          <TextField
            id="title"
            type="text"
            autoComplete="off"
            label="Enter title"
            color="secondary"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            id="author"
            type="text"
            autoComplete="off"
            label="Enter author"
            color="secondary"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            id="url"
            type="text"
            autoComplete="off"
            label="Enter URL"
            color="secondary"
            name="URL"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button
          id="submitBlog"
          type="submit"
          variant="outlined"
          color="primary"
          size="small"
          style={{ margin: '1em' }}
        >create</Button>
      </form>
    </div>
  )
}

Newblog.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default Newblog
