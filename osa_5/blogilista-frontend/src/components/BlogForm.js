import React from 'react'
import blogService from '../services/blogs'
import useField from '../hooks/index'

const BlogForm = ({ blogs, setBlogs, showInfo }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const likes = useField('number')

  const onSubmit = async (event) => {
    event.preventDefault()
    const attributes = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: likes.value
    }

    try {
      const blog = await blogService.create(attributes)
      setBlogs(blogs.concat(blog))
      title.onChange({ target: { value: ''}})
      author.onChange({ target: { value: ''}})
      url.onChange({ target: { value: ''}})
      likes.onChange({ target: { value: ''}})
      showInfo(`uusi blogi ${blog.title} lisätty`)
    } catch(error) {
      showInfo('blogisi sisältää arvojemme vastaista sisältöä')
    }
  }

  return (
    <div>
      <h2>lisää blogi</h2>
      <form onSubmit={onSubmit}>
        Nimi
        <input {...title}/>
        <br/>
        Julkaisija
        <input {...author}/>
        <br/>
        URL
        <input {...url}/>
        <br/>
        Tykkäykset
        <input {...likes}/>
        <br/>
        <button type='submit'>lisää blogi</button>
      </form>
    </div>
  )

}

export default BlogForm