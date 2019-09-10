import React from 'react'

import Blog from './Blog'

const Blogs = ({blogs}) => (
  blogs.map( (blog, index) => (
    <Blog
      blog={blog}
      key={blog.title + index}
    />
  ))
)

export default Blogs