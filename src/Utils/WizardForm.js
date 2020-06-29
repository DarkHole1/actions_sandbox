import React from 'react';
import './WizardForm.less';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { withState, updateState } from 'Utils/withState.js';

const DEFAULT_LOCALIZATION = {
  NEXT: 'Далее',
  PREV: 'Назад',
  SAVE: 'Сохранить',
};

@withState
class WizardForm extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      stage: 0,
      stages: [{ StageData: {}, StageView: p.root }],
    };
  }

  doSwitch(N) {
    const { onSwitch } = this.props;
    if(onSwitch) onSwitch(N);
  }

  onNext = () => {
    this.State(({ stage, stages }) => {
      const prev = stages[stage].StageData;
      stages = [...stages, { StageData: {}, StageView: prev.nextView }];
      this.doSwitch(stage + 1);
      return { stage: stage + 1, stages };
    });
  }

  onPrev = () => {
    this.State(({ stage, stages }) => {
      this.doSwitch(stage - 1);
      return { stage: stage - 1, stages: stages.slice(0, stage) };
    });
  }

  onSubmit = () => {
    this.State(({ stage, stages }) => {
      const curr = stages[stage].StageData;
      this.doSwitch(-1);
      return { SubmitView: curr.submit() };
    });
  }

  saveStage = (newState) => {
    this.State(({ stage, stages }) => {
      const newStages = stages.slice(0, 1 + stage);
      newStages[stage].StageData = updateState(newStages[stage].StageData || {}, newState);
      return { stages: newStages };
    });
  }

  render() {
    const { stage, SubmitView } = this.state;
    if(SubmitView) {
      console.log(SubmitView);
      return(
        <SubmitView
          stages={this.state.stages.map(x => x.StageData).reverse()}
        />
      )
    }

    const { StageData, StageView } = this.state.stages[stage];
    const lang = Object.assign({}, DEFAULT_LOCALIZATION, this.props.localization);
    const isValid = ('function' === typeof(StageData.isValid)) ? StageData.isValid(StageData) : StageData.isValid;

    return (
      <Container className={`wizard-form ${ this.props.className || '' }`}>
        <Row>
          <div className="header">{this.props.title}</div>
        </Row>

        <Row className="content">
          <StageView
            {...StageData}
            onSave={this.saveStage}
          />
        </Row>

        <Row className="controls">
          <Col>
            <Button onClick={this.onPrev} disabled={stage <= 0}>{lang.PREV}</Button>
          </Col>

          <Col>
            {StageData.submit ? (
              <Button onClick={this.onSubmit} disabled={!isValid}>{lang.SAVE}</Button>
            ) : (
              <Button onClick={this.onNext} disabled={!isValid}>{lang.NEXT}</Button>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default WizardForm;
