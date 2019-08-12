import React from 'react'
import './createGist.css'
import PropTypes from 'prop-types';
import Editor from '../editor'
import { Extensions } from '../helper'
export default class GistForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      snippets: props.data ? props.data.content : '',
      description: props.data ? props.data.description : '',
      filename: props.filename || '',
      error: {
        invalid: false
      }
    }
  }

  validExtensions = () => {
    const { filename } = this.state
    const ext = filename.split('.')[1]
    const valid = Extensions[ext] ? true : false
    this.setState({
      error: { valid }
    })
  }

  change = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.validExtensions()
    })
  }

  code = (newValue) => {
    this.setState({ snippets: newValue })
  }

  render() {
    const { error: { valid } } = this.state
    console.log(valid)
    return (
      <div className="form-display">
        <div className="form">
          <div>
            <h3>{this.props.title}</h3>
          </div>
          <div>
            <input type="text" placeholder="description" name="description" onChange={this.change} value={this.state.description} />
            <input type="text" placeholder="filename" name="filename" onChange={this.change} value={this.state.filename} />
            {this.state.error.valid || <p style={{ "color": "red", "fontSize": "10px" }}>Invalid Extension</p>}
          </div>
          <div>
            <Editor
              file={this.state.filename || "code_snippet.js"}
              onChange={this.code}
              value={this.state.snippets}
              height="200px"
              name="ace_editor"
            />
          </div>
          <button disabled={!valid} onClick={() => this.props.submit(this.state)} className="button">{this.props.action}</button>
        </div>
      </div >
    )
  }
}

GistForm.propTypes = {
  submit: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object
}
