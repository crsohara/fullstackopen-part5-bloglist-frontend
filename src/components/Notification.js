import React from 'react'
import PropTypes from 'prop-types'


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

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default Notification
