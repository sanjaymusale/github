import React from 'react'
import './createGist.css'
import PropTypes from 'prop-types';
import Editor from '../editor'

export default class GistForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      snippets: props.data ? props.data.content : '',
      description: props.data ? props.data.description : '',
      filename: props.filename || ''
    }
  }

  change = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  code = (newValue) => {
    this.setState({ snippets: newValue })
  }

  render() {
    return (
      <div className="form-display">
        <div>
          <h3>{this.props.title}</h3>
        </div>
        <div>
          <input type="text" placeholder="description" name="description" onChange={this.change} value={this.state.description} />
          <input type="text" placeholder="filename" name="filename" onChange={this.change} value={this.state.filename} />
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
        <button onClick={() => this.props.submit(this.state)} className="button">{this.props.action}</button>

      </div>
    )
  }
}

GistForm.propTypes = {
  submit: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object
}
