import React from 'react';
import { Texto } from './Pregunta.style';
import EventBus from '../../../../../components/EventBus/EventBus';
import { Controls } from '../../../../../services/constants';
import TextControl from './TextControl/TextControl';
import SelectControl from './SelectControl/SelectControl';
import RadioControl from './RadioControl/RadioControl';
import ChecklistControl from './ChecklistControl/ChecklistControl';
import SessionControl from './SessionControl/SessionControl';
import InputTextControl from './InputTextControl/InputTextControl';
import TextAreaControl from './TextAreaControl/TextAreaControl';
import GeolocationControl from './GeolocationControl/GeolocationControl';
import PercentageControl from './PercentageControl/PercentageControl';
import SummationControl from './SummationControl/SummationControl';
import CheckboxInputControl from './CheckboxInputControl/CheckboxInputControl';
import CheckboxControl from './CheckboxControl/CheckboxControl';
import ListControl from './ListControl/ListControl';
import ExclusiveListControl from './ExclusiveListControl/ExclusiveListControl';

export default class Pregunta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.escucharEventoEvaluarDependencia();
  }

  escucharEventoEvaluarDependencia() {
    this.subscription = EventBus.subscribe('evaluarDependencia', data => {
      const { question } = this.props;
      const apply = question.questionDependencyId == data.questionId;
      if (apply) {
        this.setState({
          show: data.activated,
        });
      }
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
    // EventEmitter.off('evaluarDependencia');
  }

  emitirEventoDependencia = (questionId, activated) => {
    EventBus.publish('evaluarDependencia', { questionId, activated });
    // EventEmitter.emit('evaluarDependencia', { questionId, activated });
  };

  onChangeElement = activated => {
    const { question } = this.props;
    this.emitirEventoDependencia(question.questionId, activated);
  };

  render() {
    const { question, answer } = this.props;
    const { show } = this.state;
    const dependentQuestionShouldBeDisplayed = question.questionDependencyId && !show;
    const [item] = answer;
    const value = item ? item.value : null;

    if (!question) {
      return null;
    }
    if (dependentQuestionShouldBeDisplayed) {
      // Para deshabilitar las dependencias en todos sus niveles
      this.onChangeElement(false);
      return null;
    }
    if (!question.controlResponse) {
      return null;
    }
    return this.construirPregunta(question, value);
  }

  construirPregunta = (question, value) => {
    const { informeInspeccion } = this.props;
    switch (question.controlResponse.type) {
      case Controls.Text:
        return (
          <TextControl question={{ ...question, value }} onChangeElement={this.onChangeElement} />
        );
      case Controls.Select:
        return (
          <SelectControl
            question={{ ...question, value }}
            onChangeElement={this.onChangeElement}
            updateQuestion={this.updateQuestion}
          />
        );
      case Controls.Radio:
        return (
          <RadioControl
            question={{ ...question, value }}
            onChangeElement={this.onChangeElement}
            updateQuestion={this.updateQuestion}
          />
        );
      case Controls.Checklist:
        return (
          <ChecklistControl
            question={{ ...question, value }}
            onChangeElement={this.onChangeElement}
            updateQuestion={this.updateQuestion}
          />
        );
      case Controls.Session:
        return (
          <SessionControl
            question={{ ...question, value }}
            onChangeElement={this.onChangeElement}
            informeInspeccion={informeInspeccion}
          />
        );
      case Controls.InputText: {
        const { containerStyle: containerStyleInputText } = this.props;
        return (
          <InputTextControl
            containerStyle={containerStyleInputText}
            question={{ ...question, value }}
            onChangeElement={this.onChangeElement}
            updateQuestion={this.updateQuestion}
          />
        );
      }
      case Controls.TextArea:
        return (
          <TextAreaControl
            question={{ ...question, value }}
            onChangeElement={this.onChangeElement}
            updateQuestion={this.updateQuestion}
          />
        );
      case Controls.List:
        return (
          <ListControl
            onChangeElement={this.onChangeElement}
            question={{ ...question, value }}
            updateQuestion={this.updateQuestion}
            informeInspeccion={informeInspeccion}
          />
        );
      case Controls.Gps:
        return (
          <GeolocationControl
            question={{ ...question, value }}
            onChangeElement={this.onChangeElement}
          />
        );
      case Controls.Percentage:
        return (
          <PercentageControl
            question={{ ...question, value }}
            onChangeElement={this.onChangeElement}
            updateQuestion={this.updateQuestion}
            informeInspeccion={informeInspeccion}
          />
        );
      case Controls.Summation:
        return (
          <SummationControl
            question={{ ...question, value }}
            onChangeElement={this.onChangeElement}
            updateQuestion={this.updateQuestion}
          />
        );
      case Controls.ExclusiveList:
        return (
          <ExclusiveListControl
            onChangeElement={this.onChangeElement}
            question={{ ...question, value }}
            updateQuestion={this.updateQuestion}
            informeInspeccion={informeInspeccion}
          />
        );
      case Controls.CheckboxInput:
        return (
          <CheckboxInputControl
            question={{ ...question, value }}
            onChangeElement={this.onChangeElement}
            updateQuestion={this.updateQuestion}
          />
        );
      case Controls.Checkbox: {
        const { containerStyle: containerStyleCheckbox } = this.props;
        return (
          <CheckboxControl
            containerStyle={containerStyleCheckbox}
            question={{ ...question, value }}
            onChangeElement={this.onChangeElement}
            updateQuestion={this.updateQuestion}
          />
        );
      }
      default:
        return (
          <Texto grande bold style={{ color: '#CF3B2D' }}>
            {`NO SE PUDO CONSTRUIR PREGUNTA: <<${question.name}>>`}
          </Texto>
        );
    }
  };

  // RN038
  updateQuestion = response => {
    const isInvalidValue = false;
    if (isInvalidValue) {
      return;
    }
    const { updateQuestion, question } = this.props;

    const answer = {
      ...response,
      questionId: question.questionId,
    };
    updateQuestion({
      ...answer,
      controlId: question.controlResponse.controlId,
      type: question.controlResponse.type,
      isAgrouper: !question.controlResponse.controlId, // Si tiene id definido no es agrupador
    });
  };
}
