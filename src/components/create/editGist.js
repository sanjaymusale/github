import React from 'react'
import './createGist.css'
import axios from 'axios'
import PropTypes from 'prop-types';
import GistForm from './form'
import { GIST } from '../../constants/url'
import { connect } from 'react-redux'

function EditGist(props) {

  const { data } = props.location.state
  let gist = data.files[Object.keys(data.files)]
  const currentGist = {
    id: data.id,
    content: gist.content,
    description: data.description,
    filename: gist.filename
  }

  const submit = (state) => {
    const { description, snippets } = state
    const { access_token } = props
    const data = {
      "description": description,
      "files": {
        [currentGist.filename]: {
          "content": snippets
        }
      }
    }
    const config = {
      headers: {
        "Authorization": `token ${access_token}`
      }
    }

    axios.patch(`${GIST}/${currentGist.id}`, data, config)
      .then((res) => {
        props.history.push(`/gist/${currentGist.id}`)

      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <GistForm submit={submit} title="Edit code snippets" action="Edit" data={currentGist} />
  )

}

EditGist.propTypes = {
  access_token: PropTypes.string.isRequired
}

export default connect((state) => {
  return {
    access_token: state.Auth.access_token
  }
})(EditGist)