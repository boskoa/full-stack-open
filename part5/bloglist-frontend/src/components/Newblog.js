import React, { useState } from 'react'

const Newblog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewPost = event => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={handleNewPost}>
        <div>
          Title
          <input 
            type="text" 
            autoComplete="off" 
            name="Title" 
            value={title} 
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input 
            type="text" 
            autoComplete="off" 
            name="Author" 
            value={author} 
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL
          <input 
            type="text" 
            autoComplete="off" 
            name="URL" 
            value={url} 
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <input type="submit" value="create" />
      </form>
    </div>
  )
}

export default Newblog