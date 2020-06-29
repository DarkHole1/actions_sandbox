import React from 'react';

import { Chart } from 'react-charts';
import { history2series } from 'Utils/history2series.js';

class HistoryView extends React.Component {
  CHART_SERIES = { type: 'line' };
  CHART_AXES = [
    { primary: true, type: 'ordinal', position: 'bottom' },
    { type: 'linear', position: 'left', stacked: false }
  ];

  render () {
    const { history } = this.props;
    return (
      <div className="history-chart">
        <Chart data={history2series(history)} series={this.CHART_SERIES} axes={this.CHART_AXES} />
      </div>
    );
  }
}

export default HistoryView;
