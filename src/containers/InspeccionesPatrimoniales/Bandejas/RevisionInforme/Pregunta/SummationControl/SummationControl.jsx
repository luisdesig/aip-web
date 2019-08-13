import React from 'react';
import { Contenedor, Texto } from '../Pregunta.style';
import { Card } from 'antd';
import { QuestionValidators } from '../../../../../../services/constants';
import Pregunta from '../Pregunta';
import SupportValidator from '../../../../../../util/support-validator';
import { Priority } from '../../../../../../services/constants';
import ErrorControl from '../ErrorControl/ErrorControl';

export default class SummationControl extends React.Component {
  constructor(props) {
    super(props);
    const { question } = props;
    const value = this.buildResponseValue(question);
    this.state = { value, errorMessage: null };
  }

  buildResponseValue = question => {
    if (Array.isArray(question.value) && question.value.length > 0) {
      return question.value;
    }
    const emptyValue = [];
    const childs = question.childs;
    if (!Array.isArray(childs) || childs.length === 0) {
      return emptyValue;
    }
    return childs
      .map(child => {
        const controlResponse = child.controlResponse;
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
        return {
          value,
          questionId: child.questionId,
          controlId: child.controlResponse.controlId,
          type: child.controlResponse.type,
          isOk: true,
          questionDependencyId: child.questionDependencyId,
          totalDependencies: child.totalDependencies,
        };
      })
      .filter(child => child !== null);
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
    const { question } = this.props;
    const { value: newAnswers } = this.state;

    const toValidate = {
      values: newAnswers
        .filter(newAnswer => {
          if (!Array.isArray(question.childs)) {
            return false;
          }
          const childQuestion = question.childs.find(
            child => child.questionId === newAnswer.questionId,
          );
          if (!childQuestion) {
            return false;
          }
          if (
            childQuestion.type !== QuestionValidators.Integer &&
            childQuestion.type !== QuestionValidators.DecimalPoint2 &&
            childQuestion.type !== QuestionValidators.IntegerWithZero
          ) {
            return false;
          }
          return true;
        })
        .map(val => val.value),
      quantity: (
        question.childs.filter(
          child =>
            child.type === QuestionValidators.Integer ||
            child.type === QuestionValidators.DecimalPoint2 ||
            child.type === QuestionValidators.IntegerWithZero,
        ) || []
      ).length,
    };
    const pristine =
      newAnswers.filter(answer => !!(answer.value || '').toString().trim()).length === 0;
    this.isValid(toValidate, pristine);
  }

  render() {
    const { question } = this.props;
    const { errorMessage, value: values } = this.state;

    const valuesToSum = values.filter(val => !Number.isNaN(Number.parseFloat(val.value)));
    const sum = valuesToSum.reduce(
      (acc, val) => acc + (!Number.isNaN(val.value) ? Number.parseFloat(val.value) : 0),
      0,
    );

    return (
      <Contenedor>
        <Card key={question.questionId}>
          {this.renderItems(question.childs)}
          {!errorMessage && <Texto grande bold>{`Total: ${sum}`}</Texto>}
        </Card>
        <ErrorControl errorMessage={errorMessage} />
      </Contenedor>
    );
  }

  isValid = (value, pristine) => {
    const errorMessage = SupportValidator.checkSumNumbersConstraints(value);
    if (!pristine) this.setState({ errorMessage });
    return !errorMessage;
  };

  updateQuestion = answer => {
    const { value: answers } = this.state;
    const { updateQuestion, question } = this.props;
    let newAnswers = [];
    const exists = !!answers.some(item => item.questionId === answer.questionId);
    if (!exists) {
      newAnswers = answers.concat([answer]);
    } else {
      newAnswers = answers.map(item => {
        if (item.questionId === answer.questionId) {
          return { ...answer };
        }
        return item;
      });
    }

    const toValidate = {
      values: newAnswers
        .filter(newAnswer => {
          if (!Array.isArray(question.childs)) {
            return false;
          }
          const childQuestion = question.childs.find(
            child => child.questionId === newAnswer.questionId,
          );
          if (!childQuestion) {
            return false;
          }
          if (
            childQuestion.type !== QuestionValidators.Integer &&
            childQuestion.type !== QuestionValidators.DecimalPoint2 &&
            childQuestion.type !== QuestionValidators.IntegerWithZero
          ) {
            return false;
          }
          return true;
        })
        .map(val => val.value),
      quantity: (
        question.childs.filter(
          child =>
            child.type === QuestionValidators.Integer ||
            child.type === QuestionValidators.DecimalPoint2 ||
            child.type === QuestionValidators.IntegerWithZero,
        ) || []
      ).length,
    };

    const isOk = this.isValid(toValidate);

    this.setState({ value: newAnswers });
    updateQuestion({
      value: newAnswers,
      questionId: question.questionId,
      isOk,
      questionDependencyId: question.questionDependencyId,
    });
  };

  renderItems = questions => {
    const { informeInspeccion } = this.props;
    const { value } = this.state;
    return (questions || []).map((question, index) => (
      <Pregunta
        key={`question_${index}_${question.questionId}`}
        answer={value.filter(answer => answer.questionId === question.questionId)}
        question={question}
        updateQuestion={this.updateQuestion}
        informeInspeccion={informeInspeccion}
      />
    ));
  };
}
