import React from 'react'

const Notification = ({
  notification,
}) => {
  const { message, type } = notification

  return message === null ?
    null :
    (
      <div className={`notification ${type}`}>
        <p>{message}</p>
      </div>
    )
}

export default Notification
