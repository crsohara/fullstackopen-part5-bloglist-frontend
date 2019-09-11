import React, { useState, useEffect } from 'react';

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import loginService from './services/login'
import blogsService from './services/blogs'


const App = () => {
  const LOCALSTORAGE_APP_USER = 'loggedBloglistAppUser'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await blogsService.getAll()
        setBlogs(response)

      } catch(error) {
        triggerNotification(error.response.data, 'error')
      }
    }
    getAllBlogs()
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem(LOCALSTORAGE_APP_USER);
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogsService.setToken(user.token)
      triggerNotification(`Login success for ${user.username}`, 'success')
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      setUser(user)
      blogsService.setToken(user.token)
      setUsername('')
      setPassword('')
      triggerNotification(`Login success for ${user.username}`, 'success')
      window.localStorage.setItem( LOCALSTORAGE_APP_USER, JSON.stringify(user));
    } catch(error) {
      triggerNotification(`${error.response.data}`, 'error')
    }
  }

  const triggerNotification = (message, type) => {
    setNotification({message, type})
    setTimeout(() => {setNotification({ message: null, type: null })}, 5000)
  }

  const createBlog = async (blog) => {
    try {
      const response = await blogsService.create(blog)
      setBlogs(blogs.concat(blog))
      triggerNotification(`new blog ${blog.title} added!`, 'success')
    } catch(error) {
      triggerNotification(`${error}`, 'error')
    }
  }

  const handleNewUsernameChange = ({target}) => {
    setUsername(target.value)
  }

  const handleNewpasswordChange = ({target}) => {
    setPassword(target.value)
  }

  const handleLogout = () => {
    window.localStorage.removeItem(LOCALSTORAGE_APP_USER)
    setUser(null)
    triggerNotification('User logged out!', 'success')
  }

  const showLoggedInView = () => (
    <div>
      <h1>Blogs</h1>
      <p>
        <span>{user.name} logged in </span>
        <button onClick={handleLogout}>Logout</button>
      </p>


      <Blogs
        blogs={blogs}
      />

      <Togglable>
        <BlogForm
          onSubmit={createBlog}
        />
      </Togglable>

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

      <Notification
        notification={notification}
      />

      { user === null ?
        showLoggedOutView() :
        showLoggedInView() }

    </div>
  )
}

export default App;
