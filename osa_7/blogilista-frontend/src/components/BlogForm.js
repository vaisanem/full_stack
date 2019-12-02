import React from 'react'
import blogService from '../services/blogs'
import useField from '../hooks/index'
import { add as addBlog } from '../reducers/blogReducer'

const BlogForm = ({ store, showInfo }) => {
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
      store.dispatch(addBlog(blog))
      title.reset()
      author.reset()
      url.reset()
      likes.reset()
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
        <input {... {...title, ...{reset: null}}}/>
        <br/>
        Julkaisija
        <input {... {...author, ...{reset: null}}}/>
        <br/>
        URL
        <input {... {...url, ...{reset: null}}}/>
        <br/>
        Tykkäykset
        <input {... {...likes, ...{reset: null}}}/>
        <br/>
        <button type='submit'>lisää blogi</button>
      </form>
    </div>
  )

}

export default BlogForm