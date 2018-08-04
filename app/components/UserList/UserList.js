import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';

const ReposList = ({ loading, error, userList }) => {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (userList !== false) {
    return <List items={userList} component={RepoListItem} />;
  }

  return null;
};

ReposList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  userList: PropTypes.any
};

export default ReposList;
