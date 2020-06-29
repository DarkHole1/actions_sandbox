import React from 'react';
import './TasksList.less';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

import TasksListItem from './TasksListItem.js';

import LoadingSpinner from 'Utils/LoadingSpinner.js';
import Polling from 'Utils/Polling.js';
import { withState } from 'Utils/withState.js';
import { withUser } from 'Core/UserContext.js';

@withUser
@withState
class TasksList extends React.Component {
  state = {
    GoTo: null,
    tasks: null,
  }

  fetchList = () => {
    this.props.User.Tasks
      .all()
      .then(tasks => this.State({ tasks }));
  }

  createTask = () => {
    this.State({ GoTo: '/tasks/create' });
  }

  openDetails = (id) => {
    this.State({ GoTo: `/task/${id}` });
  }

  render() {
    if(this.state.GoTo) return(
      <Redirect to={this.state.GoTo} push />
    );

    const controls = (
      <Row className="controls">
        <Col>
          <Button onClick={this.createTask}>Создать</Button>
        </Col>
      </Row>
    );

    let table = null;
    if(this.state.tasks === null) {
      table = <LoadingSpinner />;
    } else {
      table = (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Название</th>
              <th>Дата дедлайна</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks.map(task => (
              <TasksListItem {...task} onClick={this.openDetails} key={task.id} />
            ))}
          </tbody>
        </Table>
      );
    }

    return (
      <Container className="tasks-list-area">
        <Polling update={this.fetchList} period={process.env.REACT_APP_PING_DELAY} />
        {controls}
        <Row>
          {table}
        </Row>
        {controls}
      </Container>
    );
  }
}

export default TasksList;
