import React from 'react';
import './navbar.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Icon from '../../assets/github-icon.svg';
import { LOGIN_AUTHORIZATION } from '../../constants/url';

function NavBar(props) {
  const { location: { pathname } } = props;
  return (
    <div className="navbar">
      <div className="header container">
        <div className="logo">
          <Link to="/"><img src={Icon} alt="" height="40px" width="40px" /></Link>
          <Link to="/" className="name"><span>Gist Clone</span></Link>

        </div>
        <div className="nav-link">
          {props.token
            ? 
              <>
                <Link className={pathname === '/create' ? 'link active' : 'link'} to="/create">Create</Link>
                <Link className={pathname === '/listall' ? 'link active' : 'link'} to="/listall">Gists</Link>
                <Link className={pathname === '/star-gist' ? 'link active' : 'link'} to="/star-gist">Starred Gist</Link>
                <Link className={pathname.includes('/public-gist/') ? 'link active' : 'link'} to="/public-gist/1">Public Gist</Link>
                <Link className="link" to="/logout">Logout</Link>
              </>
            
            : <a className="link" href={LOGIN_AUTHORIZATION}>Login with Github</a>}
        </div>
      </div>
    </div>
  );
}


export default withRouter(connect(({ Auth: { access_token } }) => ({
  token: access_token,
}))(NavBar));
