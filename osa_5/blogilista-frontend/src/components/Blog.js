import React, { useState } from 'react'

const Blog = ({ blog, like }) => {

  const [ expand, setExpand ] = useState(false)

  const style = {
    cursor: 'pointer',
    border: '1px solid',
    padding: '2px',
    margin: '5px',
    borderRadius: '5px',
    backgroundColor: 'lightgrey'
  }

  return (
    <div onClick={() => setExpand(!expand)} style={style}>
      {blog.title} {blog.author}
      <div style={{ display: expand ? '' : 'none' }}>
        <p>{blog.url}</p>
        <div>
          <>{blog.likes} tykkäystä </>
          <button onClick={() => like(blog)}>tykkää</button>
        </div>
        <p>added by {blog.user.username}</p>
      </div>
    </div>
  )
}

export default Blog