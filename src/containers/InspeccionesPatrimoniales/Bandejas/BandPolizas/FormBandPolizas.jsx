import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import { messages } from '../../../../util/messages';
import { showConfirm } from '../../../../components/Modal/Utils';
import PagePanel from '../../../../components/Page/PanelPage';
import TableInmuebles from './TableInmueble';
import FormGarantia from './FormGarantia';
import TableGarantia from '../../../../components/Garantias/Garantias';
import { error } from '../../../../components/Messages/Messages';
import {
  FieldContainer,
  Field,
  ColForm,
  ColFormLabel,
  InputForm,
  RowForm,
  ButtonForm,
} from '../../../../components/Util/util.style';
import { message } from 'antd';

const { TextArea } = InputForm;

class FormBandPolizas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codproducto: '',
      numpoliza: '',
      idpactivo: 9,
      idegarantiarec: '',
      descripcion: '',
      garantias: [],
      ERROR: [],
      viewGarantia: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.addGarantia = this.addGarantia.bind(this);
    this.handleDeleteGarantia = this.handleDeleteGarantia.bind(this);
    //console.log(this.props.dataEdit);
  }

  componentDidMount() {
    const { STARTACTIONGET, dataEdit } = this.props;
    STARTACTIONGET({ idepolizaacuerdo: dataEdit.idepolizaacuerdo });
  }

  handleModalGarantiaView = e => { };

  onChange = e => { };
  onChangeDescripcion = e => {
    const descripcion = e.target.value;
    if (descripcion.match(/^[ ña-zA-Z]{0,24}$/)) {
      this.setState({ descripcion });
    }
  };
  onSelect = (record, selected, selectedRows, nativeEvent) => {
    this.props.ACTIONCHANGEESTADO({
      ideinmueblepoliza: record.ideinmueblepoliza,
      checked: selected,
    });
  };

  addGarantia = e => {
    const garantias = this.state.garantias;
    if (garantias.indexOf(e.idegarantiarec) < 0) {
      garantias.push(e.idegarantiarec);
      this.props.ACTIONREGISTERGARANTIA(e);
      this.setState({ garantias });
    } else {
      error('ya se ha registrado esta garantia');
    }
  };

  handleDeleteGarantia = e => {
    const { garantias } = this.state;
    this.setState({ garantias: garantias.filter(res => res !== e) })
    this.props.ACTIONDELETEGARANTIA(e);
  };

  onSubmit = () => {
    const { dataEdit } = this.props;
    let data = {
      idepolizaacuerdo: this.props.dataEdit.idepolizaacuerdo,
      codprod: dataEdit.codprod,
      numpol: dataEdit.numpol,
      garantias: this.props.bandpolizas.garantiascurrent,
      inmuebles: this.props.bandpolizas.polizainmuebles,
    };

    if (data.inmuebles.length !== 0 || data.idegarantiarec !== '') {
      showConfirm(
        messages.bandejapolizarenovar.title,
        '¿Esta seguro que desea crear la solicitud?',
        () => this.props.STARTACTIONPOST(data),
        () => this.props.handleModalOff(),
      );
    } else {
      message.error('Todo los campos son requeridos');
    }
  };
  render() {
    var dataSource;
    const { descripcion } = this.state;
    const {
      dataEdit,
      modal,
      modalGarantia,
      bandpolizas,
      handleModalGarantia,
      handleModalGarantiaOff,
      handleModalOff,
      gruposgarantias,
      subgruposgarantias,
      ACTIONSUBGARANTIA,
      inmueblegarantias,
      STARTACTIONGETSUBGARANTIA,
      ACTIONCLEANINMUEBLES,
    } = this.props;
    dataSource = bandpolizas.polizainmuebles.filter(res => res.active === 1);
    const formMantPoliza = (
      <FieldContainer>
        <RowForm gutter={16}>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Nro. de Póliza:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input value={dataEdit.numpol} placeholder="Nro. de póliza" disabled={true} />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>RUC Corredor:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input value={dataEdit.numdocbroker} placeholder="RUC Corredor" disabled={true} />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Nro. DNI:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input value={dataEdit.numdoccliente === null ? '' : dataEdit.numdoccliente} placeholder="Nro. DNI" disabled={true} />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Nro. Renovacion:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input value={dataEdit.numren} placeholder="Nro. Renovación" disabled={true} />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Corredor:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input
                  value={dataEdit.nombrecorredor}
                  placeholder="Corredor"
                  disabled={true}
                />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Nombre:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input
                  value={dataEdit.nomcliente}
                  placeholder="Nombre"
                  disabled={true}
                />
              </ColForm>
            </Field>
          </ColForm>
        </RowForm>
      </FieldContainer>
    );

    const mantPoliza = (
      <div>
        <PagePanel titulo="Datos de la póliza" children={formMantPoliza} />
        <div className="text-right">
          <ButtonForm className="btn_secondary" onClick={handleModalGarantia}>
            <i className="i-add" />
            <span>Añadir Garantía</span>
          </ButtonForm>
        </div>
        {modalGarantia ? (
          <FormGarantia
            modal={modalGarantia}
            handleModalOff={handleModalGarantiaOff}
            messageTitle={messages.confirmationTitle}
            messageBody={messages.confirmationBdy}
            gruposgarantias={gruposgarantias}
            subgruposgarantias={subgruposgarantias}
            ACTIONSUBGARANTIA={ACTIONSUBGARANTIA}
            addGarantia={this.addGarantia}
            inmueblegarantias={inmueblegarantias}
            STARTACTIONGETSUBGARANTIA={STARTACTIONGETSUBGARANTIA}
            ACTIONCLEANINMUEBLES={ACTIONCLEANINMUEBLES}
          />
        ) : (
            ''
          )}
        <TableInmuebles dataSource={dataSource} onChange={this.onChange} onSelect={this.onSelect} />
        <TableGarantia
          dataSource={bandpolizas.garantiascurrent}
          handleDeleteGarantia={this.handleDeleteGarantia}
        />
        <RowForm style={{ paddingTop: 10 }}>
          <PagePanel
            titulo="Descripción de la póliza"
            children={
              <TextArea
                onChange={this.onChangeDescripcion}
                value={descripcion}
                style={{ marginTop: 10, marginBottom: 10, width: '98%' }}
                row={2}
              />
            }
          />
        </RowForm>
      </div>
    );
    return (
      <Modal
        title={'Pasar a Ingeniería'}
        visible={modal}
        width="80%"
        centered={false}
        children={mantPoliza}
        onCancel={handleModalOff}
        onOk={this.onSubmit}
        messageTitle={messages.confirmationTitle}
        messageBody={messages.confirmationBdy}
      />
    );
  }
}

export default FormBandPolizas;
