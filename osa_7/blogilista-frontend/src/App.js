import React from 'react'
import { BrowserRouter as Router,
  Redirect, Route } from 'react-router-dom'
import { groupBy, isEmpty } from 'lodash'
import { Container } from 'semantic-ui-react'
import styled from 'styled-components'

import Blog from './components/Blog'
import Login from './components/Login'
import InfoSection from './components/InfoSection'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Nav from './components/Nav'
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

  const getUserNameByUsername = (username) => {
    return Object.values(blogsGroupedByUser)
      .map(one => one[0])
      .find(one => one.user.username === username)
      .user.name
  }

  const Background = styled.div`
    background-color: lavender;
    height: 100%;
    width: 100%;
    position: fixed
  `

  return (
    <Background>
      <Container>
        <Router>
          <div>
            <Nav store={store} />
            <h2>blogilista</h2>
            <InfoSection store={store} />
            <Route path='/login' render={() => (
              <div>
                { store.getState().user ?
                  <Redirect to='/' /> :
                  <Login store={store} showInfo={showInfo} />
                }
              </div>
            )} />
            <Route exact path='/' render={() => (
              <div>
                { store.getState().user ?
                  <Togglable init={false} label={'lisää blogi'}>
                    <BlogForm store={store} showInfo={showInfo} />
                  </Togglable> :
                  <></>
                }
                <br/>
                <div>
                  <h3>lista blogeista</h3>
                  {[].concat(store.getState().blogs).sort(compare).map(blog =>
                    <Blog key={blog.id} blog={blog} user={store.getState().user}
                      like={like} remove={remove} />
                  )}
                </div>
              </div>
            )} />
            <Route exact path='/users' render={() => (
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
                        <td><a href={`/users/${blogsGroupedByUser[one][0].user.username}`}>{one}</a></td>
                        <td>{blogsGroupedByUser[one].length}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )} />
            <Route path='/users/:username' render={({ match }) => {
              if (isEmpty(blogsGroupedByUser)) return <></>
              const name = getUserNameByUsername(match.params.username)
              return (
                <div> 
                  <h2>{name}</h2>
                  <h3>blogit</h3>
                  <ul>
                    {blogsGroupedByUser[name].map(one => <li key={one.id}>{one.title}</li>)}
                  </ul>
                </div>
              )
            }} />
            <Route path='/blogs/:id' render={({ match }) => {
              if (isEmpty(store.getState().blogs)) return <></>
              const blog = store.getState().blogs.find(one => one.id === match.params.id)
              return (
                <Blog key={blog.id} blog={blog} user={store.getState().user}
                  like={like} remove={remove} init={true} />
              )
            }} />
            <Route exact path='/blogs'>
              <Redirect to='/' />
            </Route>
          </div>
        </Router>
      </Container>
    </Background>
  )
}

export default App