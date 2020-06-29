import React from 'react';

import { Container } from 'react-bootstrap';

import LoadingSpinner from 'Utils/LoadingSpinner.js';
import { withState } from 'Utils/withState.js';

@withState
class TikTokTargetsView extends React.Component {
  state = {
    items: null,
  };

  render() {
    let content = null;
    if(null !== this.state.items) {
    } else {
      content = <LoadingSpinner />;
    }
    return (
      <Container>
        {content}
      </Container>
    );
  }
}

export default TikTokTargetsView;
