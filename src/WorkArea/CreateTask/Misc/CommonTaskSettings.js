import React from 'react';
import DatePicker from 'react-datepicker';

class CommonTaskSettings extends React.Component {
  updateText = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
  }

  updateDate = date => {
    this.props.onChange({ date });
  }

  minDate() {
    var result = new Date();
    result.setDate(result.getDate() + 1);
    return result;
  }

  render() {
    return (
      <>
        <tr>
          <td className="property-title">Артист</td>
          <td>
            <input
              value={this.props.artist || ''}
              name='artist'
              onChange={this.updateText}
            />
          </td>
        </tr>
        <tr>
          <td className="property-title">Трек</td>
          <td>
            <input
              value={this.props.track || ''}
              name='track'
              onChange={this.updateText}
            />
          </td>
        </tr>
        <tr>
          <td className="property-title">Дата</td>
          <td>
            <DatePicker
              selected={this.props.date}
              onChange={this.updateDate}
              dateFormat="dd.MM.yyyy"
              minDate={this.minDate()}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2} className="property-title">Описание задачи</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <textarea
              className="w-100"
              value={this.props.description || ''}
              name='description'
              onChange={this.updateText}
            />
          </td>
        </tr>
      </>
    );
  }
}

export default CommonTaskSettings;
