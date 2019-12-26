import React, { useState } from 'react'
import { Table } from 'semantic-ui-react'

const Blog = ({ blog, user, like, remove, init=false }) => {

  const [ expand, setExpand ] = useState(init)

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
    <div onClick={() => setExpand(!expand)} style={style}>
      <h4><a href={`/blogs/${blog.id}`}>{blog.title} {blog.author}</a></h4>
      <div style={{ display: expand ? '' : 'none' }}>
        <p>{blog.url}</p>
        <div>
          <>{blog.likes} tykkäystä </>
          <button onClick={() => like(blog)}>tykkää</button>
        </div>
        <p>added by {blog.user.username}</p>
        <button style={usersBlog} onClick={() => remove(blog)}>poista</button>
        <h4>kommentit</h4>
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