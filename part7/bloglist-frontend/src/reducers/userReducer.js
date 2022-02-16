import loginService from '../services/login'
import blogsService from '../services/blogs'

const userReducer = (state = '', action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data.user
  case 'LOGOUT':
    return ''
  case 'LOGGED':
    return action.data.user
  default:
    return state
  }
}

export const loginUser = (userObject) => {
  return async dispatch => {
    const user = await loginService.login(userObject)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogsService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: { user }
    })
  }
}


export const logoutUser = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return {
    type: 'LOGOUT'
  }
}

export const alreadyLogged = (user) => {
  return {
    type: 'LOGGED',
    data: { user }
  }
}

export default userReducer