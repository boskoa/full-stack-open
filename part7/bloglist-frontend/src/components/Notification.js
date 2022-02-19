import { Alert } from '@mui/material'
import React from 'react'

const Notification = ({ notification }) => {
  if (notification.text === '') {
    return null
  }

  if (notification.style === 'note') {
    return (
      <Alert
        className={notification.style}
        style={{ marginBottom: '20px' }}
        severity='success'>{notification.text}</Alert>
    )
  }

  return <Alert
    className={notification.syle}
    style={{ marginBottom: '20px' }}
    severity='error'>{notification.text}</Alert>
}

export default Notification
