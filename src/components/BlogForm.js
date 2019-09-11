import React, {useState} from 'react'

const BlogForm = ({
  onSubmit
}) => {

  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const handleTitleChange = ({target}) => {
    setTitle(target.value)
  }

  const handleAuthoChange = ({target}) => {
    setAuthor(target.value)
  }

  const handleUrlChange = ({target}) => {
    setUrl(target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    onSubmit({title, author, url})
  }

  return (
    <form onSubmit={handleSubmit}>

    	<div>

        Title:
        <input
          type="text"
          name=""
          value={title}
          onChange={handleTitleChange}
        />

      </div>

      <div>

        Author:
        <input
          type="text"
          name=""
          value={author}
          onChange={handleAuthoChange}
        />

      </div>

      <div>

        URL:
        <input
          type="text"
          name=""
          value={url}
          onChange={handleUrlChange}
        />

      </div>

      <button type="submit">Create</button>

    </form>
  )

}

export default BlogForm
