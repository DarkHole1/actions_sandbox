import React from 'react';

import { Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import NumberFormat from 'react-number-format';

class DayStats extends React.Component {
  state = {
    date: null,
  };

  handleChange = (i, { floatValue }) => {
    this.props.onChangeStat({ [this.props.mapping[i].field]: floatValue });
  }

  changeDate = date => {
    this.props.onChangeDay(date);
  }

  render () {
    return (
      <div className="day-stats">
        <Table>
          <tbody>
            <tr className='title'><td colSpan='2'>Показатели за день</td></tr>
            <tr>
              <td className="property-title">Дата:</td>
              <td className="property-value">
                <DatePicker
                  selected={this.props.date}
                  onChange={this.changeDate}
                  dateFormat="dd.MM.yyyy"
                />
              </td>
            </tr>

            {this.props.mapping.map((x, i) => (
              <tr key={i}>
                <td className="property-title">{x.title}:</td>
                <td className="property-value">
                  <NumberFormat
                    thousandSeparator={' '}
                    value={this.props.values[x.field] || 0}
                    onValueChange={this.handleChange.bind(this, i)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default DayStats;
