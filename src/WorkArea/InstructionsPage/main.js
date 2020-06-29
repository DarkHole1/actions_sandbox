import React from 'react';
import './main.less';

import { Container, Row } from 'react-bootstrap';

import { withState } from 'Utils/withState.js';
import { withUser } from 'Core/UserContext.js';

@withUser
@withState
class InstructionsPage extends React.Component {
  state = {
  };

  content() {
    return (
      <React.Fragment>
        <Row className="page-header">
          Инструкции
        </Row>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Container className="instructions-page">
        {this.content()}
      </Container>
    );
  }
}

export default InstructionsPage;
