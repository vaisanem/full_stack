import React from 'react'

const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (store.getState().info.message) {
    return (
      <div style={style}>
        {store.getState().info.message}
      </div>
    )
  }
  return <></>
}

export default Notification
