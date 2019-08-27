import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ info, setInfo ] = useState(null)
  const [ user, setUser ] = useState(null)

  const showInfo = (info) => {
    setInfo(info)
    setTimeout(() => {
      setInfo(null)
    }, 5000)
  }

  const infoSection = () => {
    const style = {
      border: '3px solid #888888'
    }

    if (!info) return <></>

    return (
      <div style={style}>
        <p>{info}</p>
      </div>
    )
  }

  const compare = (a, b) => {
    return b.likes - a.likes
  }

  const logout = () => {
    const listener = () => {
      window.localStorage.removeItem('loggedUser')
      setUser(null)
      blogService.setToken(null)
    }

    return (
      <button type='submit' onClick={listener}>kirjaudu ulos</button>
    )
  }

  const like = async (blog) => {
    const attributes = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    }
    try {
      let updated = await blogService.update(attributes)
      updated = [].concat(blogs)
      updated = updated.map(one => {
        if (one.id === blog.id) one.likes++
        return one
      })
      setBlogs(updated)
    } catch(error) {
      showInfo(error.message)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    setUser(JSON.parse(window.localStorage.getItem('loggedUser')))
  }, [])

  if (!user) {
    return (
      <div>
        <h2>blogilista</h2>
        {infoSection()}
        <Login setUser={setUser} showInfo={showInfo} />
      </div>
    )
  }

  blogService.setToken(user.token)

  return (
    <div>
      <h2>blogilista</h2>
      {infoSection()}
      <p>{user.username} kirjautuneena</p>
      {logout()}
      <Togglable init={false} label={'lisää blogi'}>
        <BlogForm user={user} blogs={blogs} setBlogs={setBlogs} showInfo={showInfo} />
      </Togglable>
      <h2>lista blogeista</h2>
      {[].concat(blogs).sort(compare).map(blog =>
        <Blog key={blog.id} blog={blog} like={like} />
      )}
    </div>
  )
}

export default App