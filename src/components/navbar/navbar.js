import React from 'react'
import './navbar.css'
import { LOGIN_AUTHORIZATION } from '../../constants/url'
import { Link } from 'react-router-dom'
export default class NavBar extends React.Component {
  render() {
    return (
      <div className="header">
        <h2>Gist Clone</h2>
        <div>
          <Link to='/listall'>List all</Link>
          <Link to='/create'>Create</Link>
          <a href={LOGIN_AUTHORIZATION}>Login with Github</a>
        </div>
      </div>
    )
  }
}