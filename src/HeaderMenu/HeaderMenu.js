import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderMenu.less';

import { Button } from 'react-bootstrap';
import { withUser } from '../Core/UserContext.js';

import settingsIcon from './icon-settings.png';

const DEFAULT_PROFILE = {
  avatar: 'https://via.placeholder.com/150',
  UserName: 'Green Wizard',
  role: 'Developer'
};

@withUser
class HeaderMenu extends React.Component {
  logout = e => {
    this.props.User.logout();
  }

  render() {
    const { User } = this.props;
    const profile = Object.assign({}, DEFAULT_PROFILE, User.Profile);
    const UserName = profile.UserName.split(' ');

    return (
      <div className="header-menu">
        <div className="header-controls">
          <Link className="settings-icon" to="/settings/">
            <img src={settingsIcon} alt="settings" />
          </Link>
          <Button onClick={this.logout}>Выйти</Button>
        </div>

        <div className="avatar">
          <div className="avatar-img">
            <img src={profile.avatar} alt="" />
          </div>

          <div className="avatar-text">
            <div className="name"><span>{UserName[0]}</span></div>
            <div className="surname"><span>{UserName[1]}</span></div>
            <div className="position"><span>{profile.role}</span></div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderMenu;
