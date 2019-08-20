import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './list-all.css'
import Editor from '../editor'
import Loader from '../../components/loader'
import { Link } from 'react-router-dom';

function ListAll(props) {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const config = {
      headers: {
        "Authorization": `token ${props.access_token}`
      }
    }

    const { url } = props

    axios.get(url, config)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

  }, [props])

  useEffect(() => {
    const config = {
      headers: {
        "Authorization": `token ${props.access_token}`
      }
    }
    const fetchRepoInfos = () => {

      const promises = data.map(async repo => {
        const response = await axios.get(repo.url, config)
        return response.data

      })

      const results = Promise.all(promises)
      results.then((res) => {
        setIsLoaded(true)
        setResults(res)
      })
        .catch((err) => {
          setIsLoaded(false)
        })

    }
    if (data.length)
      fetchRepoInfos()
  }, [props.access_token, data])



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
      {results.map((item, index) => {
        let fileKey = Object.keys(item.files)[0]
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
          </div>

          <div>
            <Editor
              file={Object.keys(item.files)[0]}
              maxLines={8}
              useWrapMode={true}
              readOnly={true}
              highlightActiveLine={false}
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

export default connect((state) => {
  return {
    access_token: state.Auth.access_token
  }
})(ListAll)
