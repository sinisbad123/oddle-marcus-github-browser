/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import UserList from 'components/UserList';
import MarkdownRenderer from 'react-markdown-renderer';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {};

  onChangeUsernameInput = (e) => {
    const username = e.target.value;
    if (this.props.onChangeUsername) {
      this.props.onChangeUsername(e);
    }

    if (username && username.trim().length >= 3) {
      this.props.onSubmitForm();
    }
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.props.username && this.props.username.trim().length > 0) {
      if (this.props.onSubmitForm) {
        this.props.onSubmitForm();
      }
    }
  }

  renderReposList = () => {
    const { loading, error, userList } = this.props;
    const userListProps = {
      loading,
      error,
      items: userList && userList.items ? userList.items : null
    };

    return (
      <section>
        <h2>Fetch Github users!</h2>
        <form onSubmit={this.onSubmitForm}>
          <label htmlFor="username">
          Search Github users
            <span className="at-prefix">@</span>
            <input
              id="username"
              type="text"
              placeholder="sinisbad123"
              value={this.props.username}
              onChange={this.onChangeUsernameInput}
            />
          </label>
        </form>
        <UserList {...userListProps} />
      </section>
    );
  }

  renderReadmeMarkdown = () => {
    const { readme, username, repo } = this.props;
    const readmeContent = atob(readme.content);

    return (
      <section>
        <a href={`/${username}`}>
          Back to {`${username}'s`} repo list
        </a>
        <h2>{`${username}'s ${repo}`}</h2>
        <MarkdownRenderer markdown={readmeContent} />
      </section>
    );
  }

  render() {
    const { readme } = this.props;
    let renderBodyComponent = this.renderReposList();

    if (readme) {
      renderBodyComponent = this.renderReadmeMarkdown();
    }

    return (
      <article>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Github browser and README scraper" />
        </Helmet>
        <div className="home-page">
          <section className="centered">
            <h2>Fetch a list of Github users and their repo infos!</h2>
            <p>An <i>Oddle</i> test designed to impress their developers</p>
          </section>
          {renderBodyComponent}
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  readme: PropTypes.object,
  match: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  userList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.bool,
  ]),
  repo: PropTypes.string,
  onSubmitForm: PropTypes.func,
  onFetchReadme: PropTypes.func,
  username: PropTypes.string,
  usernameInput: PropTypes.string,
  onSetUsername: PropTypes.func,
  onSetRepo: PropTypes.func,
  onDefaultUsername: PropTypes.func,
  onChangeUsername: PropTypes.func,
};
