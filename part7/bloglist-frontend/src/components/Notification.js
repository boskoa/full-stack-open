import React from 'react'

const Notification = ({ notification }) => {
  return (
    <div>
      <p className={notification.style}>{notification.text}</p>
    </div>
  )
}

export default Notification
