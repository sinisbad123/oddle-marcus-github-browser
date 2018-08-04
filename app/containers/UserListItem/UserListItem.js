/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'components/ListItem';
import './style.scss';

export default class UserListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { item } = this.props;
    let userUrl = '';


    if (item && item.login) {
      const login = item.login || null;
      if (login) {
        userUrl = `/${login}`;
      }
    }

    // Put together the content of the repository
    let content = null;
    if (item) {
      content = (
        <div className="repo-list-item">
          <img className="repo-list-item__avatar" src={item.avatar_url} alt="av" />
          <a className="repo-list-item__repo-link" href={userUrl}>
            {item.login}
          </a>
          {/* <a className="repo-list-item__issue-link" href={`${item.html_url}/issues`} target="_blank" rel="noopener noreferrer">
            <IssueIcon className="repo-list-item__issue-icon" />
            {item.open_issues_count}
          </a> */}
        </div>
      );
    }

    let listItem = null;
    if (item) {
      listItem = <ListItem key={`repo-list-item-${item.full_name}`} item={content} />;
    }

    // Render the content into a list item
    return listItem;
  }
}

UserListItem.propTypes = {
  item: PropTypes.object,
};
