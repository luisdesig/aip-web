import React from 'react';
import { Contenedor, Texto } from '../Pregunta.style';

export default class ErrorControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <Contenedor>
        <Texto grande style={{ color: '#CF3B2D' }}>
          {errorMessage}
        </Texto>
      </Contenedor>
    );
  }
}
