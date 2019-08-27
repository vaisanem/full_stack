import React, { useState } from 'react'

const Blog = ({ blog }) => {

  const [ expand, setExpand ] = useState(false)

  const style = {
    cursor: 'pointer',
    border: '1px solid',
    padding: '2px',
    margin: '5px'
  }
  style['border-radius'] = '5px'
  style['background-color'] = 'lightgrey'

  return (
    <div onClick={() => setExpand(!expand)} style={style}>
      {blog.title} {blog.author}
      <div style={{ display: expand ? '' : 'none' }}>
        <p>{blog.url}</p>
        <p>{blog.likes} likes</p>
        <p>added by {blog.user.username}</p>
      </div>
    </div>
  )
}

export default Blog