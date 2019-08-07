import React from 'react'
import axios from 'axios'
import qs from 'query-string'
import { connect } from 'react-redux'
import { LOGIN_WITH_CODE, CLIENT_ID, SECRET_ID } from '../../../constants/url'
import { auth_success } from '../actions/auth'
class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      access_token: ''
    }
  }
  componentDidMount() {
    let code = qs.parse(this.props.location.search)
    const data = new FormData()
    data.append('code', code.code);
    data.append('client_id', CLIENT_ID);
    data.append('client_secret', SECRET_ID);
    axios.post(LOGIN_WITH_CODE, data)
      .then((res) => {
        let access_token = res.data.split('&')[0].split('=')[1]
        this.props.dispatch(auth_success({ access_token }))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    console.log(this.props)
    return (
      <>
      </>
    )
  }
}

export default connect()(Login)