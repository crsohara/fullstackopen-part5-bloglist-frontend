import React, { useState, useEffect } from 'react'

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
    const userJSON = window.localStorage.getItem(LOCALSTORAGE_APP_USER)
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
      const user = await loginService.login({ username, password })
      setUser(user)
      blogsService.setToken(user.token)
      setUsername('')
      setPassword('')
      triggerNotification(`Login success for ${user.username}`, 'success')
      window.localStorage.setItem( LOCALSTORAGE_APP_USER, JSON.stringify(user))
    } catch(error) {
      triggerNotification(`${error.response.data}`, 'error')
    }
  }

  const triggerNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {setNotification({ message: null, type: null })}, 5000)
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogsService.create(blog)
      setBlogs(blogs.concat(newBlog))
      triggerNotification(`new blog ${blog.title} added!`, 'success')
    } catch(error) {
      triggerNotification(`${error}`, 'error')
    }
  }

  const handleNewUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handleNewpasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleDelete = async (blog) => {
    if ( !window.confirm(`Delete blog '${blog.title}' by ${blog.user.name}?`) ) {
      return
    }

    try {
      await blogsService.remove(blog.id)
      const newBlogs = blogs.filter( item => item.id !== blog.id )
      setBlogs(newBlogs)
      triggerNotification('Blog removed!', 'success')
    } catch(error) {
      triggerNotification(error.toString(), 'error')
    }
  }

  const handleLike = async (id) => {
    const blog = blogs.find( (blog) => blog.id === id )
    const updatedBlog = {
      ...blog,
      likes: blog.likes += 1,
      user: blog.user.id
    }

    try {
      const response = await blogsService.update(id, updatedBlog)
      setBlogs(blogs.map( blog => blog.id !== id ? blog : response))
      triggerNotification(`Blog '${blog.title}' liked!`, 'success')
    } catch(error) {
      triggerNotification(`${error}`, 'error')
    }
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
        handleLike={handleLike}
        handleDelete={handleDelete}
        user={user}
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

export default App
