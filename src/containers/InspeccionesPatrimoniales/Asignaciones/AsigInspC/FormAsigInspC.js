import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import ListCorredor from './TableAsigInspC';
import { showConfirm } from '../../../../components/Modal/Utils';
import { error } from '../../../../components/Messages/Messages';
import PagePanel from '../../../../components/Page/PanelPage';
import {
  FieldContainer,
  RowForm,
  ColForm,
  Field,
  ColFormLabel,
  InputForm,
  SelectForm,
} from '../../../../components/Util/util.style';

const Option = SelectForm.Option;
const Search = InputForm.Search;
class FormAsigInspector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ideingeniero: props.dataEdit ? `${props.dataEdit.inspector.nombres} ${props.dataEdit.inspector.apepaterno} ${props.dataEdit.inspector.apematerno}` : 'Seleccione',
      //ideingeniero: props.dataEdit ? props.dataEdit.inspector.ideingeniero:'Seleccione',    
      ruc: '',
      codigo: '',
      corredor: '',
      nombre: '',
      corredores: [],
      editGrupal: [],
      selectedRowKeys: [],
      selectedRows: [],
      text: '',
      searchData: [],
      status: false
    }
    this.onSelect = this.onSelect.bind(this)
  }
  async componentDidMount() {
    const { params, dataEdit, STARTACTIONGET } = this.props;
    if (params === 'editar') {
      await STARTACTIONGET({ idecorredorinspector: dataEdit.idecorredorinspector })
    } else if (params === 'grupal' || params === 'asignar') {

    } else {
      await this.props.STARTACTIONCORREDORINSPECTORFREE();
    }
  }

  changeIngeniero = async e => {
    if (this.props.params === 'grupal') {
      await this.props.STARTACTIONCORREDORINSPECTOR({ ideingeniero: e });
      this.setState({ ideingeniero: e });
    } else {
      this.setState({ ideingeniero: e });
    }
  };

  onSelect = selectedRows => {
    this.props.ACTIONCHANGEESTADOCORREDOR(selectedRows);
  };

  onSearch = e => {
    const text = e.target.value;
    const newData = this.props.asiginspectorescorredor.corredoresinspectorfree.filter(res => {
      var nombres = `${res.nombroker} ${res.apepatbroker} ${res.apematbroker}`;
      return nombres.toLowerCase().indexOf(text.toLowerCase()) >= 0;
    });
    if (e === '') {
      this.setState({ status: false });
    } else {
      this.setState({ searchData: newData, status: true });
    }
  };

  onSubmit = () => {
    const {
      dataEdit,
      asiginspectorescorredor,
      messages,
      params,
      STARTACTIONPUT,
      STARTACTIONPOST,
      STARTACTIONPUTGRUPAL,
      handleModalOff,
    } = this.props;
    let newData;
    let data = {
      ideingeniero: this.state.ideingeniero,
    };
    if (params === 'editar') {
      newData = asiginspectorescorredor.corredoresinspectorfree[0];
      data.idecorredorinspector = dataEdit.idecorredorinspector;
      data.activo = newData.activo;
      data.corredores = newData
    } else if (params === 'grupal') {
      newData = asiginspectorescorredor.corredoresinspectorfree;
      data.corredores = newData;
    } else {
      newData = asiginspectorescorredor.corredoresinspectorfree.filter(
        res => res.activo.idpactivo === 9,
      );
      data.corredores = newData;
    }
    if (data.ideingeniero !== 'Seleccione') {
      if (params === undefined || params === 'asignar') {
        if (data.corredores.length !== 0) {
          showConfirm(
            messages.asiginspectorescorredor.title,
            messages.confirmationInsert,
            () => STARTACTIONPOST(data),
            () => handleModalOff(),
          );
        } else {
          error(messages.asiginspectorescorredor.validationcorredor);
        }
      } else if (params === 'editar') {
        showConfirm(
          messages.asiginspectorescorredor.title,
          messages.confirmationUpdate,
          () => STARTACTIONPUT(data),
          () => handleModalOff(),
        );
      } else {
        showConfirm(
          messages.asiginspectorescorredor.title,
          messages.confirmationUpdate,
          () => STARTACTIONPUTGRUPAL(data),
          () => handleModalOff(),
        );
      }
    } else {
      error(messages.asiginspectorescorredor.validacion);
    }
  };

  render() {
    const { ideingeniero, selectedRowKeys, status, searchData } = this.state;
    const {
      modal,
      dataEdit,
      params,
      messages,
      ingenierosqas,
      estados,
      asiginspectorescorredor,
      handleModalOff,
    } = this.props;
    var dataSource;
    if (this.props.params === 'editar') {
      dataSource = asiginspectorescorredor.corredoresinspectorfree;
    } else if (this.props.params === 'grupal') {
      dataSource = asiginspectorescorredor.corredoresinspectorfree;
      if (status) {
        dataSource = searchData;
      } else {
        dataSource = asiginspectorescorredor.corredoresinspectorfree;
      }
    } else {
      if (status) {
        dataSource = searchData;
      } else {
        dataSource = asiginspectorescorredor.corredoresinspectorfree;
      }
    }
    const formAsigInspectorC = (
      <FieldContainer>
        <RowForm gutter={16}>
          <ColForm sm={24} lg={24}>
            <Field>
              <ColFormLabel sm={10}>
                <label>Ingeniero:</label>
              </ColFormLabel>
              <ColForm sm={10}>
                <SelectForm
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.changeIngeniero}
                  value={ideingeniero}
                  disabled={params === 'editar' ? true : false}
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
        </RowForm>
      </FieldContainer>
    );

    const AsigInspC = (
      <div>
        <PagePanel titulo="Datos del Ingeniero" children={formAsigInspectorC} />
        <FieldContainer>
          {params === 'editar' ? '' : <RowForm gutter={16}>
            <ColForm sm={24} lg={24}>
              <Field>
                <Search
                  placeholder="Buscar Corredor"
                  onChange={this.onSearch}
                  style={{ width: 200 }}
                />
              </Field>
            </ColForm>
          </RowForm>}
          <RowForm gutter={16}>
            <ColForm lg={24}>
              <ListCorredor
                title="Datos del inspector"
                dataSource={dataSource}
                ideingeniero={ideingeniero}
                params={params}
                estados={estados}
                selectedRowKeys={selectedRowKeys}
                onSelect={this.onSelect}
              />
            </ColForm>
          </RowForm>
        </FieldContainer>
      </div>
    );
    return (
      <Modal
        title={
          dataEdit ? messages.asiginspectorescorredor.actualizar :
            (params === 'grupal' ? messages.asiginspectorescorredor.actualizargrupo :
              messages.asiginspectorescorredor.agregar)}
        visible={modal}
        width='50%'
        centered={false}
        children={AsigInspC}
        onCancel={handleModalOff}
        onOk={this.onSubmit}
        messageTitle={messages.confirmationTitle}
        messageBody={messages.confirmationBdy}
      />
    )
  }
}

export default FormAsigInspector;
