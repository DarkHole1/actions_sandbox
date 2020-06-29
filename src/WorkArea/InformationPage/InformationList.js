import React from 'react';

import LoadingSpinner from 'Utils/LoadingSpinner.js';

import { withState } from 'Utils/withState.js';
import { withUser } from 'Core/UserContext.js';

@withUser
@withState
class InformationList extends React.Component {
  state = {
    items: null,
  };

  // TODO: Update when changed filter or network
  update = () => {
    const { network, filter } = this.props;
    // TODO: all() must respect network
    this.props.User.Information
      .all(network)
      .then(items => {
        this.State({ items: items.filter(x => 0 < x.title.indexOf(filter)) });
      });
  }

  render() {
    const { items } = this.state;
    if(!items) return <LoadingSpinner />;

    // TODO: Сделать вывод табл. с элементами
    return (
      null
    );
  }
}

export default InformationList;
