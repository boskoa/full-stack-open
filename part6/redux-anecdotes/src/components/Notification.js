import { useSelector } from 'react-redux'
import React from 'react'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const notificationCondition = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div>
      {notificationCondition &&
        <div style={style}>
          {notification}
        </div>
      }
    </div>
  )
}

export default Notification