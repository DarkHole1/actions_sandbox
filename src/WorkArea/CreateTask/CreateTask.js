import React from 'react';
import './CreateTask.less';

import { Prompt } from 'react-router-dom';

import WizardForm from 'Utils/WizardForm.js';
import TargetingSelector from './TargetingSelector.js';
import CropsSelector from './CropsSelector.js';

import SelectNext from './Misc/SelectNext.js';

function TaskKindSelector(props) {
  const TASK_KIND_TITLES = ['Таргетинг', 'Посевы'];
  const TASK_KIND_VIEWS = [TargetingSelector, CropsSelector];
  return <SelectNext {...props} name="taskKind" titles={TASK_KIND_TITLES} views={TASK_KIND_VIEWS} />;
}

const CLOSE_MESSAGE = 'Заполненные данные не сохранятся. Вы точно хотите продолжить?';

class CreateTask extends React.Component {
  state = {
    lastPage: false,
  };

  beforeUnload = e => {
    if(this.state.lastPage) {
      e.preventDefault();
      return CLOSE_MESSAGE;
    }
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.beforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.beforeUnload);
  }

  onSwitch = (index) => {
    this.setState({ lastPage: 2 === index });
  }

  render() {
    return (
    <>
      <Prompt when={this.state.lastPage} message={CLOSE_MESSAGE} />
      <WizardForm title="Новая задача" root={TaskKindSelector} onSwitch={this.onSwitch} className="create-task" />
    </>
    );
  }
}

export default CreateTask;
