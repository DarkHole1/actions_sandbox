import React from 'react';
import './HttpErrorsPopup.less';

import { axiosInstance } from 'Core/defaultHttp.js';
import { withState } from 'Utils/withState.js';

@withState
class HttpErrorsPopup extends React.Component {
  state = {
    title: null,
    msg: null,
    timestamp: null
  };
  timer = null;

  clearTimer = () => {
    this.timer && clearTimeout(this.timer);
    this.timer = null;
  }

  resetTimer = () => {
    this.clearTimer();
    const period = this.props.period ? (0 + this.props.period) : (30 * 1000);
    this.timer = setTimeout(this.hide, period);
  }

  hide = () => {
    this.clearTimer();
    this.State({ title: null, msg: null, timestamp: null })
  }

  raiseError(title, msg) {
    this.State({ title, msg, timestamp: Date.now() });
  }

  onError = error => {
    const { status, statusText } = error.response || {status: 0, statusText: 'Unknown HTTP error.'};
    this.raiseError('HTTP error #' + status, statusText);

    return Promise.reject(error);
  }

  onResponse = response => {
    const { error } = response.data;
    if(error) {
      this.raiseError('Ошибка', error);
      return Promise.reject(error);
    }
    return response;
  }

  componentDidMount() {
    axiosInstance.interceptors.response.use(this.onResponse, this.onError);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state.timestamp !== prevState.timestamp) {
      this.resetTimer();
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    if(!this.state.msg) return null;

    return (
      <div id="HttpErrorsPopup">
        <div onClick={this.hide}>
          <div className="error-title">{this.state.title}</div>
          <div className="error-msg">{this.state.msg}</div>
        </div>
      </div>
    );
  }
}

export default HttpErrorsPopup;
