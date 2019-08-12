import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { GIST } from '../../constants/url'
import AceEditor from 'react-ace';
import "brace/mode/javascript";
import "brace/mode/ruby";
import "brace/mode/java";
import "brace/mode/html";
import "brace/theme/xcode";
import { connect } from 'react-redux'
import axios from 'axios'
import './gist.css'
import Loader from '../loader';
import { getExtension } from '../helper'

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
        // console.log('gist', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    const { isLoaded, data } = this.state
    if (!isLoaded)
      return <Loader />

    return (
      <div className="card">
        <div className="gist">
          <div className="gist_profile">
            <div className="profile">
              <img alt="" src={this.state.data.owner.avatar_url} height="35px" width="35px" />
              <div>
                <p>{this.state.data.owner.login} / {Object.keys(this.state.data.files)}</p>
                <p>created 1 hour ago</p>
              </div>
            </div>
            <div>

              <Link to={{
                pathname: `/gist/current/edit`,
                state: {
                  data: this.state.data
                }
              }}><button className="edit">edit</button></Link>
              {/* <Link to={`/gist/edit/${data.id}`}><button className="edit">edit</button></Link> */}
            </div>
          </div>
          <div>
            <AceEditor
              mode={getExtension(Object.keys(this.state.data.files))}
              theme="xcode"
              width="100%"
              maxLines={5}
              editorProps={{ $blockScrolling: true }}
              readOnly={true}
              name="Edit_editor"
              setOptions={{ useWorker: false }}
              value={this.state.data.files[Object.keys(this.state.data.files)].content}
            />
          </div>
        </div>
      </div >
    )
  }
}

Gist.propTypes = {
  access_token: PropTypes.string.isRequired
}

export default connect((state) => {
  return {
    access_token: state.Auth.access_token
  }
})(Gist)