import React from 'react'

const InfoSection = ({ store }) => {
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

export default InfoSection