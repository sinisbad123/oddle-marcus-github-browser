/*
 * UserPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import MarkdownRenderer from 'react-markdown-renderer';
import './style.scss';

export default class UserPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
        <a href="/">
          Back to home
        </a>
        <h3>{`${this.props.username}'s repositories`}</h3>
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
          Back to {username}&#39;s repo list
        </a>
        <h2>{`${username}'s ${repo}`}</h2>
        <MarkdownRenderer markdown={readmeContent} />
      </section>
    );
  }

  render() {
    const { readme, username } = this.props;
    let renderBodyComponent = this.renderReposList();

    if (readme) {
      renderBodyComponent = this.renderReadmeMarkdown();
    }

    return (
      <article>
        <Helmet>
          <title>{`${username}'s repositories`}</title>
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

UserPage.propTypes = {
  readme: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
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
