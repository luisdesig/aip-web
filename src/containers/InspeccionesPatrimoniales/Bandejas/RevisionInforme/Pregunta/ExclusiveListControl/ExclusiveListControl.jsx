import React from 'react';
import { Contenedor, Texto } from '../Pregunta.style';
import { Row, Col, Button, Card } from 'antd';
import ErrorControl from '../ErrorControl/ErrorControl';
import ItemListControl from '../ItemListControl/ItemListControl';
import _ from 'lodash';
import { Controls, Priority } from '../../../../../../services/constants';
import Reactotron from 'reactotron-react-js';

const { Meta } = Card;

export default class ExclusiveListControl extends React.Component {
  constructor(props) {
    super(props);
    const { question } = props;

    const childs = question.childs;
    const exclusiveQuestion = Array.isArray(childs) && childs.length > 0 ? childs[0] : null;

    const value = this.buildResponseValue(question);
    this.state = { value, errorMessages: [], exclusiveQuestion };
  }

  /*
  matrix -->
  [
    { index: 0, answers: [{value: 5, questionId: 2}, {value: 1, questionId: 3}] }, <-- record
    { index: 1, answers: [{value: 3, questionId: 2}, {value: 7, questionId: 3}] }
  ]
  */
  buildResponseValue = question => {
    if (Array.isArray(question.value) && question.value.length > 0) {
      return question.value;
    }
    const emptyValue = [];
    const childs = question.childs;
    if (!Array.isArray(childs) || childs.length === 0) {
      return emptyValue;
    }

    const masterValues = _.chain(
      _.flatten(
        childs
          .map(child => {
            const controlResponse = child.controlResponse;
            if (!controlResponse) {
              return null;
            }
            const questionValuesByIndex = controlResponse.responseValues;
            if (
              !questionValuesByIndex ||
              !Array.isArray(questionValuesByIndex) ||
              questionValuesByIndex.length === 0
            ) {
              return null;
            }
            return questionValuesByIndex.map(questionValue => {
              const value = this.evaluatePriorityValue(questionValue, controlResponse.type);
              /*
              let value = null;
              switch (controlResponse.type) {
                case Controls.InputText:
                  value = questionValue.engineerValue || questionValue.inspectorValue;
                  break;
                case Controls.Select:
                  value = questionValue.engineerResponse || questionValue.inspectorResponse;
                  break;
                default:
                  break;
              }
              */
              return {
                questionId: child.questionId,
                value,
                index: questionValue.index,
                questionDependencyId: child.questionDependencyId,
                isOk: true,
                isActivated: true,
                controlId: controlResponse.controlId,
                type: controlResponse.type,
                isAgrouper: false,
              };
            });
          })
          .filter(child => child !== null),
      ),
    )
      .groupBy('index')
      .map((values, strIndex) => {
        const index = Number.parseInt(strIndex, 0);
        return {
          index,
          answers: values.map(current => ({
            value: current.value,
            questionId: current.questionId,
            isOk: current.isOk,
            questionDependencyId: current.questionDependencyId,
            isActivated: current.isActivated,
            controlId: current.controlId,
            type: current.type,
            isAgrouper: current.isAgrouper,
          })),
        };
      })
      .value();
    Reactotron.log(`masterValues: ${JSON.stringify(masterValues)}`);
    return masterValues;
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
      default:
        break;
    }
  };

  componentDidMount() {
    // RN045, RN044
    const { question } = this.props;
    const { value } = this.state;
    if ((!question.value || question.value.length === 0) && (!value || value.length === 0)) {
      Reactotron.log(`Agrega (question.value) ==> ${JSON.stringify(question.value)}`);
      this.addQuestion();
    }
    const pristine = !value || value.length === 0;
    this.isValid(value, pristine);
  }

  render() {
    const { question } = this.props;
    const { value: matrix } = this.state;

    if (!matrix) {
      return null;
    }

    return (
      <Contenedor>
        {!question.activatingValue && (
          <Texto bold grande>
            {question.name}
          </Texto>
        )}
        {matrix.length > 0 &&
          matrix
            .sort((a, b) => a.index - b.index)
            .map(record => {
              Reactotron.log(`record: ${JSON.stringify(record)}`);
              return this.renderTemplate(question.childs, record);
            })}
      </Contenedor>
    );
  }

  isValid = (matrix, pristine) => {
    const { exclusiveQuestion } = this.state;
    const errorMessagesIsEmpty =
      (matrix || [])
        .map(record => ((record.answers || []).every(answer => answer.isOk) ? null : record))
        .filter(record => record !== null)
        .map(record => ({
          index: record.index,
          errorMessage: 'Complete todos los campos correctamente',
        })) || [];

    const elementIds =
      _.flatten(
        (matrix || []).map(record =>
          (record.answers || [])
            .filter(answer => answer.questionId === exclusiveQuestion.questionId)
            .map(answer => answer.value),
        ),
      ) || [];
    const duplicates = _.filter(
      _.uniq(
        _.map(elementIds, item => {
          if (
            _.filter(elementIds, elementId => {
              return elementId === item;
            }).length > 1
          ) {
            return item;
          }
          return false;
        }),
      ),
      value => {
        return value;
      },
    );
    const errorMessagesIsDuplicate =
      matrix
        .map(record =>
          (record.answers || []).some(
            answer =>
              answer.questionId === exclusiveQuestion.questionId &&
              duplicates.some(duplicate => duplicate === answer.value),
          )
            ? record
            : null,
        )
        .filter(record => record !== null)
        .map(record => ({
          index: record.index,
          errorMessage: 'La respuesta a la primera pregunta ya fue seleccionada',
        })) || [];

    const errorMessages = errorMessagesIsEmpty.concat(errorMessagesIsDuplicate);

    if (!pristine) this.setState({ errorMessages });
    return !errorMessages.length;
  };

  nothingIsEmpty = () => {
    const { value: matrix } = this.state;
    const existsEmptyValue = matrix.some(record => {
      return (record.answers || []).some(item => {
        return (
          item.value === undefined ||
          item.value === null ||
          (typeof item.value === 'string' && !item.value.trim())
        );
      });
    });
    return !existsEmptyValue;
  };

  renderTemplate(questions, record) {
    const { labelStyle } = this.props;
    const { value: matrix, errorMessages } = this.state;
    const currentErrorMessage = errorMessages.find(error => error.index === record.index);
    const errorMessage = currentErrorMessage ? currentErrorMessage.errorMessage : null;

    return (
      <Contenedor style={{ marginBottom: 8 }}>
        <Card>
          <Meta title={`Item #${record.index + 1}`} />
          {this.renderItems(questions, record)}
          <Row gutter={24} key={`row_${record.index}_1`}>
            {this.nothingIsEmpty() && matrix.length - 1 === record.index && (
              <Col style={{ marginBottom: 5 }} key={`col_${record.index}_1_1`} span={10}>
                <Button className="btn-cta-search" type="primary" onClick={this.addQuestion}>
                  NUEVO
                </Button>
              </Col>
            )}
            {matrix.length > 1 && (
              <Col style={{ marginBottom: 5 }} key={`col_${record.index}_1_2`} span={10}>
                <Button className="btn-cta-clear" onClick={() => this.removeQuestion(record.index)}>
                  ELIMINAR
                </Button>
              </Col>
            )}
          </Row>
          <Row gutter={24} key={`row_${record.index}_2`}>
            <Col style={{ marginBottom: 5 }} key={`col_${record.index}_2_1`} span={12}>
              <ErrorControl errorMessage={errorMessage} labelStyle={labelStyle} />
            </Col>
          </Row>
        </Card>
      </Contenedor>
    );
  }

  renderItems = (questions, record) => {
    // debugger;
    const { labelStyle, onChangeElement, informeInspeccion, question: parentQuestion } = this.props;

    const refactorQuestions = (questions || []).map(question => {
      // Se remueve dependencia de preguntas hijas cuya dependencia coincida con dependencia de su padre
      if (question.questionDependencyId === parentQuestion.questionDependencyId) {
        return { ...question, questionDependencyId: null };
      }
      return question;
    });

    const resp = (refactorQuestions || []).map((question, index) => (
      <Row gutter={24} key={`row_item_${index}`}>
        <Col style={{ marginBottom: 5 }} key={`col_item_${index}`} span={24}>
          <ItemListControl
            key={`item_list_${index}`}
            onChangeElement={onChangeElement}
            updateQuestion={this.updateQuestion}
            question={question}
            labelStyle={labelStyle}
            record={record}
            informeInspeccion={informeInspeccion}
            parentQuestionDependencyId={parentQuestion ? parentQuestion.questionDependencyId : null}
          />
        </Col>
      </Row>
    ));
    return resp;
  };

  addQuestion = () => {
    const { question } = this.props;
    const { value } = this.state;

    // debugger;
    const index = value.length > 0 ? Math.max.apply(null, value.map(item => item.index)) + 1 : 0;
    const answers = question.childs.map(child => ({ value: null, questionId: child.questionId }));
    // debugger;
    const newValue = value.concat([{ index, answers }]);

    // debugger;
    this.setState({ value: newValue });
  };

  removeQuestion = removeIndex => {
    const { value: matrix } = this.state;

    const { question, updateQuestion } = this.props;
    const indexRecord = matrix.findIndex(record => record.index === removeIndex);
    if (indexRecord > -1) {
      matrix.splice(indexRecord, 1);
      const refactorMatrix = (matrix || []).map((record, index) => ({ ...record, index }));
      updateQuestion({ value: refactorMatrix, questionId: question.questionId });
      this.setState({ value: refactorMatrix });
    }
  };

  updateQuestion = value => {
    // debugger;
    const { question, updateQuestion } = this.props;
    this.setState(prevState => {
      // debugger;
      const newValue = prevState.value.map(item => {
        // debugger;
        if (item.index === value.index) {
          return value;
        }
        return item;
      });

      const isOk = this.isValid(newValue);

      updateQuestion({
        value: newValue,
        questionId: question.questionId,
        isOk,
        questionDependencyId: question.questionDependencyId,
      });
      return { value: newValue };
    });
  };
}
