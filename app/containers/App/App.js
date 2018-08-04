/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import UserPage from 'containers/UserPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './style.scss';

class App extends React.Component {
  state = {
    selectedTheme: 'default',
  };

  onThemeChange = (theme) => {
    this.setState({ selectedTheme: theme });
  }

  render() {
    const selectedTheme = this.state.selectedTheme !== 'default'
      ? 'mozillian-theme'
      : '';
    return (
      <div className={`app-wrapper ${selectedTheme}`}>
        <Helmet
          titleTemplate="%s - Github browser and README scraper"
          defaultTitle="A Oddle-Marcus web app"
        >
          <meta name="description" content="A Oddle-Marcus web app" />
        </Helmet>
        <Header
          onThemeChange={this.onThemeChange}
          selectedTheme={this.state.selectedTheme}
        />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/:id" component={UserPage} />
          <Route exact path="/:id/:repo" component={UserPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
