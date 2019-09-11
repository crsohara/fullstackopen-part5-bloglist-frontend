import React from 'react'
import PropTypes from 'prop-types'

import Blog from './Blog'

const Blogs = ({blogs, handleLike, handleDelete, user}) => (

  blogs
    .sort( (a, b) => b.likes - a.likes )
    .map( (blog) => (
      <Blog
        blog={blog}
        handleLike={() => handleLike(blog.id)}
        handleDelete={() => handleDelete(blog)}
        key={blog.id}
        user={user}
      />
    ))
)

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blogs
