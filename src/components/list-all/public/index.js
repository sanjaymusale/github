import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loader from '../../loader'
import { connect } from 'react-redux'
import axios from 'axios'
import './public.css'
import Editor from '../../editor'
import { GIST } from '../../../constants/url';

class LoadMoreGist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      results: [],
      isLoaded: false,
      requestLoading: false,
      currentCard: 0,
      pagination: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      currentPage: parseInt(this.props.match.params.id),
      inititalPage: parseInt((this.props.match.params.id % 5 === 0) ? this.props.match.params.id - 4 : Math.floor(this.props.match.params.id / 5) * 5 + 1),
      lastPage: parseInt((this.props.match.params.id % 5 === 0) ? this.props.match.params.id : Math.floor(this.props.match.params.id / 5) * 5 + 5),

    }
    this.config = {
      headers: {
        "Authorization": `token ${props.access_token}`
      }
    }
  }

  fetch = (currentPage) => {
    axios.get(`${GIST}/public?page=${currentPage}&per_page=30`, this.config)
      .then((res) => {
        this.setState({ data: res.data, isLoaded: true }, () => {
          this.fetchRepoInfos()
        })
        // console.log('initial', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.fetch(this.state.currentPage)
  }

  componentDidUpdate(prevProps, prevState) {
    const { id } = prevProps.match.params
    if (id !== this.props.match.params.id) {
      this.fetch(id)
    }

    if (prevState.currentPage !== parseInt(id)) {
      this.setState({
        currentPage: parseInt(id),
        inititalPage: parseInt((this.props.match.params.id % 5 === 0) ? this.props.match.params.id - 4 : Math.floor(this.props.match.params.id / 5) * 5 + 1),
        lastPage: parseInt((this.props.match.params.id % 5 === 0) ? this.props.match.params.id : Math.floor(this.props.match.params.id / 5) * 5 + 5),
        currentCard: 0
      })
    }
  }



  fetchRepoInfos = () => {
    this.setState({ isLoaded: false })
    const { data } = this.state

    const promises = data.map(async (repo, index) => {
      if (index < 2) {
        const response = await axios.get(repo.url, this.config)
        return response.data
      }
      else {
        return repo
      }
    })
    const results = Promise.all(promises)
    results.then((res) => {
      console.log(res)
      this.setState({ results: res, isLoaded: true })
    })
  }

  fetchonRequest = (e) => {
    const id = parseInt(e.target.id)
    this.setState({ requestLoading: true, currentCard: id })
    const { results } = this.state

    // console.log('id', id)
    const url = results[id].url

    axios.get(url, this.config)
      .then((res) => {
        const { data } = res
        // console.log(data)
        results.splice(id, 1, data)
        this.setState({ results, requestLoading: false })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    const { results, data, isLoaded, inititalPage, lastPage, pagination, requestLoading, currentCard } = this.state

    if (!isLoaded)
      return <Loader />

    if (!data.length)
      return (
        <div className="load_all">
          <h3>Currently Public Gist Not available</h3>
        </div>
      )

    return (
      <div className="load_all">
        <div className="pagination">
          {results.map((item, index) => {
            let fileKey = Object.keys(item.files)[0]
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

              {currentCard === index && !item.files[fileKey].content ?

                requestLoading
                  ? <Loader nomargin size="50px" />
                  : <Editor
                    file={Object.keys(item.files)[0]}
                    maxLines={10}
                    useWrapMode={true}
                    readOnly={true}
                    name="ace_editor"
                    value={item.files[fileKey].content}
                    width="100%"
                    editorProps={{ $blockScrolling: true }}
                  />

                : !item.files[fileKey].content
                  ?
                  <div className="block">
                    <button onClick={this.fetchonRequest} id={index}>View</button>
                  </div>
                  : <Editor
                    file={Object.keys(item.files)[0]}
                    maxLines={10}
                    useWrapMode={true}
                    readOnly={true}
                    name="ace_editor"
                    value={item.files[fileKey].content}
                    width="100%"
                    editorProps={{ $blockScrolling: true }}
                  />
              }

            </div>
          })

          }
        </div>
        <div className="pagination-action">
          <Link to={`/public-gist/${inititalPage - 5}`}>
            <button disabled={inititalPage === 1}>&laquo;</button>
          </Link>

          {pagination.slice(inititalPage, lastPage + 1).map((item, index) => {
            const currentPage = parseInt(this.state.currentPage)
            if (currentPage === item)
              return <button key={index} className="active" id={item} >{item}</button>
            return <Link key={index} to={`/public-gist/${item}`}><button id={item}>{item}</button></Link>
          })}

          <Link to={`/public-gist/${lastPage + 1}`}>
            <button disabled={!pagination.includes(lastPage)}>&raquo;</button>
          </Link>
        </div>

      </div>
    )
  }
}

LoadMoreGist.propTypes = {
  access_token: PropTypes.string.isRequired,
}

export default connect((state) => {
  return {
    access_token: state.Auth.access_token
  }
})(LoadMoreGist)