import styled from 'styled-components';

const Contenedor = styled.div``;
const ContenedorEnLinea = styled.div`
  display: inline-flex;
`;
const ContenedorPareja = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Texto = styled.label`
  font-size: ${props => (props.grande ? 18 : 12)};
  font-weight: ${props => (props.titulo || props.bold ? 'bold' : 'normal')};
  text-decoration: ${props => (props.titulo ? 'underline' : 'none')};
  margin: 10px 5px;
`;

export { ContenedorEnLinea, Contenedor, Texto, ContenedorPareja };
