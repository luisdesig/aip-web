import React from 'react';
import { Contenedor, Texto } from '../Pregunta.style';

export default class TextControl extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // RN045, RN044
    const { onChangeElement } = this.props;
    onChangeElement(true);
  }

  render() {
    const { question } = this.props;
    return (
      <Contenedor>
        {question.name && <Texto grande titulo>{`${question.name}`}</Texto>}
        <Texto grande>{question.value}</Texto>
      </Contenedor>
    );
  }
}
