import React from 'react'

const Comments = ({ blog, handleComments }) => {
  const handleCommentSubmit = (event) => {
    event.preventDefault()
    console.log('EVENT', blog, event.target.comment.value)
    const commentedBlog = {
      ...blog, comments: blog.comments.concat(event.target.comment.value)
    }
    console.log('COMMENTED', commentedBlog)
    handleComments(commentedBlog)
    event.target.comment.value = ''
  }

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <input type="text" name="comment" />
        <button type="submit">add comment</button>
      </form>
      {blog && blog.comments.map(comment => <p key={Math.floor(Math.random() * 100000)}>
        {comment}
      </p>)}
    </div>
  )
}

export default Comments