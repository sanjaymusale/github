import React from 'react'

export default function AppLayout(props) {
  return (
    <div className="layout">
      {props.children}
    </div>
  )
}