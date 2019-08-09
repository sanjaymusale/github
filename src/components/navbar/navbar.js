import React from 'react'
import './navbar.css'
import { LOGIN_AUTHORIZATION } from '../../constants/url'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="header container">
          <h2>Gist Clone</h2>
          <div>
            {this.props.token ?
              <>
                <Link className="link" to='/create'>Create</Link>
                <Link className="link" to='/listall'>Gists</Link>
                <Link className="link" to='/star-gist'>Starred Gist</Link>
                <Link className="link" to='/logout'>Logout</Link>
              </>
              :
              <a className="link" href={LOGIN_AUTHORIZATION}>Login with Github</a>
            }
          </div>
        </div>
      </div>
    )
  }
}


export default connect(({ Auth: { access_token } }) => {
  return {
    token: access_token
  }
})(NavBar)