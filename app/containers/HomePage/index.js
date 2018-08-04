import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectReadme,
  makeSelectLoading,
  makeSelectError
} from 'containers/App/selectors';
import { loadRepos, loadReadme } from '../App/actions';
import { changeUsername, changeRepo } from './actions';
import { makeSelectUsername, makeSelectRepo } from './selectors';
import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
  onSetUsername: (text) => dispatch(changeUsername(text)),
  onSetRepo: (text) => dispatch(changeRepo(text)),
  onSubmitForm: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadRepos());
  },
  onFetchReadme: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadReadme());
  }
});

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  readme: makeSelectReadme(),
  repo: makeSelectRepo(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
