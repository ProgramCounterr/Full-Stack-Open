import React from 'react'

const Notification = ({ message, success }) => {
  if(!message) // null
    return null

  const style = {
      color: success ? 'green' : 'red',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification