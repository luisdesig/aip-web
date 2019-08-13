import React from 'react';
import { Checkbox } from 'antd';
import { Contenedor } from '../Pregunta.style';
import Reactotron from 'reactotron-react-js';

export default class CheckboxItemControl extends React.Component {
  constructor(props) {
    super(props);
    const { checked } = props;
    this.state = {
      checked,
    };
  }

  onPress = () => {
    const { onChange, elementId } = this.props;
    const { checked } = this.state;
    const newChecked = !checked;
    this.setState({ checked: newChecked });
    onChange({ elementId, checked: newChecked });
  };

  render() {
    const { tag, elementId } = this.props;
    const { checked } = this.state;

    return (
      <Contenedor>
        <Checkbox value={elementId} checked onChange={this.onPress}>
          {`tag: ${tag} - checked: ${checked}`}
        </Checkbox>
      </Contenedor>
    );
  }
}
