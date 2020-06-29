import React from 'react';

import OKTargetsView from 'components/OKTargetsView/main.js';

import { Submitter } from '../Misc/SubmitForm.js';
import CommonTaskSettings from '../Misc/CommonTaskSettings.js';
import CoverageTaskSettings from '../Misc/CoverageTaskSettings.js';

function submitCallback({ stages }, User) {
  const { artist, track, description, date, coverage } = stages[0];

  return User.Tasks.createOKCrops(
    artist, track, description, date, coverage
  );
}

class OKCropsTask extends React.Component {
  componentDidMount() {
    this.props.onSave({
      isValid: this.isValid,
      submit: Submitter(submitCallback)
    });
  }

  isValid = ({ artist, track, coverage, date }) => {
    if(!artist) return false;
    if(!track) return false;
    if(!coverage) return false;
    if(!date) return false;

    return true;
  }

  handleChange = data => {
    this.props.onSave(data);
  }

  handleCoverageChange = (id, value) => {
    const names = ['coverage'];
    this.props.onSave({ [names[id]]: value });
  }

  render() {
    return (
      <div className="task-properties w-100">
        <table>
          <tbody>
            <tr className='task-title'><td colSpan='2'>Посев в Odnoklassniki.ru</td></tr>
            <CommonTaskSettings
              artist={this.props.artist || ''}
              track={this.props.track || ''}
              date={this.props.date}
              description={this.props.description || ''}
              onChange={this.handleChange}
            />

            <CoverageTaskSettings
              values={[this.props.coverage, this.props.coverageStories]}
              names={['Охват']}
              onChange={this.handleCoverageChange}
            />

            <tr>
              <td colSpan="2" className="property-title">Базы:</td>
            </tr>

            <tr>
              <td colSpan="2">
                <OKTargetsView />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default OKCropsTask;
