/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

const makeSelectRepo = () => createSelector(
  selectHome,
  (homeState) => homeState.get('repo')
);

export {
  selectHome,
  makeSelectUsername,
  makeSelectRepo
};
