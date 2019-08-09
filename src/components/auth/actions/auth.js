import axios from 'axios'
import { LOGIN_WITH_CODE, USER_DETAILS } from '../../../constants/url'
export const auth_pending = () => (dispatch) => {
  dispatch({
    type: 'AUTH_PENDING'
  })
}
export const auth_success = (data) => (dispatch) => {
  dispatch({
    type: 'AUTH_SUCCESS',
    payload: data
  })
}

export const logout_success = () => (dispatch) => {
  dispatch({
    type: 'LOGOUT_SUCCESS',
  })
}

export const login_failure = () => {
  return {
    type: 'LOGIN_FAILURE'
  }
}

export const auth_error = () => (dispatch) => {
  dispatch({
    type: 'AUTH_ERROR'
  })
}

export const auth_user = (data) => (dispatch) => {
  auth_pending()(dispatch)
  axios.post(LOGIN_WITH_CODE, data)
    .then((res) => {
      // console.log(res)
      let access_token = res.data.split('&')[0].split('=')[1]
      if (!access_token.includes('bad')) {
        axios.get(USER_DETAILS,
          { headers: { 'Authorization': `token ${access_token}` } })
          .then((res) => {
            auth_success({ access_token, user: res.data })(dispatch)
          })
      }
    })
    .catch((err) => {
      auth_error()(dispatch)
    })
}