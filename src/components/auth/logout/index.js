import React from 'react'
import { connect } from 'react-redux'
import { logout_success } from '../actions/auth'

function Logout(props) {
  (() => {
    props.logout_success()
    props.history.push('/')
  })()

  return (<></>)
}

const mapDispatchToProps = {
  logout_success
}
export default connect(null, mapDispatchToProps)(Logout)