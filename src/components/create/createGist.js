import React from 'react';
import './createGist.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GIST } from '../../constants/url';
import GistForm from './form';

function CreateGist(props) {
  const submit = (state) => {
    const { description, snippets, filename } = state;
    const { access_token } = props;
    const data = {
      public: true,
      description,
      files: {
        [filename]: {
          content: snippets,
        },
      },
    };
    const config = {
      headers: {
        Authorization: `token ${access_token}`,
      },
    };
    console.log(data);
    axios.post(GIST, data, config)
      .then((res) => {
        props.history.push('/listall');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <GistForm submit={submit} title="instantly share code snippets" action="Create" />
  );
}

CreateGist.propTypes = {
  access_token: PropTypes.string.isRequired,
};

export default connect((state) => ({
  access_token: state.Auth.access_token,
}))(CreateGist);
