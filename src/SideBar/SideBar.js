import React from 'react';
import './SideBar.less';

import NavList from 'components/NavList';

const ITEMS = [
  {title: 'Задачи', url: '/tasks/'},
  {title: 'Отчётность', url: '/reports/'},
  {title: 'Базы', url: '/information/'},
  {title: 'Инструкции', url: '/instructions/'}
];

class SideBar extends React.Component {
  render() {
    return (
      <NavList items={ITEMS} className="sidebar" />
    );
  }
}

export default SideBar;
