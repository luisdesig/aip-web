import React from 'react';
import { Contenedor, Texto } from '../Pregunta.style';
import LabelControl from '../LabelControl/LabelControl';
import { Priority } from '../../../../../../services/constants';

export default class GeolocationControl extends React.Component {
  constructor(props) {
    super(props);
    const { question } = this.props;
    this.state = {
      value: this.buildResponseValue(question),
    };
  }

  componentDidMount() {
    // RN045, RN044
    const { onChangeElement } = this.props;
    onChangeElement(true);
  }

  buildResponseValue = question => {
    if (question.value) {
      return JSON.parse(question.value);
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
    const refactorValue = value
      ? `Longitud: ${JSON.parse(value).longitude} | Latitud: ${JSON.parse(value).latitude}`
      : null;
    return refactorValue;
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

  render() {
    const { question } = this.props;
    const { value } = this.state;
    return (
      <Contenedor>
        <LabelControl question={question} bold />
        <Texto grande>{value}</Texto>
      </Contenedor>
    );
  }
}
