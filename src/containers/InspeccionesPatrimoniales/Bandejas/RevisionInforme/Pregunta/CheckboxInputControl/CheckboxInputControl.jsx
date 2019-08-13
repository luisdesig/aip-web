import React from 'react';
import { Contenedor, ContenedorPareja } from '../Pregunta.style';
import { Card } from 'antd';
import { Controls, Priority } from '../../../../../../services/constants';
import _ from 'lodash';
import Pregunta from '../Pregunta';
import SupportValidator from '../../../../../../util/support-validator';
import ErrorControl from '../ErrorControl/ErrorControl';

export default class CheckboxInputControl extends React.Component {
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
        /*
        let value = null;
        switch (controlResponse.type) {
          case Controls.InputText:
            value = responseValue.engineerValue || responseValue.inspectorValue;
            break;
          case Controls.Select:
            value = responseValue.engineerResponse || responseValue.inspectorResponse;
            break;
          case Controls.Checkbox:
            value = responseValue.engineerValue || responseValue.inspectorValue;
            break;

          default:
            break;
        }
        */
        const value = this.evaluatePriorityValue(responseValue, controlResponse.type);

        const castRefactorValue =
          controlResponse.type === Controls.Checkbox ? value === 'true' : value;
        return {
          value: castRefactorValue,
          questionId: child.questionId,
          isOk: true,
          questionDependencyId: child.questionDependencyId,
        };
      })
      .filter(child => child !== null);
  };

  evaluatePriorityValue = (responseValue, type) => {
    const priority = responseValue.lastAnswer;
    switch (type) {
      case Controls.InputText:
        if (priority === Priority.Engineer) {
          return responseValue.engineerValue || responseValue.inspectorValue;
        }
        return responseValue.inspectorValue;
      case Controls.Select:
        if (priority === Priority.Engineer) {
          return responseValue.engineerResponse || responseValue.inspectorResponse;
        }
        return responseValue.inspectorResponse;
      case Controls.Checkbox:
        if (priority === Priority.Engineer) {
          return responseValue.engineerValue || responseValue.inspectorValue;
        }
        return responseValue.inspectorValue;
      default:
        break;
    }
  };

  componentDidMount() {
    const { value: newAnswers } = this.state;
    const toValidate = this.prepareValidate(newAnswers);
    const pristine =
      newAnswers.filter(answer => !!(answer.value || '').toString().trim()).length === 0;
    this.isValid(toValidate, pristine);
  }

  render() {
    const { question } = this.props;
    const { errorMessage } = this.state;

    return (
      <Contenedor>
        <Card key={question.questionId}>
          {this.renderItems(question.childs)}
          <ErrorControl errorMessage={errorMessage} />
        </Card>
      </Contenedor>
    );
  }

  isValid = (value, pristine) => {
    const errorMessage = SupportValidator.checkSumSelectedOneHundredConstraints(value);
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
    const toValidate = this.prepareValidate(newAnswers);
    const isOk = this.isValid(toValidate);

    this.setState({ value: newAnswers });
    updateQuestion({
      value: newAnswers,
      questionId: question.questionId,
      isOk,
      questionDependencyId: question.questionDependencyId,
    });
  };

  prepareValidate = answers => {
    const { question } = this.props;
    const questionsCheck = answers
      .filter(newAnswer => {
        const childFound = question.childs.find(child => child.questionId === newAnswer.questionId);

        return childFound.controlResponse.type === Controls.Checkbox && !!newAnswer.value;
      })
      .map(newAnswer => newAnswer.questionId);

    const questionsValidNumeric = answers.filter(newAnswer => {
      const childFound = question.childs.find(child => child.questionId === newAnswer.questionId);

      const result =
        childFound.controlResponse.type === Controls.InputText &&
        questionsCheck.some(questionCheckId => questionCheckId === childFound.questionDependencyId);

      return result;
    });

    return {
      values: questionsValidNumeric.map(val => val.value),
      quantity: questionsValidNumeric.length,
    };
  };

  renderItems = questions => {
    const { value } = this.state;
    const { question: parent } = this.props;

    const refactorQuestions = (questions || []).map(question => {
      let group = null;
      let questionDependencyId = null;
      if (question.questionDependencyId === parent.questionDependencyId) {
        group = question.questionId;
      } else {
        group = question.questionDependencyId;
      }
      // Se remueve dependencia de preguntas hijas cuya dependencia coincida con dependencia de su padre
      if (question.questionDependencyId !== parent.questionDependencyId) {
        questionDependencyId = question.questionDependencyId;
      }
      return { ...question, group, questionDependencyId };
    });
    const agroupQuestions = _.chain(refactorQuestions || [])
      .groupBy('group')
      .map(childs => {
        return childs;
      });

    const refactorAgroupQuestions = _.flattenDepth([...agroupQuestions], 1);

    const selectIndex = refactorAgroupQuestions.findIndex(
      item => item.controlResponse.type === Controls.Select,
    );
    const [selectControl] = refactorAgroupQuestions.splice(selectIndex, 1);

    const textIndex = refactorAgroupQuestions.findIndex(
      item => item.controlResponse.type === Controls.Text,
    );
    const [textControl] = refactorAgroupQuestions.splice(textIndex, 1);

    const pairQuestions = _.chunk(_.orderBy(refactorAgroupQuestions, ['order'], ['asc']), 2);

    return (
      <Contenedor>
        <Pregunta
          key={`question_${textControl.questionId}`}
          answer={value.filter(answer => answer.questionId === textControl.questionId)}
          question={textControl}
          containerStyle={{ width: '100%' }}
          updateQuestion={this.updateQuestion}
        />
        <Pregunta
          key={`question_${selectControl.questionId}`}
          answer={value.filter(answer => answer.questionId === selectControl.questionId)}
          question={selectControl}
          containerStyle={{ width: '100%' }}
          updateQuestion={this.updateQuestion}
        />
        {pairQuestions.map((pair, index) => {
          return (
            <ContenedorPareja key={index}>
              {pair.map((question, indexQuestion) => {
                return (
                  <Pregunta
                    key={`question_${indexQuestion}_${question.questionId}`}
                    answer={value.filter(answer => answer.questionId === question.questionId)}
                    question={question}
                    containerStyle={{ width: '50%' }}
                    updateQuestion={this.updateQuestion}
                  />
                );
              })}
            </ContenedorPareja>
          );
        })}
      </Contenedor>
    );

    /*
    return refactorAgroupQuestions.map((agroupQuestion, indexQuestions) => {
      return (
        <Contenedor key={indexQuestions}>
          {agroupQuestion.map((question, indexQuestion) => {
            return (
              <Pregunta
                key={`question_${indexQuestions}_${indexQuestion}_${question.questionId}`}
                answer={value.filter(answer => answer.questionId === question.questionId)}
                question={question}
                updateQuestion={this.updateQuestion}
              />
            );
          })}
        </Contenedor>
      );
    });
    */
  };
}
