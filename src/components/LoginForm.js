import React from 'react'

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
export default LoginForm