import React from 'react';
import './createGist.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GistForm from './form';
import { GIST } from '../../constants/url';

function EditGist(props) {
  const { data } = props.location.state;
  const gist = data.files[Object.keys(data.files)];
  const currentGist = {
    id: data.id,
    content: gist.content,
    description: data.description,
    filename: gist.filename,
  };

  const submit = (state) => {
    const { description, snippets, filename } = state;
    let data = {};
    const { access_token } = props;
    if (currentGist.filename === filename) {
      data = {
        description,
        files: {
          [filename]: {
            content: snippets,
          },
        },
      };
    } else {
      data = {
        description,
        files: {
          [currentGist.filename]: null,
          [filename]: {
            content: snippets,
          },
        },
      };
    }
    const config = {
      headers: {
        Authorization: `token ${access_token}`,
      },
    };

    axios.patch(`${GIST}/${currentGist.id}`, data, config)
      .then((res) => {
        console.log(res.data);
        props.history.push(`/gist/${currentGist.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <GistForm submit={submit} title="Edit code snippets" action="Edit" data={currentGist} filename={currentGist.filename} />
  );
}

EditGist.propTypes = {
  access_token: PropTypes.string.isRequired,
};

export default connect((state) => ({
  access_token: state.Auth.access_token,
}))(EditGist);
