import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  onUsernameChange,
  password,
  onPasswordChange,
  handleSubmit
}) => (

  <form onSubmit={handleSubmit}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={onUsernameChange}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={onPasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm
