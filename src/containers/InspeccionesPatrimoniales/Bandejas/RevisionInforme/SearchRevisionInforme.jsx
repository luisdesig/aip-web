import React from 'react';
import {
  FieldContainer,
  Field,
  ColForm,
  ColFormLabel,
  RowForm,
  SelectForm,
  ButtonForm,
} from '../../../../components/Util/util.style';
import PagePanel from '../../../../components/Page/PanelPage';
import { DatePicker, Button } from 'antd';
import Reactotron from 'reactotron-react-js';

const Option = SelectForm.Option;
const { RangePicker } = DatePicker;

class SearchRevisionInforme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cargandoInformes: false,
      ideinformeinspeccion: null,
      idecuestionario: null,
      idpmotivoinspeccion: null,
      idpestinspeccion: null,
      numpoliza: null,
      cliente: null,
      corredor: null,
      ideingeniero: null,
      fechainspeccion: null,
      ERROR: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ cargandoInformes: nextProps.cargandoInformes });
  }
  changeInformeInspeccion = e => {
    const ideinformeinspeccion = e.target.value || null;
    this.setState({ ideinformeinspeccion });
    /*
    if (ideinformeinspeccion.match(/^[0-9]{0,45}$/)) {
      this.setState({ ideinformeinspeccion });
    }
    */
  };
  changeMotivoInspeccion = e => {
    this.props.motivosinspeccion.find(res => res.ideparametro === e);
    this.setState({ idpmotivoinspeccion: e });
  };
  changeEstadoInspeccion = e => {
    this.props.estadosinspeccion.find(res => res.ideparametro === e);
    this.setState({ idpestinspeccion: e });
  };
  changeNumPoliza = e => {
    const numpoliza = e.target.value;
    if (numpoliza.match(/^[0-9]{0,45}$/)) {
      this.setState({ numpoliza });
    }
  };
  changeCorredor = e => {
    const corredor = e.target.value;
    if (corredor.match(/^[ ´a-zA-Z]{0,45}$/)) {
      this.setState({ corredor });
    }
  };
  changeCliente = e => {
    const cliente = e.target.value;
    if (cliente.match(/^[ ´a-zA-Z]{0,45}$/)) {
      this.setState({ cliente });
    }
  };
  changeIngenieroQA = e => {
    this.props.ingenierosqas.find(res => res.ideingeniero === e);
    this.setState({ ideingeniero: e });
  };
  changeFechaInspeccion = e => {
    this.setState({ fechainspeccion: e });
  };
  onClean = () => {
    this.props.STARTACTIONSEARCH();
    let state = {
      ideinformeinspeccion: null,
      idecuestionario: null,
      idpmotivoinspeccion: null,
      idpestinspeccion: null,
      numpoliza: null,
      cliente: null,
      corredor: null,
      ideingeniero: null,
      fechainspeccion: null,
    };
    this.setState(state);
    this.props.STARTACTIONSEARCH(state);
  };
  onSearch = () => {
    let {
      ideinformeinspeccion,
      idecuestionario,
      idpmotivoinspeccion,
      idpestinspeccion,
      ideingeniero,
      numpoliza,
      cliente,
      corredor,
      fechainspeccion,
    } = this.state;
    let data = {
      ideinformeinspeccion: ideinformeinspeccion,
      idecuestionario: idecuestionario,
      idpmotivoinspeccion: idpmotivoinspeccion,
      idpestinspeccion: idpestinspeccion,
      ideingeniero: ideingeniero,
      numpoliza: numpoliza,
      cliente: cliente,
      corredor: corredor,
      fechainspeccion: fechainspeccion,
    };
    this.setState({ cargandoInformes: true });
    this.props.STARTACTIONSEARCH(data);
  };
  render() {
    let {
      ideinformeinspeccion,
      idpmotivoinspeccion,
      idpestinspeccion,
      numpoliza,
      cliente,
      corredor,
      ideingeniero,
      fechainspeccion,
      cargandoInformes,
    } = this.state;
    const { motivosinspeccion, estadosinspeccion, ingenierosqas } = this.props;
    const RevisionInforme = (
      <FieldContainer>
        <RowForm gutter={16}>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Cód. Informe:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input
                  onChange={this.changeInformeInspeccion}
                  value={ideinformeinspeccion}
                  placeholder="Cód. Informe"
                />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={12} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Motivo ins.:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <SelectForm
                  placeholder="Todos"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.changeMotivoInspeccion}
                  value={idpmotivoinspeccion ? idpmotivoinspeccion : undefined}
                >
                  <Option key={-1} value={null}>
                    {'Todos'}
                  </Option>
                  {motivosinspeccion.map((item, index) => {
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
          <ColForm sm={12} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Estado ins.:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <SelectForm
                  showSearch
                  placeholder="Todos"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.changeEstadoInspeccion}
                  value={idpestinspeccion ? idpestinspeccion : undefined}
                >
                  <Option key={-1} value={null}>
                    {'Todos'}
                  </Option>
                  {estadosinspeccion.map((item, index) => {
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
                <label>Nro. Poliza:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input
                  onChange={this.changeNumPoliza}
                  value={numpoliza}
                  placeholder="Nro. Poliza"
                />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Corredor:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input onChange={this.changeNumPoliza} value={corredor} placeholder="Corredor" />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={24} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Cliente:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <input onChange={this.changeNumPoliza} value={cliente} placeholder="Cliente" />
              </ColForm>
            </Field>
          </ColForm>
          <ColForm sm={12} lg={8}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Ingeniero Resp.:</label>
              </ColFormLabel>
              <ColForm sm={14}>
                <SelectForm
                  showSearch
                  placeholder="Seleccione"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.changeIngenieroQA}
                  value={ideingeniero ? ideingeniero : undefined}
                >
                  {ingenierosqas.map((item, index) => {
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
          <ColForm sm={24} lg={16}>
            <Field>
              <ColFormLabel sm={8}>
                <label>Fecha Inspección:</label>
              </ColFormLabel>
            </Field>
            <RangePicker value={fechainspeccion} onChange={this.changeFechaInspeccion} />
          </ColForm>
        </RowForm>
        <RowForm gutter={16}>
          <ColForm md={{ span: 8, offset: 8 }} lg={{ span: 6, offset: 9 }}>
            <Field>
              <ColForm sm={12}>
                {/*<ButtonForm
                  className="btn-cta-search"
                  onClick={this.onSearch}
                  disabled={ERROR.length === 0 ? false : true}
                >
                  Consultar
                </ButtonForm>*/}
                <Button
                  className="btn-cta-search"
                  type="primary"
                  loading={cargandoInformes}
                  onClick={this.onSearch}
                >
                  Consultar
                </Button>
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

    return <PagePanel titulo="Consultas" children={RevisionInforme} />;
  }
}

export default SearchRevisionInforme;
