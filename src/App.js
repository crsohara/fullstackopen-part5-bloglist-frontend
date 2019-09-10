import React, { useState, useEffect } from 'react';

import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

import loginService from './services/login'
import blogsService from './services/blogs'


const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogsService.getAll().then( (initialBlogs) => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBloglistAppUser');
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      console.log('user session restored')
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in', username, password)
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('success!')
      window.localStorage.setItem( 'loggedBloglistAppUser', JSON.stringify(user));
    } catch(e) {
      console.error('error', e)
    }
  }

  const handleNewUsernameChange = ({target}) => {
    setUsername(target.value)
  }

  const handleNewpasswordChange = ({target}) => {
    setPassword(target.value)
  }

  const showLoggedInView = () => (
    <div>
      <h1>Blogs</h1>
      <p>{user.name} logged in </p>
      <Blogs
        blogs={blogs}
      />
    </div>
  )

  const showLoggedOutView = () => (
    <div>
      <h1>Log in to application</h1>

      <LoginForm
        username={username}
        password={password}
        onUsernameChange={handleNewUsernameChange}
        onPasswordChange={handleNewpasswordChange}
        handleSubmit={handleLogin}
      />
    </div>
  )

  return (
    <div>


      { user === null ?
        showLoggedOutView() :
        showLoggedInView() }

    </div>
  )
}

export default App;
