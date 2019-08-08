import React from 'react'
import './createGist.css'
import AceEditor from 'react-ace';
import "brace/mode/javascript";
import "brace/theme/monokai";
import axios from 'axios'
import { GIST } from '../../constants/url'
import { connect } from 'react-redux'

class CreateGist extends React.Component {
  constructor() {
    super()
    this.state = {
      snippets: '',
      description: '',
    }
  }

  description = (e) => {
    this.setState({ description: e.target.value })
  }
  submit = () => {
    const { description, snippets } = this.state
    const { access_token } = this.props
    const data = {
      "public": true,
      "description": description,
      "files": {
        "hello_world.js": {
          "content": snippets
        }
      }
    }
    const config = {
      headers: {
        "Authorization": `token ${access_token}`
      }
    }
    console.log(config)
    axios.post(GIST, data, config)
      .then((res) => {
        this.props.history.push('/listall')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  code = (newValue) => {
    this.setState({ snippets: newValue })
  }
  render() {
    return (
      <div className="container">
        <div>
          <h3>instantly share code snippets</h3>
        </div>
        <input type="text" placeholder="description" onChange={this.description} />
        <AceEditor
          mode="javascript"
          theme="monokai"
          height="200px"
          onChange={this.code}
          name="UNIQUE_ID_OF_DIV"
          value={this.state.snippets}
        />
        <button onClick={this.submit}>Create</button>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    access_token: state.Auth.access_token
  }
})(CreateGist)