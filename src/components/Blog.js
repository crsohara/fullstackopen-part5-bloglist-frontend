import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft: 2
  }

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  const showMore = { display: visible ? '' : 'none' }
  const removeButton = blog.user.username === user.username && (<button onClick={handleDelete}>Remove</button>)

  return (
    <div style={blogStyle}>

      <div onClick={toggleVisiblity}>
        {blog.title} {blog.author}
      </div>

      <div style={showMore}>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>{blog.likes} like{blog.likes === 1 ? '' : 's'} <button onClick={handleLike}>Like!</button></p>
        <p>Added by {blog.user.name}</p>
        {removeButton}
      </div>


    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog
