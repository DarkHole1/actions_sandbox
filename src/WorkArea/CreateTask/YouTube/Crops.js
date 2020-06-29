import React from 'react';

import { Submitter } from '../Misc/SubmitForm.js';
import CommonTaskSettings from '../Misc/CommonTaskSettings.js';
import CoverageTaskSettings from '../Misc/CoverageTaskSettings.js';

function submitCallback({ stages }, User) {
  const { artist, track, description, date, coverage, subscribers } = stages[0];

  return User.Tasks.createYouTubeCrops(
    artist, track, description, date, coverage, subscribers
  );
}

class YTCropsTask extends React.Component {
  componentDidMount() {
    this.props.onSave({
      isValid: this.isValid,
      submit: Submitter(submitCallback)
    });
  }

  isValid = ({ artist, track, coverage, subscribers, date }) => {
    if(!artist) return false;
    if(!track) return false;
    if(!coverage && !subscribers) return false;
    if(!date) return false;

    return true;
  }

  handleChange = data => {
    this.props.onSave(data);
  }

  handleCoverageChange = (id, value) => {
    const names = ['coverage', 'subscribers'];
    this.props.onSave({ [names[id]]: value });
  }

  render() {
    return (
      <div className="task-properties w-100">
        <table>
          <tbody>
            <tr className='task-title'><td colSpan='2'>Посев в YouTube</td></tr>
            <CommonTaskSettings
              artist={this.props.artist || ''}
              track={this.props.track || ''}
              date={this.props.date}
              description={this.props.description || ''}
              onChange={this.handleChange}
            />

            <CoverageTaskSettings
              values={[this.props.coverage, this.props.subscribers]}
              names={['Охват', 'Кол-во подписчиков']}
              onChange={this.handleCoverageChange}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

export default YTCropsTask;
