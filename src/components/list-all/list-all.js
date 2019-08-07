import React from 'react';
import { LIST_ALL_GIST } from '../../constants/url'
// import { getData } from '../helper/getData'
import axios from 'axios'
import './list-all.css'
export default class ListAll extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      results: [],
    }
    this.x = []
  }

  componentDidMount() {
    axios.get(LIST_ALL_GIST, {
      headers: {
        "Authorization": `Bearer bcfd0fa31a1811bcd64402dcb2b555e34ee8f08e`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        this.setState({ data: res.data }, () => {
          this.fetchRepoInfos()
        })
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  fetchRepoInfos = () => {
    const { data } = this.state

    const promises = data.map(async repo => {

      const response = await axios.get(repo.url)

      return response.data

    })

    const results = Promise.all(promises)
    results.then((res) => {
      this.setState({ results: res, data: res })
    })

  }

  render() {
    console.log(this.state.results)
    return (
      <div>

        {this.state.results.slice(0, 3).map((item, index) => {
          let fileKey = Object.keys(item.files)
          let code = item.files[fileKey].content.slice(0, 200).split('\n')
          console.log(code)
          return <div key={index}>
            <div className="gist_profile">
              <div className="profile">
                <img alt="" src={item.owner.avatar_url} height="35px" width="35px" />
                <div>
                  <p>{item.owner.login} / {Object.keys(item.files)}</p>
                  <p>created 1 hour ago</p>
                </div>
              </div>
            </div>
            <div>
              <div>
                {code.map((code, index) => {
                  return <p key={index}><code>{code}</code></p>
                })
                }
              </div>
            </div>
          </div>
        })

        }
      </div>
    )
  }
}