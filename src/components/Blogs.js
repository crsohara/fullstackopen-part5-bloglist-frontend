import React from 'react'

import Blog from './Blog'

const Blogs = ({blogs, handleLike}) => (
  blogs.map( (blog) => (
    <Blog
      blog={blog}
      handleLike={() => handleLike(blog.id)}
      key={blog.id}
    />
  ))
)

export default Blogs
