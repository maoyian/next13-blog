import React from 'react'

export default function Bg() {
  return (
    <div>
      <iframe
        key={1}
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          zIndex: 0,
          border: 'none',
          pointerEvents: 'none',
        }}
        src="http://localhost:3000/three"
      ></iframe>
      <div
        style={{
          backgroundColor: 'transparent',

          position: 'absolute',
          color: 'red',
          top: '200px',
        }}
      >
        <h1>jfkrj</h1>
        <h1>jfkrj</h1>
        <h1>jfkrj</h1>
        <h1>jfkrj</h1>
        <h1>jfkrj</h1>
        <h1>jfkrj</h1>
      </div>
    </div>
  )
}
