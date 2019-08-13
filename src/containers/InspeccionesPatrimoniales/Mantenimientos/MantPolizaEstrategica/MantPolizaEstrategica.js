import React from 'react';
import FormMantPolizaEstrategica from './FormMantPolizaEstrategica';
import SearchMantPolizaEstrategica from './SearchMantPolizaEstrategica';
import Table from '../../../../components/Table/Table';
import { IconWrapper, ButtonForm } from '../../../../components/Util/util.style';
import { showDeleteConfirm } from '../../../../components/Modal/Utils';
import { messages } from '../../../../util/messages';
import PageTitle from '../../../../components/Page/TitlePage';
import { connect } from 'react-redux';
import FileImport from '../../../../components/File/import';
import {
  STARTACTIONPOST,
  STARTACTIONPUT,
  STARTACTIONDELETE,
  STARTACTIONSEARCH,
  exportPolizaEstrategica,
  importPolizaEstrategica,
} from '../../../../redux/MantPolizaEstrategica/actions';

const index = 'Mantenimiento de Pólizas Estratégicas';
const indexBuscar = 'CONSULTAR POLIZAS ESTRATEGICAS';
const indexRegistrar = 'REGISTRAR POLIZAS ESTRATEGICAS';
const indexModificar = 'MODIFICAR POLIZAS ESTRATEGICAS';
const indexEliminar = 'ELIMINAR POLIZAS ESTRATEGICAS';
const indexExportar = 'EXPORTAR POLIZAS ESTRATEGICAS';
const indexImportar = 'IMPORTAR POLIZAS ESTRATEGICAS';

