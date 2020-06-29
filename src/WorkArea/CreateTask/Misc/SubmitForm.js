import React from 'react';
import { Redirect } from 'react-router-dom';

import { withState } from 'Utils/withState.js';
import { withUser } from 'Core/UserContext.js';
import LoadingSpinner from 'Utils/LoadingSpinner.js';

@withUser
@withState
class SubmitForm extends React.Component {
  state = { loading: true };

  done = () => {
    this.State({ loading: false });
  }

  componentDidMount() {
    const { callback, User } = this.props;
    callback(this.props, User).then(this.done, this.done);
  }

  render() {
    if(this.state.loading) {
      return ( <LoadingSpinner /> );
    }

    return ( <Redirect to="/tasks/" /> );
  }
}

function Submitter(callback) {
  return function() {
    return function(props) {
      return( <SubmitForm {...props} callback={callback} /> );
    };
  };
}

export { Submitter, SubmitForm };
