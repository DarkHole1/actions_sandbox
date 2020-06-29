import React from 'react';
import './main.less';

import { Redirect } from 'react-router-dom';
import { Container, Row, Button } from 'react-bootstrap';

import NavList from 'components/NavList';
import InformationList from './InformationList.js';

import { withState } from 'Utils/withState.js';
import { withUser } from 'Core/UserContext.js';

const SOCIAL_NETWORKS = [
  {title: 'VK', url: 'vk'},
  {title: 'OK', url: 'ok'},
  {title: 'YouTube', url: 'youtube'},
  {title: 'Instagram', url: 'instagram'},
  {title: 'TikTok', url: 'tiktok'},
];

@withUser
@withState
class InformationPage extends React.Component {
  state = {
    network: null,
    filter: '',
    GoTo: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const { network } = this.props.match.params;
    if(this.state.network !== network) {
      this.State({ network });
    }
  }

  changeFilter = e => {
    e.preventDefault();
    this.State({ filter: e.target.value });
  }

  createTask = e => {
    e.preventDefault();
    this.State({ GoTo: '/information/create/' + this.state.network });
  }

  controls() {
    if(this.state.GoTo) {
      return <Redirect to={this.state.GoTo} push />
    }

    return (
      <Row className="controls">
        <input value={this.state.filter} onChange={this.changeFilter} className="filter" />
        <Button onClick={this.createTask}>Добавить</Button>
      </Row>
    );
  }

  render() {
    return (
      <Container className="information-page">
        <Row>
          <NavList items={SOCIAL_NETWORKS} className="social-networks" />
        </Row>

        {this.controls()}

        <Row className="information-list">
          <InformationList network={this.state.network} filter={this.state.filter} />
        </Row>
      </Container>
    );
  }
}

export default InformationPage;
