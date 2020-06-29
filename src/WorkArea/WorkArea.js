import React from 'react';
import { Container } from 'react-bootstrap';
import { Switch, Route, Redirect } from 'react-router-dom';

import TasksList from 'WorkArea/TasksList/TasksList.js';
import TaskDetails from 'WorkArea/TaskDetails/TaskDetails.js';
import CreateTask from 'WorkArea/CreateTask/CreateTask.js';

import InformationPage from 'WorkArea/InformationPage/main.js';
import InstructionsPage from 'WorkArea/InstructionsPage/main.js';
import SettingsPage from 'WorkArea/SettingsPage/main.js';
import ReportsPage from 'WorkArea/ReportsPage/main.js';

class WorkArea extends React.Component {
  render() {
    return (
      <Container className="work-area">
        <Switch>
          <Route exact path="/tasks/" component={TasksList} />
          <Route exact path="/task/:id" component={TaskDetails} />
          <Route exact path="/tasks/create" component={CreateTask} />

          <Route exact path="/information" render={() => <Redirect to='/information/vk' />} />
          <Route exact path="/information/:network" component={InformationPage} />

          <Route exact path="/instructions" component={InstructionsPage} />

          <Route exact path="/settings" component={SettingsPage} />

          <Route exact path="/reports" component={ReportsPage} />

          <Route render={() => <p>Что тут?</p>} />
        </Switch>
      </Container>
    );
  }
}

export default WorkArea;
