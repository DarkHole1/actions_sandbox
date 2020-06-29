import React from 'react';

import { Modal, Button, Form } from 'react-bootstrap';

import { withUser } from '../Core/UserContext.js';
import { withState } from '../Utils/withState.js';
import LoadingSpinner from '../Utils/LoadingSpinner.js';

@withUser
@withState
class LoginPage extends React.Component {
  state = {
    loading: false,
    login: '',
    password: ''
  };

  submit = e => {
    e.preventDefault();
    this.State({loading: true});
    const {login, password} = this.state;
    const {User} = this.props;
    User.login(login, password).finally(() => this.State({loading: false}));
  }

  onChange = e => {
    const {name, value} = e.target;
    this.State({[name]: value});
  }

  render() {
    const {login, password, loading} = this.state;
    const valid = (6 <= login.length) && (6 <= password.length);

    return (
    <form onSubmit={this.submit}>
      <Modal.Dialog centered>
        <Modal.Header>
          <Modal.Title>Вход в систему</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loading ? (
            <LoadingSpinner />
          ) : (<>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Логин:</Form.Label>
              <Form.Control type="text" name="login" onChange={this.onChange} value={login} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Пароль:</Form.Label>
              <Form.Control type="password" name="password" onChange={this.onChange} value={password} />
            </Form.Group>
          </>)}
        </Modal.Body>

        {!loading && (
          <Modal.Footer>
            <Button variant="primary" disabled={!valid} type='submit'>Войти</Button>
          </Modal.Footer>
        )}
      </Modal.Dialog>
    </form>
    );
  }
}

export default LoginPage;
