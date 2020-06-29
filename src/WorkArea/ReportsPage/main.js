import React from 'react';
import './main.less';

import { Container, Row } from 'react-bootstrap';

import { withState } from 'Utils/withState.js';
import { withUser } from 'Core/UserContext.js';

@withUser
@withState
class ReportsPage extends React.Component {
  state = {
  };

  content() {
    return (
      <React.Fragment>
        <Row className="page-header">Отчётность</Row>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Container className="reports-page">
        {this.content()}
      </Container>
    );
  }
}

export default ReportsPage;
