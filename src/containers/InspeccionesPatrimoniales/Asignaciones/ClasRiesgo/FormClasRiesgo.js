import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import { showConfirm } from '../../../../components/Modal/Utils';
import { error } from '../../../../components/Messages/Messages';
import {
  FieldContainer,
  RowForm,
  ColForm,
  Field,
  ColFormLabel,
  SelectForm,
} from '../../../../components/Util/util.style';
import { messages } from '../../../../util/messages';
import PagePanel from '../../../../components/Page/PanelPage';

const Option = SelectForm.Option;

class FormClasRiesgo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idegironegocio: props.dataEdit ? props.dataEdit.gironegocio.idegironegocio : 'Seleccione',
      ideocupacion: props.dataEdit ? props.dataEdit.ocupacion.ideocupacion : 'Seleccione',
      indminera: props.dataEdit ? props.dataEdit.indminera : 'Seleccione',
      ideriesgo: props.dataEdit ? props.dataEdit.riesgo.ideriesgo : 'Seleccione',
      idptipogironegocio: props.dataEdit
        ? props.dataEdit.tipogironegocio.idptipogironegocio
        : 'Seleccione',
      idpestasignacion: props.dataEdit ? props.dataEdit.estasignacion.idpestasignacion : 6,
      ERROR: [],
    };
  }
  componentDidMount() {}

  changeGiroNegocio = e => {
    this.setState({ idegironegocio: e });
  };
  changeOcupacion = e => {
    this.setState({ ideocupacion: e });
  };
  changeTipoGiro = e => {
    this.setState({ idptipogironegocio: e });
  };
  changeRiesgo = e => {
    this.setState({ ideriesgo: e });
  };
  changeEstado = e => {
    this.setState({ idpestasignacion: e });
  };
  changeMineria = e => {
    this.setState({ indminera: e });
  };

  datosCambiaron = () => {
    debugger;
    const { dataEdit } = this.props;

    if (!dataEdit) {
      return true;
    }

    const idegironegocio = this.state.idegironegocio;
    const ideocupacion = this.state.ideocupacion;
    const idptipogironegocio = this.state.idptipogironegocio;
    const ideriesgo = this.state.ideriesgo;
    const idpestasignacion = this.state.idpestasignacion;
    const indminera = this.state.indminera;

    const cambiaron =
      dataEdit.gironegocio.idegironegocio !== idegironegocio ||
      dataEdit.ocupacion.ideocupacion !== ideocupacion ||
      dataEdit.indminera !== indminera ||
      dataEdit.riesgo.ideriesgo !== ideriesgo ||
      dataEdit.tipogironegocio.idptipogironegocio !== idptipogironegocio ||
      dataEdit.estasignacion.idpestasignacion !== idpestasignacion;

    return cambiaron;
  };

  onSubmit = () => {
    const { dataEdit, STARTACTIONPUT, STARTACTIONPOST, handleModalOff } = this.props;
    let data = {
      idegironegocio: this.state.idegironegocio,
      ideocupacion: this.state.ideocupacion,
      idptipogironegocio: this.state.idptipogironegocio,
      ideriesgo: this.state.ideriesgo,
      idpestasignacion: this.state.idpestasignacion,
      indminera: this.state.indminera,
    };
    if (
      data.ideocupacion !== 'Seleccione' &&
      data.idegironegocio !== 'Seleccione' &&
      data.idptipogironegocio !== 'Seleccione' &&
      data.ideriesgo !== 'Seleccione' &&
      data.idpestasignacion !== 'Seleccione' &&
      data.indminera !== 'Seleccione'
    ) {
      if (dataEdit) {
        showConfirm(
          messages.clasriesgo.title,
          messages.confirmationUpdate,
          () => STARTACTIONPUT(dataEdit.ideriesgogironegocio, data),
          () => handleModalOff(),
        );
      } else {
        showConfirm(
          messages.clasriesgo.title,
          messages.confirmationInsert,
          () => STARTACTIONPOST(data),
          () => handleModalOff(),
        );
      }
    } else {
      error(messages.clasriesgo.validacion);
    }
  };

  render() {
    const {
      idegironegocio,
      ideocupacion,
      indminera,
      idpestasignacion,
      ideriesgo,
      idptipogironegocio,
    } = this.state;
    const {
      modal,
      messages,
      dataEdit,
      handleModalOff,
      girosnegocios,
      ocupaciones,
      minero,
      riesgos,
      tiposgironegocios,
      estadosgiro,
    } = this.props;

    const formClasRiesgo = (
      <FieldContainer>
        <RowForm gutter={16}>
          <ColForm sm={24} lg={24}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Giro de Negocio:</label>
              </ColFormLabel>
              <ColForm sm={10}>
                <SelectForm
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.changeGiroNegocio}
                  value={idegironegocio}
                  disabled={dataEdit ? true : false}
                >
                  {girosnegocios.map((item, index) => {
                    return (
                      <Option key={index} value={item.idegironegocio}>
                        {item.nombre}
                      </Option>
                    );
                  })}
                </SelectForm>
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={24}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Ocupación:</label>
              </ColFormLabel>
              <ColForm sm={10}>
                <SelectForm
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.changeOcupacion}
                  value={ideocupacion}
                  disabled={dataEdit ? true : false}
                >
                  {ocupaciones.map((item, index) => {
                    return (
                      <Option key={index} value={item.ideocupacion}>
                        {item.nombre}
                      </Option>
                    );
                  })}
                </SelectForm>
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={24}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Tipo de Giro:</label>
              </ColFormLabel>
              <ColForm sm={10}>
                <SelectForm
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.changeTipoGiro}
                  value={idptipogironegocio}
                >
                  {tiposgironegocios.map((item, index) => {
                    return (
                      <Option key={index} value={item.ideparametro}>
                        {item.descripcion}
                      </Option>
                    );
                  })}
                </SelectForm>
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={24}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Clasificación de Riesgo:</label>
              </ColFormLabel>
              <ColForm sm={10}>
                <SelectForm
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.changeRiesgo}
                  value={ideriesgo}
                >
                  {riesgos.map((item, index) => {
                    return (
                      <Option key={index} value={item.ideriesgo}>
                        {item.nombre}
                      </Option>
                    );
                  })}
                </SelectForm>
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={24}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Estado:</label>
              </ColFormLabel>
              <ColForm sm={10}>
                <SelectForm
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.changeEstado}
                  value={idpestasignacion}
                  disabled={dataEdit ? false : true}
                >
                  {estadosgiro.map((item, index) => {
                    return (
                      <Option key={index} value={item.ideparametro}>
                        {item.descripcion}
                      </Option>
                    );
                  })}
                </SelectForm>
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={24}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Minería:</label>
              </ColFormLabel>
              <ColForm sm={10}>
                <SelectForm
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.changeMineria}
                  value={indminera}
                >
                  {minero.map((item, index) => {
                    return (
                      <Option key={index} value={item.id}>
                        {item.value}
                      </Option>
                    );
                  })}
                </SelectForm>
              </ColForm>
            </Field>
          </ColForm>
        </RowForm>
      </FieldContainer>
    );

    const clasRiesgo = (
      <PagePanel titulo="Datos de clasificación de riesgo" children={formClasRiesgo} />
    );

    const datosCambiaron = this.datosCambiaron();

    return (
      <Modal
        title={dataEdit ? messages.clasriesgo.actualizar : messages.clasriesgo.agregar}
        visible={modal}
        centered={false}
        children={clasRiesgo}
        onCancel={handleModalOff}
        onOk={this.onSubmit}
        messageTitle={messages.confirmationTitle}
        messageBody={messages.confirmationBdy}
      />
    );
  }
}

export default FormClasRiesgo;
