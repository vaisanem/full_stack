import React from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { setInfo, resetInfo } from './reducers/infoReducer'
import { voteBlog, removeBlog } from './reducers/blogReducer'
import { resetUser} from './reducers/userReducer'

const App = ({ store }) => {

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
      store.dispatch(resetUser())
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

  const user = store.getState().user

  if (!user) {
    return (
      <div>
        <h2>blogilista</h2>
        {infoSection()}
        <Login store={store} showInfo={showInfo} />
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