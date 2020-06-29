import React from 'react';

import { NavLink } from 'react-router-dom';

class NavList extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.items.map((x, i) => (
          <NavLink className="item" activeClassName="active-item" to={x.url || ("/" + i)} key={i}>
            {x.title}
          </NavLink>
        ))}
      </div>
    );
  }
}

export default NavList;
