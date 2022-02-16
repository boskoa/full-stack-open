import blogsService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'LIKE': {
    const id = action.data.id
    const blogToChange = state.find(b => b.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    return state.map(b => b.id !== id ? b : changedBlog)
  }
  case 'COMMENT': {
    return state.map(b => b.id !== action.data.id ? b : action.data)
  }
  case 'CREATE':
    return state.concat(action.data)
  case 'REMOVE':
    return state.filter(b => b.id !== action.data.id)
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogsService.update(blog)
    dispatch({
      type: 'LIKE',
      data: { id: blog.id }
    })
  }
}

export const commentBlog = (blog) => {
  return async dispatch => {
    await blogsService.comment(blog)
    dispatch({
      type: 'COMMENT',
      data: blog
    })
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    await blogsService.create(newBlog)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogsService.remove(blog)
    dispatch({
      type: 'REMOVE',
      data: blog
    })
  }
}

export default blogReducer