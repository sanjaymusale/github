import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loader from '../../loader'
import { connect } from 'react-redux'
import axios from 'axios'
import './public.css'
import Editor from '../../editor'
import { GIST } from '../../../constants/url';

class PublicGist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      results: [],
      isLoaded: false,
      pagination: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      currentPage: 1,
      inititalPage: 0,
      lastPage: 5,

    }
    this.config = {
      headers: {
        "Authorization": `token ${props.access_token}`
      }
    }
  }

  componentDidMount() {
    axios.get(`${GIST}/public?page=1&per_page=10`, this.config)
      .then((res) => {
        this.setState({ data: res.data }, () => {
          this.fetchRepoInfos(this.config)
        })
        console.log(res)
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
      this.setState({ results: res, isLoaded: true })
    })

  }

  fetchNext = (e) => {
    this.setState({ isLoaded: false })
    const id = e.target.id
    axios.get(`${GIST}/public?page=${id}&per_page=10`)
      .then((res) => {
        this.setState({ data: res.data, currentPage: Number(id) }, () => {
          this.fetchRepoInfos(this.config)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  fetch = () => {
    this.setState({ isLoaded: false })
    const { cuurentPage: id } = this.state
    axios.get(`${GIST}/public?page=${id}&per_page=10`)
      .then((res) => {
        console.log('fetch last', res.data)
        this.setState({ data: res.data }, () => {
          this.fetchRepoInfos(this.config)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  checkNext = () => {
    const { lastPage, pagination } = this.state
    if (pagination.indexOf(lastPage) !== pagination.length - 1)
      this.setState((prev) => ({
        inititalPage: prev.lastPage,
        lastPage: prev.lastPage + 5,
        currentPage: prev.lastPage + 1
      }), () => { this.fetch() })
  }

  checkPrev = () => {
    const { inititalPage, pagination } = this.state
    if (pagination.indexOf(inititalPage) !== -1)
      this.setState((prev) => ({
        inititalPage: prev.inititalPage - 5,
        lastPage: prev.lastPage - 5,
        currentPage: prev.inititalPage,
      }), () => { this.fetch() })
  }

  render() {
    const { results, isLoaded, inititalPage, lastPage } = this.state
    if (!isLoaded)
      return <Loader />

    if (!results.length)
      return (
        <div className="load_all">
          <h3>Currently No starred Gist available</h3>
        </div>
      )
    // if (isLoaded) {
    //   window.scrollTo(100, 100)
    // }

    return (
      <div className="load_all">
        <div className="pagination">
          {this.state.results.map((item, index) => {
            let fileKey = Object.keys(item.files)[0]
            let code = item.files[fileKey].content
            return <div key={index} className="public_gist">
              <div className="profile-container">
                <div className="profile">
                  <img alt="" src={item.owner.avatar_url} height="35px" width="35px" />
                  <div>
                    <p>{item.owner.login} / <Link to={{
                      pathname: `/gist/${item.id}`,
                      state: {
                        Editable: false
                      }
                    }} className="link">
                      {Object.keys(item.files).toString().length > 50
                        ? Object.keys(item.files).toString().slice(0, 50)
                        : Object.keys(item.files)}
                    </Link></p>
                    <p>created 1 hour ago</p>
                  </div>
                </div>
                <div>

                </div>
              </div>
              <div className="description">
                <p>{item.description ? item.description.slice(0, 100) : item.description}</p>
              </div>


              <Editor
                file={Object.keys(item.files)[0]}
                maxLines={10}
                useWrapMode={true}
                readOnly={true}
                name="ace_editor"
                value={code}
                width="100%"
                editorProps={{ $blockScrolling: true }}
              />

            </div>
          })

          }
        </div>
        <div className="pagination-action">
          <button onClick={this.checkPrev}>&laquo;</button>
          {this.state.pagination.slice(inititalPage, lastPage).map((item, index) => {
            const currentPage = this.state.currentPage
            if (currentPage === item)
              return <button key={index} className="active" id={item} onClick={this.fetchNext}>{item}</button>
            return <button key={index} id={item} onClick={this.fetchNext}>{item}</button>
          })}
          <button onClick={this.checkNext}>&raquo;</button>
        </div>

      </div>
    )
  }
}

PublicGist.propTypes = {
  access_token: PropTypes.string.isRequired,
}

export default connect((state) => {
  return {
    access_token: state.Auth.access_token
  }
})(PublicGist)