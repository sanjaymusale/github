import React from 'react';
import { Link } from 'react-router-dom'
import { GIST } from '../../constants/url'
import AceEditor from 'react-ace';
import "brace/mode/javascript";
import "brace/theme/github";
import { connect } from 'react-redux'
import axios from 'axios'
import './gist.css'

class Gist extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {},
      isLoaded: false
    }
    this.x = []
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const config = {
      headers: {
        "Authorization": `token ${this.props.access_token}`
      }
    }

    axios.get(`${GIST}/${id}`, config)
      .then((res) => {
        this.setState({ data: res.data, isLoaded: true })
        console.log('gist', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    // console.log(this.state.data)
    return (
      <div>

        {this.state.isLoaded &&
          // let fileKey = Object.keys(this.state.data.files)
          // let code = this.state.data.files[fileKey].content.slice(0, 200)
          <div style={{ width: "70%" }}>
            <div className="gist_profile">
              <div className="profile">
                <img alt="" src={this.state.data.owner.avatar_url} height="35px" width="35px" />
                <div>
                  <p>{this.state.data.owner.login} / {Object.keys(this.state.data.files)}</p>
                  <p>created 1 hour ago</p>
                </div>
              </div>
              <div>
                <button>
                  <Link to={{
                    pathname: `/gist/current/edit`,
                    state: {
                      data: this.state.data
                    }
                  }} className="link">Edit</Link></button>
              </div>
            </div>
            <div>
              <AceEditor
                mode="javascript"
                theme="github"
                width="100%"
                maxLines={5}
                editorProps={{ $blockScrolling: true }}
                readOnly={true}
                name="UNIQUE_ID_OF_DIV"
                setOptions={{ useWorker: false }}
                value={this.state.data.files[Object.keys(this.state.data.files)].content}
              />
            </div>
          </div>
        }
      </div>
    )
  }
}

export default connect((state) => {
  return {
    access_token: state.Auth.access_token
  }
})(Gist)