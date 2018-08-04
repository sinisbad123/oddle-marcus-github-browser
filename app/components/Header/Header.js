import React from 'react';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <p className="nav-space">
          <a className="router-link" href="/">
              Home
          </a>
        </p>
      </div>
    );
  }
}

export default Header;
