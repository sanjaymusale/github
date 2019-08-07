import React from 'react'
import './createGist.css'
import ReactAce from 'react-ace-editor';

export default class CreateGist extends React.Component {
  render() {
    return (
      <div className="container">
        <div>
          <h3>instantly share code snippets</h3>
        </div>
        <input type="text" />
        <ReactAce
          mode="javascript"
          theme="eclipse"
          setReadOnly={false}
          onChange={this.onChange}
          style={{ height: '400px', width: '100%' }}
          ref={instance => { this.ace = instance; }} // Let's put things into scope
        />
      </div>
    )
  }
}

