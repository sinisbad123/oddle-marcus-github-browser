import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  onThemeChange = (theme) => {
    this.props.onThemeChange(theme);
  }

  render() {
    return (
      <div className="header">
        <p className="nav-space">
          <a className="router-link" href="/">
              Home
          </a>
        </p>

        <div className="theme-selector-container">
          <p>Theme:</p>
          <label htmlFor="default">
            <input
              name="default"
              type="radio"
              value="default"
              onChange={() => this.onThemeChange('default')}
              checked={this.props.selectedTheme === 'default'}
            />
            &nbsp;Default
          </label>

          <label htmlFor="default">
            <input
              name="mozillian"
              type="radio"
              value="mozillian"
              onChange={() => this.onThemeChange('mozillian')}
              checked={this.props.selectedTheme === 'mozillian'}
            />
           &nbsp;Mozillian
          </label>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  onThemeChange: PropTypes.func,
  selectedTheme: PropTypes.string
};

export default Header;
