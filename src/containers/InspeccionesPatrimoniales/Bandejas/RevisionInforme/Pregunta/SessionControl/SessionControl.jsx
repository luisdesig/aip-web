import React from 'react';
import { Contenedor, Texto } from '../Pregunta.style';
import { SessionIdenfifiers, MensajesRevisionInforme } from '../../../../../../services/constants';
import LabelControl from '../LabelControl/LabelControl';

export default class SessionControl extends React.Component {
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
    const [element] = question.controlResponse.elements;
    return (
      <Contenedor>
        {/*question.name && <Texto titulo grande>{`${question.name}  `}</Texto>*/}
        <LabelControl question={question} bold />
        <Texto>{element ? this.getInspectionValue(element.label) : ''}</Texto>
      </Contenedor>
    );
  }

  getInspectionValue = identifier => {
    const { informeInspeccion } = this.props;
    switch (identifier) {
      case SessionIdenfifiers.Enterprise:
        return informeInspeccion.nomCliente;
      case SessionIdenfifiers.Ubication:
        return informeInspeccion.direccion;
      case SessionIdenfifiers.BusinessLine:
        return informeInspeccion.giroNegocio;
      case SessionIdenfifiers.Occupation:
        return informeInspeccion.ocupacion;
      case SessionIdenfifiers.Classification:
        return MensajesRevisionInforme.riesgo;
      case SessionIdenfifiers.InspectionDate:
        return informeInspeccion.fechaInspeccion;
      case SessionIdenfifiers.ReportDate:
        return MensajesRevisionInforme.fechaSolicitud;
      case SessionIdenfifiers.Interviewed:
        return informeInspeccion.nomContacto;
      case SessionIdenfifiers.Broker:
        return informeInspeccion.nomCorredor;
      case SessionIdenfifiers.ProducedBy:
        return informeInspeccion.nomCliente;
      case SessionIdenfifiers.RequestedBy:
        return MensajesRevisionInforme.NotIdentified;
      case SessionIdenfifiers.Procedure:
        return informeInspeccion.numPoliza;
      default:
        return MensajesRevisionInforme.NotIdentified;
    }
  };
}
