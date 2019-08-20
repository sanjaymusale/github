import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Loader from '../loader';
import './list-all.css';
import Editor from '../editor';
// import { GIST } from '../../constants/url';

class ListAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      results: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    const { url } = this.props;
    const config = {
      headers: {
        Authorization: `token ${this.props.access_token}`,
      },
    };
    axios.get(url, config)
      .then((res) => {
        this.setState({ data: res.data }, () => {
          this.fetchRepoInfos(config);
        });
        // console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }


  fetchRepoInfos = (config) => {
    const { data } = this.state;

    const promises = data.map(async (repo) => {
      const response = await axios.get(repo.url, config);

      return response.data;
    });

    const results = Promise.all(promises);
    results.then((res) => {
      // console.log('fetch', res)
      this.setState({ results: res, isLoaded: true });
    });
  }

  render() {
    const { results, isLoaded } = this.state;
    if (!isLoaded) return <Loader />;

    if (!results.length) {
      return (
        <div className="load_all">
          <h3>Currently No starred Gist available</h3>
        </div>
      );
    }

    return (
      <div className="load_all">
        {this.state.results.map((item, index) => {
          const fileKey = Object.keys(item.files)[0];
          const code = item.files[fileKey].content;
          return (
            <div key={index} className="single_gist">
              <div className="profile-container">
                <div className="profile">
                  <img alt="" src={item.owner.avatar_url} height="35px" width="35px" />
                  <div>
                    <p>
                      {item.owner.login}
                      {' '}
/
                      {' '}
                      <Link to={`/gist/${item.id}`} className="link">{Object.keys(item.files)}</Link>
                    </p>
                    <p>created 1 hour ago</p>
                  </div>
                </div>
              </div>

              <div>
                <Editor
                  file={Object.keys(item.files)[0]}
                  maxLines={8}
                  useWrapMode
                  readOnly
                  highlightActiveLine={false}
                  name="ace_editor"
                  value={code}
                  width="100%"
                  editorProps={{ $blockScrolling: true }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

ListAll.propTypes = {
  access_token: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default connect((state) => ({
  access_token: state.Auth.access_token,
}))(ListAll);
