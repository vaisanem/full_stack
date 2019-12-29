import React, { useState } from 'react'
import { Table } from 'semantic-ui-react'
import useField from '../hooks/index'

const Blog = ({ blog, user, like, comment, remove, init=false }) => {

  const [ expand, setExpand ] = useState(init)
  const newComment = useField('text')

  const style = {
    cursor: 'pointer',
    border: '1px solid',
    padding: '2px',
    margin: '5px',
    borderRadius: '5px',
    backgroundColor: 'beige'
  }

  const usersBlog = { display: !user ? 'none' : user.username === blog.user.username ? '' : 'none' }

  return (
    <div style={style}>
      <div onClick={() => setExpand(!expand)}>
        <h4><a href={`/blogs/${blog.id}`}>{blog.title} {blog.author}</a></h4>
        <div style={{ display: expand ? '' : 'none' }}>
          <p>{blog.url}</p>
          <div>
            <>{blog.likes} tykkäystä </>
            <button onClick={() => like(blog)}>tykkää</button>
          </div>
          <p>added by {blog.user.username}</p>
          <button style={usersBlog} onClick={() => remove(blog)}>poista</button>
        </div>
        <h4>kommentit</h4>
        <div>
          <input {... { ...newComment, ...{ reset: null } }}/>
          <button onClick={() => comment(blog.id, newComment.value)}>kommentoi</button>
        </div>
        <Table>
          <tbody>
            {blog.comments.map(one => <tr key={one}><td>{one}</td></tr>)}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Blog