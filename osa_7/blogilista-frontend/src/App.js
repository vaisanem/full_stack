import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { set as setInfo, reset as resetInfo } from './reducers/infoReducer'
import { init as initBlogs, vote as voteBlog, remove as removeBlog } from './reducers/blogReducer'

const App = ({ store }) => {
  const [ user, setUser ] = useState(null)

  const showInfo = (info) => {
    store.dispatch(setInfo(info))
    setTimeout(() => {
      store.dispatch(resetInfo())
    }, 5000)
  }

  const infoSection = () => {
    const style = {
      border: '3px solid #888888'
    }

    if (!store.getState().info) return <></>

    return (
      <div style={style}>
        <p>{store.getState().info}</p>
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
      await blogService.update(attributes)
      store.dispatch(voteBlog(blog.id))
    } catch(error) {
      showInfo(error.message)
    }
  }

  const remove = async (blog) => {
    const confirm = window.confirm(
      'Poistetaanko '.concat(blog.title, ', ',  blog.author,'?')
    )
    if (!confirm) return
    try {
      await blogService.remove(blog.id)
      store.dispatch(removeBlog(blog.id))
    } catch(error) {
      showInfo(error.message)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      store.dispatch(initBlogs(blogs))
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
        <BlogForm user={user} store={store} showInfo={showInfo} />
      </Togglable>
      <h2>lista blogeista</h2>
      {[].concat(store.getState().blogs).sort(compare).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} like={like} remove={remove} />
      )}
    </div>
  )
}

export default App