import React from 'react'
// import axios from 'axios'
import qs from 'query-string'
import Loading from '../../loader'
import { connect } from 'react-redux'
import { CLIENT_ID, SECRET_ID } from '../../../constants/url'
import { auth_success, auth_user } from '../actions/auth'

class Login extends React.Component {
  componentDidMount() {
    if (!this.props.access_token) {
      let code = qs.parse(this.props.location.search)
      const data = new FormData()
      data.append('code', code.code);
      data.append('client_id', CLIENT_ID);
      data.append('client_secret', SECRET_ID);
      this.props.auth_user(data)
    }
  }

  componentDidUpdate() {
    if (this.props.isUserAuthenticated) {
      this.props.history.push('/')
    }
  }
  render() {
    if (this.props.isProcessing)
      return <><Loading /></>

    return (
      <>
        {this.props.authError && <h3>Error in Authorization.. server error</h3>}
      </>
    )
  }
}

const mapStateToProps = ({ Auth: { access_token, isUserAuthenticated, isProcessing, authError } }) => {
  return {
    access_token,
    isUserAuthenticated,
    isProcessing,
    authError
  }
}

const mapDispatchToProps = {
  auth_success,
  auth_user
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)