/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_USER_LIST = 'oddle/App/LOAD_USER_LIST';
export const LOAD_REPOS = 'oddle/App/LOAD_REPOS';
export const LOAD_README = 'oddle/App/LOAD_README';
export const LOAD_README_SUCCESS = 'oddle/App/LOAD_README_SUCCESS';
export const LOAD_README_ERROR = 'oddle/App/LOAD_README_ERROR';
export const LOAD_USER_LIST_SUCCESS = 'oddle/App/LOAD_USER_LIST_SUCCESS';
export const LOAD_USER_LIST_ERROR = 'oddle/App/LOAD_USER_LIST_ERROR';
export const LOAD_REPOS_SUCCESS = 'oddle/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'oddle/App/LOAD_REPOS_ERROR';
export const DEFAULT_LOCALE = 'en';
