import React from 'react';
import './main.less';

import { Container, Row, Button } from 'react-bootstrap';

import { withState } from 'Utils/withState.js';
import { withUser } from 'Core/UserContext.js';

const DEFAULT_PROFILE = {
  avatar: 'https://via.placeholder.com/150',
  username: 'Green Wizard',
  role: 'Developer'
};

@withUser
@withState
class SettingsPage extends React.Component {
  state = {
    avatar: '',
    username: '',
    role: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  componentDidMount() {
    const profile = Object.assign(
      {},
      DEFAULT_PROFILE,
      this.props.User.Profile
    );
    this.State(profile);
  }

  onChange = e => {
    this.State({[e.target.name]: e.target.value});
  }

  saveChanges = e =>  {
    // TODO: Send changes to server
    e.preventDefault();
  }

  savePassword = e => {
    // TODO: Send new and old password to server, to initiate procedure of changing password
    e.preventDefault();
  }

  content() {
    return (
      <React.Fragment>
        <Row className="page-header">Настройки</Row>
        <Row>
          <table className="mx-auto">
            <tbody>
              <tr>
                <td>Имя и Фамилия</td>
                <td><input
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                /></td>
              </tr>
              <tr>
                <td>Должность</td>
                <td><input
                  name="role"
                  value={this.state.role}
                  onChange={this.onChange}
                /></td>
              </tr>
            </tbody>
          </table>
        </Row>
        <Row>
          <Button className="mx-auto" onClick={this.saveChanges}>Сохранить</Button>
        </Row>
        <Row>
          <table className="mx-auto">
            <tbody>
              <tr>
                <td>Cтарый пароль</td>
                <td><input
                  name="oldPassword"
                  value={this.state.oldPassword}
                  onChange={this.onChange}
                /></td>
              </tr>
              <tr>
                <td>Новый пароль</td>
                <td><input
                  name="newPassword"
                  value={this.state.newPassword}
                  onChange={this.onChange}
                /></td>
              </tr>
              <tr>
                <td>Повторите пароль</td>
                <td><input
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                /></td>
              </tr>
            </tbody>
          </table>
        </Row>
        <Row>
          <Button
            className="mx-auto"
            onClick={this.savePassword}
            disabled={
              this.state.newPassword.length === 0 ||
              this.state.newPassword !== this.state.confirmPassword
            }
          >Сохранить</Button>
        </Row>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Container className="settings-page">
        {this.content()}
      </Container>
    );
  }
}

export default SettingsPage;
