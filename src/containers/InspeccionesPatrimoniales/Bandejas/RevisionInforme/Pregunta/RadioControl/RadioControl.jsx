import React from 'react';
import { Contenedor } from '../Pregunta.style';
import SupportValidator from '../../../../../../util/support-validator';
import LabelControl from '../LabelControl/LabelControl';
import { Radio } from 'antd';
import { Priority } from '../../../../../../services/constants';

export default class RadioControl extends React.Component {
  constructor(props) {
    super(props);
    const { question } = props;
    const value = this.buildResponseValue(question);
    this.state = { value, errorMessage: null };
  }

  buildResponseValue = question => {
    if (question.value) {
      return question.value;
    }
    const controlResponse = question.controlResponse;
    if (!controlResponse) {
      return null;
    }
    const responseValues = controlResponse.responseValues;
    if (!responseValues || !Array.isArray(responseValues) || responseValues.length === 0) {
      return null;
    }
    const responseValue = responseValues[0];
    // const value = responseValue.engineerResponse || responseValue.inspectorResponse;
    const value = this.evaluatePriorityValue(responseValue);
    const refactorValue = value ? parseInt(value) : null;
    return refactorValue;
  };

  evaluatePriorityValue = responseValue => {
    const priority = responseValue.lastAnswer;
    if (priority === Priority.Engineer) {
      const value = responseValue.engineerResponse || responseValue.inspectorResponse;
      return value;
    }
    const value = responseValue.inspectorResponse;
    return value;
  };

  componentDidMount() {
    const { value } = this.state;
    const pristine = !value;
    this.isValid(value, pristine);
  }

  onPress = event => {
    const value = event.target.value;
    const { question, updateQuestion } = this.props;
    this.setState({ value });
    const isOk = this.isValid(value);
    updateQuestion({
      value,
      questionId: question.questionId,
      isOk,
      questionDependencyId: question.questionDependencyId,
    });
  };

  isValid = (value, notRefresh) => {
    const errorMessage = SupportValidator.checkRequired(value);
    if (!notRefresh) this.setState({ errorMessage });
    return !errorMessage;
  };

  render() {
    const { question } = this.props;
    const { value, errorMessage } = this.state;

    return (
      <Contenedor>
        <LabelControl question={question} errorMessage={errorMessage} />
        <Radio.Group onChange={this.onPress} defaultValue={value}>
          {question.controlResponse.elements.map((item, index) => {
            return (
              <Radio key={`${index}_${item.elementId}`} value={item.elementId}>
                {item.label}
              </Radio>
            );
          })}
        </Radio.Group>
      </Contenedor>
    );
  }
}
