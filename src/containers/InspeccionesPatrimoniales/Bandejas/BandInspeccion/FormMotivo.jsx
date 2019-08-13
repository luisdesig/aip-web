import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import { messages } from '../../../../util/messages';
import { showConfirm } from '../../../../components/Modal/Utils';
import PagePanel from '../../../../components/Page/PanelPage';
import {
  FieldContainer,
  Field,
  ColForm,
  ColFormLabel,
  RowForm,
  InputForm,
} from '../../../../components/Util/util.style';
import { message } from 'antd';

const { TextArea } = InputForm;

class FormMotivo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numerosolicitud: '',
      motivo: '',
    };
    console.log(this.props.dataEdit);
  }
  changeNumeroSolictud = e => {
    const numerosolicitud = e.target.value;
    if (numerosolicitud.match(/^[0-9a-zA-Z]{0,24}$/)) {
      this.setState({ numerosolicitud });
    }
  };
  changeMotivo = e => {
    const motivo = e.target.value;
    if (motivo.match(/^[ 0-9a-zA-Z]{0,1000}$/)) {
      this.setState({ motivo });
    }
  };
  onSubmit = () => {
    const data = {
      idesolicitudinspeccion: this.props.dataEdit.idesolicitudinspeccion,
      ideinspector: this.props.dataEdit.ideinspector,
      dscmotivo: this.state.motivo,
    };
    if (this.state.motivo !== '') {
      showConfirm(
        'Cancelacion',
        '¿Esta seguro que desea agregar cancelar?',
        () => this.props.STARTACTIONDELETE(data),
        () => this.props.handleModalOff(),
      );
    } else {
      message.error('Todo los campos son requeridos');
    }
  };

  render() {
    const { motivo } = this.state;
    const { modal, dataEdit, handleModalOff, title } = this.props;
    const formmotivo = (
      <FieldContainer>
        <RowForm gutter={16}>
          <ColForm sm={24} lg={24}>
            <Field>
              <ColFormLabel sm={5}>
                <label>{`Número ${title}`}</label>
              </ColFormLabel>
              <ColForm sm={19}>
                <input
                  onChange={this.changeNumeroSolictud}
                  value={dataEdit.numsolicitudinspeccion}
                  disabled={true}
                  placeholder="# Solicitud"
                />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={24}>
            <Field>
              <ColFormLabel sm={5}>
                <label>Motivo:</label>
              </ColFormLabel>
              <ColForm sm={19}>
                <TextArea
                  onChange={this.changeMotivo}
                  value={motivo}
                  placeholder="Motivo de la cancelacion"
                />
              </ColForm>
            </Field>
          </ColForm>
        </RowForm>
      </FieldContainer>
    );
    const formMotivo = (
      <div>
        <PagePanel titulo={`Motivo de la ${title}`} children={formmotivo} />
      </div>
    );
    return (
      <Modal
        title={`Cancelar ${title}`}
        visible={modal}
        centered={false}
        children={formMotivo}
        onCancel={handleModalOff}
        onOk={this.onSubmit}
        messageTitle={messages.confirmationTitle}
        messageBody={messages.confirmationBdy}
      />
    );
  }
}

export default FormMotivo;