class MantPolizaEstrategica extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalMantPolizaEstrategica: false,
      modalImportar: false,
      polizaestrategicaEdit: undefined,
      params: undefined,
      id: undefined,
    };
    this.handleModalOff = this.handleModalOff.bind(this);
    this.handleDeletePolizaEstrategica = this.handleDeletePolizaEstrategica.bind(this);
    this.exportFile = this.exportFile.bind(this);
  }

  async componentDidMount() {
    await this.props.STARTACTIONSEARCH({
      codproducto: '',
      numpoliza: '',
      idpactivo: '',
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.polizasestrategicas.reload !== prevProps.polizasestrategicas.reload) {
      this.updateData();
    }
  }
  async updateData() {
    await this.props.STARTACTIONSEARCH({
      codproducto: '',
      numpoliza: '',
      idpactivo: '',
    });
  }
  handleModal = () => {
    this.setState({ modalMantPolizaEstrategica: true });
  };
  handleModalImportar = () => {
    this.setState({ modalImportar: true });
  };
  handleModalOff = () => {
    this.setState({
      modalMantPolizaEstrategica: false,
      modalImportar: false,
      polizaestrategicaEdit: undefined,
    });
  };
  handleEditPolizaEstrategica = (e, params) => {
    this.setState({ polizaestrategicaEdit: e, modalMantPolizaEstrategica: true, params: params });
  };
  handleDeletePolizaEstrategica = e => {
    showDeleteConfirm(messages.polizas.title, messages.confirmationDelete, () =>
      this.props.STARTACTIONDELETE(e),
    );
  };
  async exportFile() {
    await this.props.exportPolizaEstrategica();
  }
  render() {
    const { modalMantPolizaEstrategica, polizaestrategicaEdit, modalImportar, params } = this.state;
    const {
      polizasestrategicas,
      STARTACTIONSEARCH,
      importPolizaEstrategica,
      estados,
      acciones,
    } = this.props;
    const dataSource = polizasestrategicas.polizasestrategicas;

    let buscar = acciones.permisos.indexOf(indexBuscar);
    let agregar = acciones.permisos.indexOf(indexRegistrar);
    let modificar = acciones.permisos.indexOf(indexModificar);
    let eliminar = acciones.permisos.indexOf(indexEliminar);
    let exportar = acciones.permisos.indexOf(indexExportar);
    let importar = acciones.permisos.indexOf(indexImportar);

    const columns = [
      {
        title: 'ID',
        dataIndex: 'idepolizaestrategica',
        width: 'auto',
        sorter: (a, b) => {
          if (a.idepolizaestrategica < b.idepolizaestrategica) return -1;
          if (a.idepolizaestrategica > b.idepolizaestrategica) return 1;
          return 0;
        },
      },
      {
        title: 'Código de Producto',
        dataIndex: 'codproducto',
        width: 'auto',
        sorter: (a, b) => {
          if (a.codproducto < b.codproducto) return -1;
          if (a.codproducto > b.codproducto) return 1;
          return 0;
        },
      },
      {
        title: 'Número de Póliza',
        dataIndex: 'numpoliza',
        width: 'auto',
        sorter: (a, b) => {
          if (a.numpoliza < b.numpoliza) return -1;
          if (a.numpoliza > b.numpoliza) return 1;
          return 0;
        },
      },
      {
        title: 'Estado',
        dataIndex: 'activo.value1',
        width: 'auto',
        sorter: (a, b) => {
          if (a.activo.value1 < b.activo.value1) return -1;
          if (a.activo.value1 > b.activo.value1) return 1;
          return 0;
        },
      },
      {
        title: 'Acciones',
        fixed: 'right',
        width: 100,
        render: (text, record, index) => {
          return (
            <div className="icons-acciones">
              {modificar < 0 ? (
                ''
              ) : (
                <IconWrapper
                  type="edit"
                  theme="filled"
                  className="edit"
                  onClick={() => this.handleEditPolizaEstrategica(record)}
                />
              )}
              {eliminar < 0 ? (
                ''
              ) : (
                <IconWrapper
                  type="delete"
                  theme="filled"
                  className="delete"
                  onClick={() => this.handleDeletePolizaEstrategica(record.idepolizaestrategica)}
                />
              )}
            </div>
          );
        },
      },
    ];

    return (
      <div className="container">
        <PageTitle titulo={messages.polizas.title} />
        {buscar < 0 ? (
          ''
        ) : (
          <SearchMantPolizaEstrategica
            handleSearchPolizaEstrategica={this.handleSearchPolizaEstrategica}
            STARTACTIONSEARCH={STARTACTIONSEARCH}
            estados={estados}
          />
        )}
        <div className="text-right">
          {importar < 0 ? (
            ''
          ) : (
            <ButtonForm className="btn_secondary" onClick={this.handleModalImportar}>
              <i className="i-add" />
              <span>Importar</span>
            </ButtonForm>
          )}
          {exportar < 0 ? (
            ''
          ) : (
            <ButtonForm className="btn_secondary" onClick={this.exportFile}>
              <i className="i-add" />
              <span>Exportar</span>
            </ButtonForm>
          )}
          {agregar < 0 ? (
            ''
          ) : (
            <ButtonForm className="btn_secondary" onClick={this.handleModal}>
              <i className="i-add" />
              <span>Añadir Póliza Estratégica</span>
            </ButtonForm>
          )}
        </div>
        {modalMantPolizaEstrategica ? (
          <FormMantPolizaEstrategica
            modal={modalMantPolizaEstrategica}
            handleModalOff={this.handleModalOff}
            dataEdit={polizaestrategicaEdit}
            params={params}
            STARTACTIONPOST={this.props.STARTACTIONPOST}
            STARTACTIONPUT={this.props.STARTACTIONPUT}
          />
        ) : (
          ''
        )}
        {modalImportar ? (
          <FileImport
            modal={modalImportar}
            handleModalOff={this.handleModalOff}
            import={importPolizaEstrategica}
            titulos={['CODPRODUCTO', 'NUMPOLIZA']}
          />
        ) : (
          ''
        )}
        <Table
          title={messages.polizas.title}
          rowKey="idepolizaestrategica"
          columns={columns}
          dataSource={dataSource}
          loading={polizasestrategicas.loading}
        />
      </div>
    );
  }
}

const mapPropsState = state => ({
  polizasestrategicas: state.polizasestrategicas,
  estados: state.common.estados,
  acciones: state.auth.acciones.find(res => res.nombre === index),
});

const mapPropsDispatch = dispatch => ({
  STARTACTIONPOST: data => dispatch(STARTACTIONPOST(data)),
  STARTACTIONDELETE: id => dispatch(STARTACTIONDELETE(id)),
  STARTACTIONPUT: (id, data) => dispatch(STARTACTIONPUT(id, data)),
  STARTACTIONSEARCH: data => dispatch(STARTACTIONSEARCH(data)),
  exportPolizaEstrategica: () => dispatch(exportPolizaEstrategica()),
  importPolizaEstrategica: data => dispatch(importPolizaEstrategica(data)),
});

export default connect(
  mapPropsState,
  mapPropsDispatch,
)(MantPolizaEstrategica);
