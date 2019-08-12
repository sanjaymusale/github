import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loader from '../../components/loader'
import { connect } from 'react-redux'
import axios from 'axios'
import './list-all.css'
import Editor from '../editor'
import { GIST } from '../../constants/url';

class ListAll extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      results: [],
      isLoaded: false
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
        // console.log(res.data)
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
      console.log('fetch', res)
      this.setState({ results: res, isLoaded: true })
    })

  }

  starGist = (id) => {
    const config = {
      headers: {
        "Authorization": `token ${this.props.access_token}`,
        // "Content-Length": 0
      }
    }
    axios.get(`${GIST}/${id}/star`, config)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  unstarGist = (id) => {
    const config = {
      headers: {
        "Authorization": `token ${this.props.access_token}`
      }
    }
    axios.delete(`${GIST}/${id}/star`, config)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    const { results, isLoaded } = this.state
    console.log('results', results)
    if (!isLoaded)
      return <Loader />

    if (!results.length)
      return (
        <div className="load_all">
          <h3>Currently No starred Gist available</h3>
        </div>
      )

    return (
      <div className="load_all">
        {this.state.results.map((item, index) => {
          let fileKey = Object.keys(item.files)
          let code = item.files[fileKey].content
          return <div key={index} className="single_gist">
            <div className="profile-container">
              <div className="profile">
                <img alt="" src={item.owner.avatar_url} height="35px" width="35px" />
                <div>
                  <p>{item.owner.login} / <Link to={`/gist/${item.id}`} className="link">{Object.keys(item.files)}</Link></p>
                  <p>created 1 hour ago</p>
                </div>
              </div>
              <div>

                {/* <button className="star" onClick={() => this.starGist(item.id)}>&#9734;&nbsp;star</button>
                <button className="unstar" onClick={() => this.unstarGist(item.id)}>&#9733;&nbsp;unstar</button> */}

              </div>
            </div>

            <div>
              <Editor
                file={Object.keys(item.files)[0]}
                maxLines={4}
                useWrapMode={true}
                readOnly={true}
                name="ace_editor"
                value={code}
                width="100%"
                editorProps={{ $blockScrolling: true }}
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