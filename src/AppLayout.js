import React from 'react'

export default function AppLayout(props) {
  return (
    <div className="main container">
      {props.children}
    </div>
  )
}