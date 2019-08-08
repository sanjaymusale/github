import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { GIST } from '../../constants/url'

export default function DeleteGist(props) {
  const { access_token } = props
  const { data } = props.location.state
  console.log(data.id)

  const config = {
    headers: {
      "Authorization": `token ${access_token}`
    }
  }
  // console.log(config)
  axios.delete(`${GIST}/${data.id}`, config)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })

  return (
    <>
    </>
  )
}

connect((state) => {
  return {
    access_token: state.Auth.access_token
  }
})(DeleteGist)