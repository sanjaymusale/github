import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { GIST } from '../../constants/url';
import './gist.css';
import Loader from '../loader';
import Editor from '../editor';

class Gist extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      isLoaded: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const config = {
      headers: {
        Authorization: `token ${this.props.access_token}`,
      },
    };

    axios.get(`${GIST}/${id}`, config)
      .then((res) => {
        this.setState({ data: res.data, isLoaded: true });
        console.log('gist', res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { isLoaded, data } = this.state;
    let Editable = true;
    if (this.props.location.state) {
      Editable = this.props.location.state.Editable;
    }

    if (!isLoaded) return <Loader />;

    return (
      <div className="card">
        <div className="gist">
          <div className="gist_profile">
            <div className="profile">
              <img alt="" src={data.owner.avatar_url} height="35px" width="35px" />
              <div>
                <p>
                  {data.owner.login}
                  {' '}
/
                  {' '}
                  {Object.keys(data.files)}
                </p>
                <p>created 1 hour ago</p>
              </div>
            </div>
            {Editable
              && 
              <div>
                <Link to={{
                  pathname: '/gist/current/edit',
                  state: {
                    data,
                  },
                }}
                >
                  <button className="edit">edit</button>
                </Link>
              </div>
            }
          </div>
          <div className="description">
            <p>{data.description}</p>
          </div>
          <div>
            <Editor
              file={Object.keys(data.files)[0]}
              editorProps={{ $blockScrolling: true }}
              width="100%"
              minLines={5}
              readOnly
              name="ace_editor"
              setOptions={{ useWorker: false }}
              value={data.files[Object.keys(data.files)[0]].content}
            />
          </div>
        </div>
      </div>
    );
  }
}

Gist.propTypes = {
  access_token: PropTypes.string.isRequired,
};

export default connect((state) => ({
  access_token: state.Auth.access_token,
}))(Gist);
