import React from 'react';
import { ContenedorEnLinea, Texto } from '../Pregunta.style';
import PopoverControl from '../PopoverControl/PopoverControl';

export default class LabelControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { question, errorMessage, bold } = this.props;
    return (
      <ContenedorEnLinea>
        <Texto grande bold={bold} style={errorMessage ? { color: '#CF3B2D' } : { color: 'black' }}>
          {question.name}
        </Texto>
        {!!question.imageInfo && <PopoverControl imageInfo={question.imageInfo} />}
      </ContenedorEnLinea>
    );
  }
}
