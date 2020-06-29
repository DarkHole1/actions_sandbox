import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

class SelectNext extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    titles: PropTypes.arrayOf(PropTypes.string).isRequired,
    views: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.func
    ]).isRequired
  }

  select(id) {
    let nextView = null;
    if(typeof this.props.views === 'function') {
      nextView = this.props.views(id);
    } else {
      nextView = this.props.views[id];
    }
    this.props.onSave({ isValid: !!nextView, [this.props.name]: id, nextView });
  }

  render() {
    return (
      <Container>
        {this.props.titles.map((title, id) => (
          <Row key={title} onClick={this.select.bind(this, id)}>
            <Col className="flex-grow-0 p-0">
              <input
                type="radio"
                value={id}
                checked={id === this.props[this.props.name]}
                onChange={this.select.bind(this, id)}
              />
            </Col>
            <Col className="flex-grow-1 text-left">
              {title}
            </Col>
          </Row>
        ))}
      </Container>
    );
  }
}

export default SelectNext;
