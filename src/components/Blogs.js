import React from 'react'

import Blog from './Blog'

const Blogs = ({blogs, handleLike}) => (

  blogs
    .sort( (a, b) => b.likes - a.likes )
    .map( (blog) => (
      <Blog
        blog={blog}
        handleLike={() => handleLike(blog.id)}
        key={blog.id}
      />
    ))
)

export default Blogs
