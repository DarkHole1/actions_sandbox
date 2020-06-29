import React from 'react';
import './TaskDetails.less';

import { Container, Row, Button } from 'react-bootstrap';
import LoadingSpinner from 'Utils/LoadingSpinner.js';

import TaskHeader from './TaskHeader.js';
import CommonProperties from './CommonProperties.js';
import HistoryView from './HistoryView.js';
import DayStats from './DayStats.js';

import { CDate } from 'Utils/Date.js';
import { withState, updateState } from 'Utils/withState.js';
import { withUser } from 'Core/UserContext.js';
import objectDiff from 'Utils/objectDiff.js';

@withUser
@withState
class TaskDetails extends React.Component {
  state = {
    id: this.props.match.params.id,
    taskOldInfo: null,
    taskInfo: null,
    changes: {},
    currentDay: null,
  };

  historyValues(date, mapping, history) {
    if(!history) return {};

    const values = history[ new CDate(date).asDottedString() ] || {};
    const res = {};
    for(const { field } of mapping) {
      res[field] = values[field];
    }
    return res;
  }

  values2history(date, mapping, values) {
    if(!values) return {};

    const history = {};
    const subres = {};
    for(const { field } of mapping) {
      subres[field] = values[field];
    }

    history[ new CDate(date).asDottedString() ] = subres;
    return history;
  }

  fieldsMapping({ network, type }) {
    // TODO: Impl. mapping from task.type and task.network
    return [{ title: 'Охват', field: 'coverage' }];
  }

  update() {
    this.props.User.Tasks
      .get(this.state.id)
      .then(taskInfo => {
        const date = new Date();
        const mapping = this.fieldsMapping(taskInfo);
        const currentDay = { date, mapping, values: this.historyValues(date, mapping, taskInfo.history) };
        this.State({ taskInfo, taskOldInfo: taskInfo, changes: {}, currentDay });
      });
  }

  componentDidMount() {
    this.update();
  }

  changeTask = prop => {
    this.State(({ taskInfo, taskOldInfo }) => {
      const newTaskInfo = updateState(taskInfo, prop);
      const changes = objectDiff(taskOldInfo, newTaskInfo);
      return { taskInfo: newTaskInfo, changes };
    });
  }

  changeDay = date => {
    this.State(({ currentDay }) => {
      return {
        currentDay: {
          ...currentDay,
          date: date,
          values: this.historyValues(date, currentDay.mapping, this.state.taskInfo.history)
        }
      };
    });
  }

  changeStat = stat => {
    this.State(({ currentDay }) => {
      return {
        currentDay: {
          ...currentDay,
          values: {
            ...currentDay.values,
            ...stat
          }
        }
      };
    });
  }

  saveChanges = e => {
    e.preventDefault();

    this.props.User.Tasks
      .update(this.state.id, this.state.changes)
      .then(this.update.bind(this));

    this.State({ taskInfo: null, taskOldInfo: null, changes: null });
  }

  saveStat = e => {
    e.preventDefault();
    const { date, mapping, values } = this.state.currentDay;
    const history = this.values2history(date, mapping, values);
    console.log(history);

    this.props.User.Tasks
      .update(this.state.id, { history })
      .then(this.update.bind(this));

    this.State({ taskInfo: null, taskOldInfo: null, changes: null });
  }

  content() {
    const { taskInfo } = this.state;

    if(taskInfo === null) {
      return <LoadingSpinner />;
    }

    return (
      <React.Fragment>
        <Row className="page-header">
          <TaskHeader task={this.state.taskOldInfo} />
        </Row>

        <Row>
          <CommonProperties task={taskInfo} onChange={this.changeTask} />
        </Row>

        <Row>
          <Button
            className="mx-auto"
            onClick={this.saveChanges}
            disabled={Object.keys(this.state.changes).length === 0}
          >Сохранить</Button>
        </Row>

        <Row>
          <DayStats
            {...this.state.currentDay}
            onChangeDay={this.changeDay}
            onChangeStat={this.changeStat}
          />
        </Row>

        <Row>
          <Button
            className="mx-auto"
            onClick={this.saveStat}
          >Добавить показатели за день</Button>
        </Row>

        <Row>
          <HistoryView history={taskInfo.history} />
        </Row>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Container className="task-details-page">
        {this.content()}
      </Container>
    );
  }
}

export default TaskDetails;
