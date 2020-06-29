import React from 'react';

class Polling extends React.Component {
  update = () => this.props.update();

  componentDidMount() {
    this.update();
    let period = this.props.period ? (0 + this.props.period) : (60 * 1000);
    this.fetchTimer = setInterval(this.update, period);
  }

  componentWillUnmount() {
    this.fetchTimer && clearInterval(this.fetchTimer);
  }

  render() {
    return null;
  }
}

export default Polling;
