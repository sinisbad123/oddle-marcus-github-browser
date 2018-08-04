/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import MarkdownRenderer from 'react-markdown-renderer';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  state = {};

  componentWillMount() {
    const match = this.props.match ? this.props.match : null;

    if (match && match.params && match.params.id && match.params.repo) {
      const username = match && match.params && match.params.id ? match.params.id : null;
      const repo = match && match.params && match.params.repo ? match.params.repo : null;
      this.props.onSetUsername(username);
      this.props.onSetRepo(repo);
      this.props.onFetchReadme();
      return;
    }

    if (match && match.params && match.params.id) {
      const username = match.params.id;
      if (this.props.onSetUsername && this.props.onSubmitForm) {
        this.props.onSetUsername(username);
        this.props.onSubmitForm();
      }
    }
  }

  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.props.username && this.props.username.trim().length > 0) {
      window.location.href = `/${this.props.username}`;
    }
  }

  renderReposList = () => {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <section>
        <h2>Fetch Github Repos by username!</h2>
        <form onSubmit={this.onSubmitForm}>
          <label htmlFor="username">
          Show Github repositories by
            <span className="at-prefix">@</span>
            <input
              id="username"
              type="text"
              placeholder="sinisbad123"
              value={this.props.username}
              onChange={this.props.onChangeUsername}
            />
          </label>
        </form>
        <ReposList {...reposListProps} />
      </section>
    );
  }

  renderReadmeMarkdown = () => {
    const { readme, username, repo } = this.props;
    const readmeContent = atob(readme.content);

    return (
      <section>
        <a href={`/${username}`}>
          Back to {username}'s repo list
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
  repos: PropTypes.oneOfType([
    PropTypes.array,
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
