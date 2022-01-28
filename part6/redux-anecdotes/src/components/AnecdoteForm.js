import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.newNote.value
    event.target.newNote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input type="text" name="newNote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm