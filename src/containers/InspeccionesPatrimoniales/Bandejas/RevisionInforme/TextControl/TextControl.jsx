import React from 'react';
import { Input } from 'antd';
import Reactotron from 'reactotron-react-js';

export default class TextControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cargandoCategorias: false,
      ideCategoria: null,
    };
  }

  render() {
    const { question, inputStyle, containerStyle } = this.props;
    return (
      <div style={containerStyle}>
        <span style={[inputStyle]}>{question.value}</span>
      </div>
    );
  }
}
