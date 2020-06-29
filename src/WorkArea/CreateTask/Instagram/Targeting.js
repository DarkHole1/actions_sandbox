import React from 'react';

import { Submitter } from '../Misc/SubmitForm.js';
import CommonTaskSettings from '../Misc/CommonTaskSettings.js';
import CoverageTaskSettings from '../Misc/CoverageTaskSettings.js';

function submitCallback({ stages }, User) {
  const { artist, track, description, date, coverage, coverageStories } = stages[0];

  return User.Tasks.createInstagramTargeting(
    artist, track, description, date, coverage, coverageStories
  );
}

class InstagramTargetingTask extends React.Component {
  componentDidMount() {
    this.props.onSave({
      isValid: this.isValid,
      submit: Submitter(submitCallback)
    });
  }

  isValid = ({ artist, track, coverage, coverageStories, date }) => {
    if(!artist) return false;
    if(!track) return false;
    if(!coverage && !coverageStories) return false;
    if(!date) return false;

    return true;
  }

  handleChange = data => {
    this.props.onSave(data);
  }

  handleCoverageChange = (id, value) => {
    const names = ['coverage', 'coverageStories'];
    this.props.onSave({ [names[id]]: value });
  }

  render() {
    return (
      <div className="task-properties w-100">
        <table>
          <tbody>
            <tr className='task-title'><td colSpan='2'>Таргетинг в Intagram</td></tr>
            <CommonTaskSettings
              artist={this.props.artist || ''}
              track={this.props.track || ''}
              date={this.props.date}
              description={this.props.description || ''}
              onChange={this.handleChange}
            />

            <CoverageTaskSettings
              values={[this.props.coverage, this.props.coverageStories]}
              names={['Охват постов', 'Охват stories']}
              onChange={this.handleCoverageChange}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

export default InstagramTargetingTask;
