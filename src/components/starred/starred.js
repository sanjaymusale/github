import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { GIST } from '../../constants/url'
import AceEditor from 'react-ace';
import "brace/mode/javascript";
import "brace/theme/github";
import { connect } from 'react-redux'
import axios from 'axios'

class Starred extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      results: [],
    }
  }

  componentDidMount() {
    const config = {
      headers: {
        "Authorization": `token ${this.props.access_token}`
      }
    }
    axios.get(`${GIST}/starred`, config)
      .then((res) => {
        this.setState({ data: res.data }, () => {
          this.fetchRepoInfos(config)
        })
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  fetchRepoInfos = (config) => {
    const { data } = this.state

    const promises = data.map(async repo => {
      const response = await axios.get(repo.url, config)
      return response.data

    })

    const results = Promise.all(promises)
    results.then((res) => {
      this.setState({ results: res })
    })

  }

  render() {
    console.log(this.state.results)
    return (
      <div>

        {this.state.results.length !== 0 && this.state.results.map((item, index) => {
          let fileKey = Object.keys(item.files)
          let code = item.files[fileKey].content
          return <div key={index}>
            <div className="gist_profile">
              <div className="profile">
                <img alt="" src={item.owner.avatar_url} height="35px" width="35px" />
                <div>
                  <p>{item.owner.login} / <Link to={`/gist/${item.id}`} className="link">{Object.keys(item.files)}</Link></p>
                  <p>created 1 hour ago</p>
                </div>
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
                value={code}
              />
            </div>
          </div>
        })

        }
      </div>
    )
  }
}

Starred.propTypes = {
  access_token: PropTypes.string.isRequired
}

export default connect((state) => {
  return {
    access_token: state.Auth.access_token
  }
})(Starred)