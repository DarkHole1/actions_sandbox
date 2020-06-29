import React from 'react';
import NumberFormat from 'react-number-format';
import './CoverageTaskSettings.less';

class CoverageTaskSettings extends React.Component {
  handleChange = (i, { floatValue }) => {
    this.props.onChange(i, floatValue);
  }

  render() {
    if(this.props.names.length <= 0) return null;

    return this.props.names.map((name, i) => (
      <tr key={name}>
        <td className="property-title">{name}</td>
        <td>
          <NumberFormat
            thousandSeparator={' '}
            value={this.props.values[i]}
            required
            className="coverage"
            onValueChange={this.handleChange.bind(this, i)}
            />
        </td>
      </tr>
    ));
  }
}

export default CoverageTaskSettings;
