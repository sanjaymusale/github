import React from 'react';
import { GIST } from '../../constants/url'
import AceEditor from 'react-ace';
import "brace/mode/javascript";
import "brace/theme/monokai";
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
    this.x = []
  }

  componentDidMount() {
    const config = {
      headers: {
        "Authorization": `token ${this.props.access_token}`
      }
    }
    axios.get(GIST, config)
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

        {this.state.results.length !== 0 && this.state.results.slice(0, 3).map((item, index) => {
          let fileKey = Object.keys(item.files)
          let code = item.files[fileKey].content.slice(0, 200)
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
              {/* <div>
                {code.map((code, index) => {
                  return <p key={index}><code>{code}</code></p>
                })
                }
              </div> */}
              <AceEditor
                mode="javascript"
                theme="monokai"
                height="50px"
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

export default connect((state) => {
  return {
    access_token: state.Auth.access_token
  }
})(ListAll)