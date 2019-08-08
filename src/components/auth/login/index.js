import React from 'react'
import axios from 'axios'
import qs from 'query-string'
import { connect } from 'react-redux'
import { LOGIN_WITH_CODE, CLIENT_ID, SECRET_ID, USER_DETAILS } from '../../../constants/url'
import { auth_success } from '../actions/auth'

function Login(props) {

  (() => {
    let code = qs.parse(props.location.search)
    const data = new FormData()
    data.append('code', code.code);
    data.append('client_id', CLIENT_ID);
    data.append('client_secret', SECRET_ID);
    axios.post(LOGIN_WITH_CODE, data)
      .then((res) => {
        console.log(res)
        let access_token = res.data.split('&')[0].split('=')[1]
        if (!access_token.includes('bad')) {
          axios.get(USER_DETAILS,
            { headers: { 'Authorization': `token ${access_token}` } })
            .then((res) => {
              props.dispatch(auth_success({ access_token, user: res.data }))
              props.history.push('/')
            })

        }
      })
      .catch((err) => {
        console.log(err)
      })
  })()

  return (
    <>
    </>
  )

}
export default connect()(Login)