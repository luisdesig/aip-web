import React from 'react';
import { Contenedor } from '../Pregunta.style';
import SupportValidator from '../../../../../../util/support-validator';
import CheckboxItemControl from '../CheckboxItemControl/CheckboxItemControl';
import LabelControl from '../LabelControl/LabelControl';
import ErrorControl from '../ErrorControl/ErrorControl';
import { Checkbox, Row, Col } from 'antd';
import { Priority } from '../../../../../../services/constants';

export default class ChecklistControl extends React.Component {
  constructor(props) {
    super(props);
    const { question } = props;
    const value = this.buildResponseValue(question);
    this.state = { value, errorMessage: null };
  }

  componentDidMount() {
    const { value } = this.state;
    const pristine = !value || value.length === 0;
    this.isValid(value, pristine);
  }

  buildResponseValue = question => {
    if (Array.isArray(question.value) && question.value.length > 0) {
      return question.value;
    }
    const emptyValue = [];
    const controlResponse = question.controlResponse;
    if (!controlResponse) {
      return emptyValue;
    }
    const responseValues = controlResponse.responseValues;
    if (!responseValues || !Array.isArray(responseValues) || responseValues.length === 0) {
      return emptyValue;
    }

    const arrayValue = responseValues.map(responseValue => {
      // const value = responseValue.engineerResponse || responseValue.inspectorResponse;
      const value = this.evaluatePriorityValue(responseValue);
      return value;
    });

    if (!arrayValue || !Array.isArray(arrayValue)) {
      return emptyValue;
    }
    return arrayValue;
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

  render() {
    const { question } = this.props;
    const { errorMessage } = this.state;
    const { value: elementsId } = this.state;
    return (
      <Contenedor>
        <LabelControl question={question} errorMessage={errorMessage} />
        {/*<Checkbox.Group>{this.renderItems(question.controlResponse.elements)}</Checkbox.Group>*/}
        <Checkbox.Group defaultValue={elementsId} onChange={this.onChange}>
          <Row>
            {(question.controlResponse.elements || []).map(item => {
              return (
                <Col key={item.elementId} span={10}>
                  <Checkbox value={item.elementId}>{item.label}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
        <ErrorControl errorMessage={errorMessage} />
      </Contenedor>
    );
  }

  isValid = (value, notRefresh) => {
    const errorMessage = SupportValidator.checkRequired(value);
    if (!notRefresh) this.setState({ errorMessage });
    return !errorMessage;
  };

  onChangeSelect = value => {
    const { question, updateQuestion } = this.props;
    const isOk = this.isValid(value);
    updateQuestion({
      value,
      questionId: question.questionId,
      isOk,
      questionDependencyId: question.questionDependencyId,
    });
  };

  /*
  onChange = item => {
    const { value: arrayValue } = this.state;
    let newArrayValue = [];
    if (item.checked) {
      newArrayValue = arrayValue.concat(item.elementId);
    } else {
      const index = arrayValue.findIndex(elementId => elementId === item.elementId);
      if (index > -1) {
        arrayValue.splice(index, 1);
      }
      newArrayValue = arrayValue;
    }
    this.setState({
      value: [...newArrayValue],
    });
    this.onChangeSelect(newArrayValue);
  };
  */
  onChange = checkedList => {
    this.setState({
      value: [...checkedList],
    });
    this.onChangeSelect(checkedList);
  };

  renderItems = elements => {
    const { value: elementsId } = this.state;
    return (elements || []).map(item => {
      const checked = elementsId.some(id => id === item.elementId);
      return (
        <CheckboxItemControl
          key={item.value}
          elementId={item.elementId}
          tag={item.label}
          onChange={this.onChange}
          checked={!!checked}
        />
      );
    });
  };
}
