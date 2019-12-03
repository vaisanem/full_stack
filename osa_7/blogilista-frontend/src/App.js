import React from 'react'
import { BrowserRouter as Router,
  Link, Redirect, Route } from 'react-router-dom'
import { groupBy } from 'lodash'

import Blog from './components/Blog'
import Login from './components/Login'
import InfoSection from './components/InfoSection'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { setInfo, resetInfo } from './reducers/infoReducer'
import { voteBlog, removeBlog } from './reducers/blogReducer'

const App = ({ store }) => {

  const showInfo = (info) => {
    store.dispatch(setInfo(info))
    setTimeout(() => {
      store.dispatch(resetInfo())
    }, 5000)
  }

  const compare = (a, b) => {
    return b.likes - a.likes
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

  const blogsGroupedByUser = groupBy(store.getState().blogs, 'user.name')

  return (
    <Router>
      <div>
        <h2>blogilista</h2>
        <InfoSection store={store} />
        <Login store={store} showInfo={showInfo} />
        <Route exact path='/' render={() => (
          <div>
            <Togglable init={false} label={'lisää blogi'}>
              <BlogForm store={store} showInfo={showInfo} />
            </Togglable>
            <div>
              <h2>lista blogeista</h2>
              {[].concat(store.getState().blogs).sort(compare).map(blog =>
                <Blog key={blog.id} blog={blog} user={store.getState().user}
                  like={like} remove={remove} />
              )}
            </div>
          </div>
        )} />
        <Route path='/users' render={() => (
          <div>
            <h2>käyttäjät</h2>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>blogeja</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(blogsGroupedByUser).map(one =>
                  <tr key={one}>
                    <td>{one}</td>
                    <td>{blogsGroupedByUser[one].length}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )} />
      </div>
    </Router>
  )
}

export default App