import React from 'react';
import { Contenedor } from '../Pregunta.style';
import LabelControl from '../LabelControl/LabelControl';
import ErrorControl from '../ErrorControl/ErrorControl';
import Reactotron from 'reactotron-react-js';
import { QuestionValidators } from '../../../../../../services/constants';
import SupportValidator from '../../../../../../util/support-validator';
import { Input } from 'antd';
import { Priority } from '../../../../../../services/constants';

export default class InputTextControl extends React.Component {
  constructor(props) {
    super(props);
    const { question } = props;
    const value = this.buildResponseValue(question);
    this.state = { value, errorMessage: null };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.question.reload && nextProps.question.value !== prevState.value) {
      return { value: nextProps.question.value };
    } else return null;
  }

  /*
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (prevProps.question.value !== prevProps.value) {
      this.setState({value: prevProps.question.value});
    }
  }
  */

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
    // const value = responseValue.engineerValue || responseValue.inspectorValue;
    const value = this.evaluatePriorityValue(responseValue);
    return value;
  };

  evaluatePriorityValue = responseValue => {
    const priority = responseValue.lastAnswer;
    if (priority === Priority.Engineer) {
      const value = responseValue.engineerValue || responseValue.inspectorValue;
      return value;
    }
    const value = responseValue.inspectorValue;
    return value;
  };

  componentDidMount() {
    const { question, onChangeElement } = this.props;
    // const value = this.buildResponseValue(question);
    // this.setState({ value });
    const { value } = this.state;
    const type = question.validator ? question.validator.type : null;
    const pristine = !value;
    const isValid = this.isValid(type, value, pristine);
    const isActivatingCondition = this.isActivatingCondition(
      question.controlResponse.activatingCondition,
      value,
    );
    // RN046, RN044, RN023
    if (isValid && isActivatingCondition) {
      onChangeElement(true);
    } else {
      onChangeElement(false);
    }
  }

  isActivatingCondition = (activatingCondition, value) => {
    if (!activatingCondition || !value) {
      return false;
    }
    const formula = `${activatingCondition.startRange} ${activatingCondition.startOperator} ${value} && ${value} ${activatingCondition.endOperator} ${activatingCondition.endRange}`;
    try {
      // eslint-disable-next-line no-eval
      const result = eval(formula);
      return result;
    } catch (error) {
      Reactotron.log(`error durante evaluacion de formula para mostrar dependencias: ${error}`);
      return false;
    }
  };

  onChangeInputText = event => {
    const value = event.target.value;
    const { question, updateQuestion, onChangeElement } = this.props;
    const type = question.validator ? question.validator.type : null;
    const isOk = this.isValid(type, value);
    const isActivatingCondition = this.isActivatingCondition(
      question.controlResponse.activatingCondition,
      value,
    );
    const isActivated = isOk && isActivatingCondition;
    this.setState({ value });
    if (isActivated) {
      onChangeElement(true);
    } else {
      onChangeElement(false);
    }
    updateQuestion({
      value,
      questionId: question.questionId,
      isOk,
      questionDependencyId: question.questionDependencyId,
      isActivated,
      totalDependencies: question.totalDependencies,
    });
  };

  isValid = (type, value, notRefresh) => {
    let errorMessage = null;
    // RN022
    switch (type) {
      case QuestionValidators.Integer:
        errorMessage = SupportValidator.checkInteger(value);
        break;
      case QuestionValidators.DecimalPoint2:
        errorMessage = SupportValidator.checkDecimalPoint2(value);
        break;
      case QuestionValidators.Text:
        errorMessage = SupportValidator.checkText(value);
        break;
      case QuestionValidators.IntegerWithZero:
        errorMessage = SupportValidator.checkIntegerWithZero(value);
        break;
      default:
        break;
    }
    if (!notRefresh) this.setState({ errorMessage });
    return !errorMessage;
  };

  render() {
    const { question, containerStyle } = this.props;
    const { value, errorMessage } = this.state;
    // const keyboardType = question.validator ? question.validator.keyboardType : Constants.keyboardType.default;
    return (
      <Contenedor style={containerStyle}>
        <LabelControl question={question} errorMessage={errorMessage} />
        <Input value={value} onChange={this.onChangeInputText} />
        <ErrorControl errorMessage={errorMessage} />
      </Contenedor>
    );
  }
}
