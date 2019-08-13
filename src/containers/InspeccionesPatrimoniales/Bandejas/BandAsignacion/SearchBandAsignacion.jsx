import React from 'react';
import {
  FieldContainer,
  Field,
  ColForm,
  ColFormLabel,
  RowForm,
  ButtonForm,
  SelectForm,
} from '../../../../components/Util/util.style';
import PagePanel from '../../../../components/Page/PanelPage';
import { DatePicker } from 'antd';

const Option = SelectForm.Option;

class SearchBandAsignacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idesolicitudinspeccion: '',
      codprod: '',
      numpol: '',
      nomcorredor: '',
      nomcliente: '',
      idpmotivoinspeccion: 'Seleccione',
      ideingeniero: 'Seleccione',
      idpestinspeccion: 'Seleccione',
      ideriesgo: 'Seleccione',
    };
  }
  changeCodigo = e => {
    const idesolicitudinspeccion = e.target.value;
    if (idesolicitudinspeccion.match(/^[0-9]{0,45}$/)) {
      this.setState({ idesolicitudinspeccion });
    }
  };
  changeProducto = e => {
    const codprod = e.target.value;
    if (codprod.match(/^[0-9]{0,45}$/)) {
      this.setState({ codprod });
    }
  };
  changePoliza = e => {
    const numpol = e.target.value;
    if (numpol.match(/^[0-9]{0,45}$/)) {
      this.setState({ numpol });
    }
  };
  changeIngeniero = e => {
    this.setState({ ideingeniero: e });
  };
  changeNombreCorredor = e => {
    const nomcorredor = e.target.value;
    this.setState({ nomcorredor });
  };
  changeNombreCliente = e => {
    const nomcliente = e.target.value;
    this.setState({ nomcliente });
  };
  changeEstado = e => {
    this.setState({ idpestinspeccion: e });
  };
  changeMotivo = e => {
    const idpmotivoinspeccion = e;
    this.setState({ idpmotivoinspeccion });
  };
  changeRiesgo = e => {
    const ideriesgo = e;
    this.setState({ ideriesgo });
  };

  onClean = () => {
    const state = {
      idesolicitudinspeccion: '',
      codprod: '',
      numpol: '',
      nomcorredor: '',
      nomcliente: '',
      idpmotivoinspeccion: 'Seleccione',
      ideingeniero: 'Seleccione',
      idpestinspeccion: 'Seleccione',
      ideriesgo: 'Seleccione',
    };
    this.setState(state);
    this.props.STARTACTIONSEARCH({
      idesolicitudinspeccion: '',
      codprod: '',
      numpol: '',
      nomcorredor: '',
      nomcliente: '',
      idpmotivoinspeccion: '',
      ideingeniero: '',
      idpestinspeccion: '',
      ideriesgo: '',
    });
  };
  onSearch = () => {
    let data = {
      idesolicitudinspeccion: this.state.idesolicitudinspeccion,
      codprod: this.state.codprod,
      numpol: this.state.numpol,
      nomcorredor: this.state.nomcorredor,
      nomcliente: this.state.nomcliente,
      ideingeniero: this.state.ideingeniero === 'Seleccione' ? '' : this.state.ideingeniero,
      idpestinspeccion:
        this.state.idpestinspeccion === 'Seleccione' ? '' : this.state.idpestinspeccion,
      idpmotivoinspeccion:
        this.state.idpmotivoinspeccion === 'Seleccione' ? '' : this.state.idpmotivoinspeccion,
      ideriesgo: this.state.ideriesgo === 'Seleccione' ? '' : this.state.ideriesgo,
    };
    this.props.STARTACTIONSEARCH(data);
  };

  render() {
    const {
      idesolicitudinspeccion,
      codprod,
      numpol,
      nomcorredor,
      nomcliente,
      ideingeniero,
      idpestinspeccion,
      idpmotivoinspeccion,
      ideriesgo,
    } = this.state;
    const { common } = this.props;
    const FormMantRoles = (
      <FieldContainer>
        <RowForm gutter={16}>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>ID Inspección:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input
                  onChange={this.changeCodigo}
                  value={idesolicitudinspeccion}
                  placeholder="Código"
                />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Nro. de Producto:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input
                  onChange={this.changeProducto}
                  value={codprod}
                  placeholder="Nro. de Producto"
                />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Nro. de Póliza:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input onChange={this.changePoliza} value={numpol} placeholder="Nro. de Póliza" />
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
                  onChange={this.changeNombreCorredor}
                  value={nomcorredor}
                  placeholder="Nombres"
                />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Cliente:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input
                  onChange={this.changeNombreCliente}
                  value={nomcliente}
                  placeholder="Nombres"
                />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Ingeniero QA:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <SelectForm
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.changeIngeniero}
                  value={ideingeniero}
                >
                  {common.ingenierosqas.map((item, index) => {
                    return (
                      <Option key={index} value={item.ideingeniero}>
                        {`${item.nombres} ${item.apepaterno} ${item.apematerno}`}
                      </Option>
                    );
                  })}
                </SelectForm>
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Clasificación de Riesgo:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <SelectForm
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.changeRiesgo}
                  value={ideriesgo}
                >
                  {common.riesgos.map((item, index) => {
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
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Motivo:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <SelectForm
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.changeMotivo}
                  value={idpmotivoinspeccion}
                >
                  {common.motivosinspeccion.map((item, index) => {
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
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Estado:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <SelectForm
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.changeEstado}
                  value={idpestinspeccion}
                >
                  {common.estadosinspeccion.map((item, index) => {
                    if (item.ideparametro === 12 || item.ideparametro === 84) {
                      return (
                        <Option key={index} value={item.ideparametro}>
                          {item.descripcion}
                        </Option>
                      );
                    }
                  })}
                </SelectForm>
              </ColForm>
            </Field>
          </ColForm>
        </RowForm>
        <RowForm gutter={16}>
          <ColForm md={{ span: 8, offset: 8 }} lg={{ span: 6, offset: 9 }}>
            <Field>
              <ColForm sm={12}>
                <ButtonForm className="btn-cta-search" onClick={this.onSearch}>
                  Consultar
                </ButtonForm>
              </ColForm>
              <ColForm sm={12}>
                <ButtonForm className="btn-cta-clear" onClick={this.onClean}>
                  Limpiar
                </ButtonForm>
              </ColForm>
            </Field>
          </ColForm>
        </RowForm>
      </FieldContainer>
    );
    return <PagePanel titulo="Consultas" children={FormMantRoles} />;
  }
}

export default SearchBandAsignacion;
