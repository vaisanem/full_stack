import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, showInfo }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ likes, setLikes ] = useState('')
  const [ visible, setVisible ] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    const attributes = {
      title: title,
      author: author,
      url: url,
      likes: likes
    }

    try {
      const blog = await blogService.create(attributes)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes('')
      showInfo(`uusi blogi ${blog.title} lisätty`)
    } catch(error) {
      showInfo('blogisi sisältää arvojemme vastaista sisältöä')
    }
  }

  const input = (field, listener) => {

    return (
      <input
        type='text'
        value={field}
        onChange={({ target }) => listener(target.value)}
      />
    )
  }

  const visibility = (option) => {
    setVisible(option)
  }

  if (!visible) {

    return (
      <div>
        <form onSubmit={() => visibility(true)}>
          <button type='submit'>lisää blogi</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>lisää blogi</h2>
      <form onSubmit={onSubmit}>
        Nimi
        {input(title, setTitle)}
        <br/>
        Julkaisija
        {input(author, setAuthor)}
        <br/>
        URL
        {input(url, setUrl)}
        <br/>
        Tykkäykset
        {input(likes, setLikes)}
        <br/>
        <button type='submit'>lisää blogi</button>
      </form>
      <form onSubmit={() => visibility(false)}>
        <button type='submit'>peruuta</button>
      </form>
    </div>
  )

}

export default BlogForm