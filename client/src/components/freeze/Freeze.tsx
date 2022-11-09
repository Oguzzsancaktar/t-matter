import React from 'react'

const Freeze = () => {
  return (
    <div
      style={{
        backgroundColor: '#000',
        opacity: 0.5,
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        zIndex: 9999999
      }}
    ></div>
  )
}

export default Freeze
