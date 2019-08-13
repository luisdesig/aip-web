import React from 'react';
import { Contenedor } from '../Pregunta.style';
import SupportValidator from '../../../../../../util/support-validator';
import LabelControl from '../LabelControl/LabelControl';
import ErrorControl from '../ErrorControl/ErrorControl';
import { SelectForm } from '../../../../../../components/Util/util.style';
import { Priority } from '../../../../../../services/constants';

const Option = SelectForm.Option;

export default class SelectControl extends React.Component {
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
    const { question, onChangeElement } = this.props;
    const { value } = this.state;
    this.isValid(value, true);
    // RN044, RN023
    const automaticallyActive = !!value && !question.activatingValue;
    onChangeElement(value === question.activatingValue || automaticallyActive);
  }

  onChangeSelect = value => {
    const { value: oldValue } = this.state;
    if (value !== oldValue) {
      const { question, updateQuestion, onChangeElement } = this.props;
      this.setState({ value });

      const dependencyAllocation = this.generateDependencyCalculateAllocation(question, value);
      const isValid = this.isValid(value);
      const automaticallyActive = !!value && !question.activatingValue;
      const activitingValue = question.activatingValue || automaticallyActive;
      const isActivated = value === activitingValue;

      updateQuestion({
        value,
        questionId: question.questionId,
        ...dependencyAllocation,
        isOk: isValid,
        questionDependencyId: question.questionDependencyId,
        isActivated,
        totalDependencies: question.totalDependencies,
      });
      onChangeElement(isActivated);
    }
  };

  isValid = (value, notRefresh) => {
    const errorMessage = SupportValidator.checkRequired(value);
    if (!notRefresh) this.setState({ errorMessage });
    return !errorMessage;
  };

  generateDependencyCalculateAllocation = (question, value) => {
    let scoreCalculation = 0;
    let dependentElementIdCalculation = null;
    let dependentQuestionIdCalculation = null;
    const baseValueCalculate = question.baseValueCalculate;
    // Busca si elemento elegido tiene elemento dependiente
    // const selectedElement = this.getSelectedElement(question, value);
    const selectedElement = this.getSelectedElement(value);
    // Si el elemento seleccionado cuenta con referencias de dependencia
    // se asigna a respuesta
    if (selectedElement && selectedElement.dependentElementIdCalculation) {
      dependentElementIdCalculation = selectedElement.dependentElementIdCalculation;
    }
    if (selectedElement && question.dependentQuestionIdCalculation) {
      dependentQuestionIdCalculation = question.dependentQuestionIdCalculation;
    }
    // Si el elemento seleccionado cuenta con valor RER
    // se asigna valor (scoreCalculation) a respuesta
    if (selectedElement && selectedElement.scoreCalculation) {
      scoreCalculation = selectedElement.scoreCalculation;
    }
    return {
      scoreCalculation,
      dependentElementIdCalculation,
      dependentQuestionIdCalculation,
      baseValueCalculate,
    };
  };

  getSelectedElement = value => {
    const { question } = this.props;
    const elements = question.controlResponse.elements;
    const element = (elements || []).find(item => item.value === value);
    return element;
  };

  render() {
    const { question } = this.props;
    const { value, errorMessage } = this.state;
    const elements = question.controlResponse.elements;
    return (
      <Contenedor>
        <LabelControl question={question} errorMessage={errorMessage} />
        <Contenedor>
          <SelectForm onChange={valueChange => this.onChangeSelect(valueChange)} value={value}>
            {this.renderItems(elements)}
          </SelectForm>
        </Contenedor>
        <ErrorControl errorMessage={errorMessage} />
      </Contenedor>
    );
  }

  renderItems = elements => {
    return (elements || []).map((item, index) => {
      return (
        <Option key={index} id={index} value={item.value}>
          {item.label}
        </Option>
      );
    });
  };
}
