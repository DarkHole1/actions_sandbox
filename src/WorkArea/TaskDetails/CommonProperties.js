import React from 'react';

import { Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { CDate } from 'Utils/Date.js';

class CommonProperties extends React.Component {
  updateDate = date => {
    this.props.onChange({ date: new CDate(date) });
  }

  updateText = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
  }

  render () {
    // TODO: Подсветка поля, если его изменили
    const { date, description, track, artist } = this.props.task;
    return (
      <div className="common-properties">
        <Table>
          <tbody>
            <tr>
              <td className="property-title">Артист:</td>
              <td className="property-value">
                <input
                  value={artist ? artist : ''}
                  name='artist'
                  onChange={this.updateText}
                />
              </td>
            </tr>

            <tr>
              <td className="property-title">Трек:</td>
              <td className="property-value">
                <input
                  value={track ? track : ''}
                  name='track'
                  onChange={this.updateText}
                />
              </td>
            </tr>

            <tr>
              <td className="property-title">Дата дедлайна:</td>
              <td className="property-value">
                <DatePicker
                  selected={date.asDate()}
                  onChange={this.updateDate}
                  dateFormat="dd.MM.yyyy"
                  minDate={null}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={2} className="property-title">Описание задачи</td>
            </tr>
            <tr>
              <td colSpan={2} className="property-value">
                <textarea
                  className="w-100"
                  value={description ? description : ''}
                  name='description'
                  onChange={this.updateText}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CommonProperties;
