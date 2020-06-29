import React from 'react';
import './AuthView.less';

import { withUser } from '../Core/UserContext.js';
import HeaderMenu from '../HeaderMenu/HeaderMenu.js';
import SideBar from '../SideBar/SideBar.js';
import WorkArea from '../WorkArea/WorkArea.js';

@withUser
class AuthView extends React.Component {
  render() {
    // const { User } = this.props;
    return (
      <div className="auth-view">
        <HeaderMenu />
        <div className="main-area">
          <SideBar />
          <WorkArea />
        </div>
      </div>
    );
  }
}

export default AuthView;
