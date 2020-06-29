import React from 'react';
import './App.less';

import { Container } from 'react-bootstrap';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginPage from 'LoginPage/LoginPage.js';
import AuthView from 'AuthView/AuthView.js';
import Polling from 'Utils/Polling.js';
import LoadingSpinner from 'Utils/LoadingSpinner.js';
import HttpErrorsPopup from 'Utils/HttpErrorsPopup.js';

import { withState } from 'Utils/withState.js';
import { withUser } from 'Core/UserContext.js';

@withUser
@withState
class App extends React.Component {
  state = { confirmedAuth: false };
  ping = () => {
    this.props.User
      .ping()
      .then(x => {
        this.State({ confirmedAuth: true });
        return x;
      });
  }

  render() {
    const { User } = this.props;
    return (
    <>
      <HttpErrorsPopup />
      <Container className="main-container">
        <Polling update={this.ping} period={process.env.REACT_APP_PING_DELAY} />
        {this.state.confirmedAuth ? (
          <>
            {User.isLogged() ? (
              <AuthView />
            ) : (
              <Switch>
                <Route path="/" exact render={() => <LoginPage />} />
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            )}
          </>
        ) : (
          <LoadingSpinner />
        )}
      </Container>
    </>
    );
  }
}

export default App;
