import React, {useState} from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
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

  const showMore = {display: visible ? '' : 'none'}

  return (
    <div style={blogStyle}>

      <div onClick={toggleVisiblity}>
        {blog.title} {blog.author}
      </div>

      <div style={showMore}>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>{blog.likes} like{blog.likes === 1 ? '' : 's'} <button onClick={handleLike}>Like!</button></p>
        <p>Added by {blog.user.name}</p>
        <button onClick={handleDelete}>Remove</button>
      </div>


    </div>
  )
}

export default Blog
