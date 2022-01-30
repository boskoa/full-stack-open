const notificationReducer = (state=null, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

let currentNotification = 0

export const createNotification = (notification, wait=5000) => {
  return async dispatch => {
    clearTimeout(currentNotification)
    currentNotification = setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' })
    }, wait)

    dispatch({
      type: 'NEW_NOTIFICATION',
      data: notification
    })
  }
}

export default notificationReducer