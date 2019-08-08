import React from 'react'
import { connect } from 'react-redux'
import { logout_success } from '../actions/auth'

function Logout(props) {
  (() => {
    props.dispatch(logout_success())
  })()

  return (<></>)
}


export default connect()(Logout)