import React from 'react';
import { Checkbox } from 'antd';
import { Contenedor } from '../Pregunta.style';
import { Priority } from '../../../../../../services/constants';

export default class CheckboxControl extends React.Component {
  constructor(props) {
    super(props);
    const { question } = props;
    const value = this.buildResponseValue(question);
    this.state = { value };
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
    // const value = responseValue.engineerValue || responseValue.inspectorValue;
    const value = this.evaluatePriorityValue(responseValue);
    const refactorValue = value ? value === 'true' || value === '1' : null;
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

  componentDidMount() {
    const { onChangeElement } = this.props;
    const { value } = this.state;
    onChangeElement(value);
  }

  onPress = () => {
    const { question, onChangeElement, updateQuestion } = this.props;
    const { value } = this.state;
    const newChecked = !value;
    this.setState({ value: newChecked });
    onChangeElement(newChecked);
    updateQuestion({
      value: newChecked,
      questionId: question.questionId,
      isOk: true,
      questionDependencyId: question.questionDependencyId,
    });
  };

  render() {
    const { question, containerStyle } = this.props;
    const { value: checked } = this.state;
    return (
      <Contenedor style={containerStyle}>
        <Checkbox value={question.questionId} checked={checked} onChange={this.onPress}>
          {question.name}
        </Checkbox>
      </Contenedor>
    );
    /*
    const { question, containerStyle } = this.props;
    const { value } = this.state;
    return (
      <View style={[styles.container, containerStyle]}>
        <CheckBox
          key={question.questionId}
          center
          title={question.name}
          iconRight
          containerStyle={{ marginBottom: 0 }}
          iconType="material"
          checkedIcon="clear"
          uncheckedIcon="add"
          checkedColor={Color.primary}
          checked={value}
          onPress={this.onPress}
        />
      </View>
    );
    */
  }
}
