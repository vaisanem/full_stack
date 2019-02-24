import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
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
      <BlogForm user={user} blogs={blogs} setBlogs= {setBlogs} showInfo={showInfo} />
      <h2>lista blogeista</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App