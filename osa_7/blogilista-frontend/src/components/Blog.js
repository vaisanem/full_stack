import React, { useState } from 'react'

const Blog = ({ blog, user, like, comment, remove, init=false }) => {

  const [ expand, setExpand ] = useState(init)
  const [ content, setContent ] = useState('')

  const style = {
    cursor: 'pointer',
    border: '1px solid',
    padding: '2px',
    margin: '5px',
    borderRadius: '5px',
    backgroundColor: 'lightgrey'
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
        <input value={content} onChange={(event) => setContent(event.target.value)}/>
        <button onClick={() => comment(blog.id, content)}>kommentoi</button>
        <ul>
          {blog.comments.map(one => <li key={one}>{one}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Blog