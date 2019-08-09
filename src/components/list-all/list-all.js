import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loader from '../../components/loader'
import AceEditor from 'react-ace';
import "brace/mode/javascript";
import "brace/theme/github";
import { connect } from 'react-redux'
import axios from 'axios'
import './list-all.css'

class ListAll extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      results: [],
    }
  }

  componentDidMount() {
    const { url } = this.props
    const config = {
      headers: {
        "Authorization": `token ${this.props.access_token}`
      }
    }
    axios.get(url, config)
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
    const { results } = this.state
    if (!results.length)
      return <Loader />

    return (
      <div className="load_all">
        {this.state.results.map((item, index) => {
          let fileKey = Object.keys(item.files)
          let code = item.files[fileKey].content
          return <div key={index} className="single_gist">
            <div className="profile">
              <img alt="" src={item.owner.avatar_url} height="35px" width="35px" />
              <div>
                <p>{item.owner.login} / <Link to={`/gist/${item.id}`} className="link">{Object.keys(item.files)}</Link></p>
                <p>created 1 hour ago</p>
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
                name="ace_editor"
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

ListAll.propTypes = {
  access_token: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default connect((state) => {
  return {
    access_token: state.Auth.access_token
  }
})(ListAll)