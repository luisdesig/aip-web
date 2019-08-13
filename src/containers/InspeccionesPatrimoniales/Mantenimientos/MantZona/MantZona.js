import React from 'react';
import FormMantZona from './FormMantZona';
import SearchMantZona from './SearchMantZona';
import ListZona from './ListZona';
import Table from '../../../../components/Table/Table';
import { IconWrapper, ButtonForm } from '../../../../components/Util/util.style';
import { showDeleteConfirm } from '../../../../components/Modal/Utils';
import { messages } from '../../../../util/messages';
import PageTitle from '../../../../components/Page/TitlePage';
import { connect } from 'react-redux';
import {
  STARTACTIONPOST,
  STARTACTIONPUT,
  STARTACTIONDELETE,
  STARTACTIONSEARCH,
  STARTACTIONZONASFREE,
} from '../../../../redux/MantZona/actions';
import {
  ACTIONSELECTDEPARTAMENTO,
  ACTIONSELECTPROVINCIA,
  ACTIONSELECTDISTRITO,
  ACTIONREGISTERZONA,
  ACTIONCLEANZONAS,
  ACTIONDELETECURRENTZONA,
  ACTIONCLEANSEARCHZONAS,
} from '../../../../redux/Common/filters';

const index = 'Mantenimiento de Zonas Geográficas';
const indexBuscar = 'CONSULTAR ZONAS GEOGRAFICAS';
const indexRegistrar = 'REGISTRAR ZONAS GEOGRAFICAS';
const indexModificar = 'MODIFICAR ZONAS GEOGRAFICAS';
const indexEliminar = 'ELIMINAR ZONAS GEOGRAFICAS';
const indexPendientes = 'CONSULTAR ZONAS GEOGRAFICAS PENDIENTES';

class MantZona extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalMantZona: false,
      modalPendiente: false,
      zonaEdit: undefined,
      params: undefined,
      id: undefined,
    };
    this.handleModalOff = this.handleModalOff.bind(this);
    this.handleClearInspector = this.handleClearInspector.bind(this);
    this.handleSubmitInspector = this.handleSubmitInspector.bind(this);
    this.handleDeleteInspector = this.handleDeleteInspector.bind(this);
    this.handleAsignarZona = this.handleAsignarZona.bind(this);
  }

  async componentDidMount() {
    await this.props.STARTACTIONSEARCH({
      idezona: '',
      idepais: '',
      idedepartamento: '',
      ideprovincia: '',
      idedistrito: '',
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.zonasgeograficas.reload !== prevProps.zonasgeograficas.reload) {
      this.updateData();
    }
  }
  async updateData() {
    await this.props.STARTACTIONSEARCH({
      idezona: '',
      idepais: '',
      idedepartamento: '',
      ideprovincia: '',
      idedistrito: '',
    });
  }
  handleModal = () => {
    this.setState({ modalMantZona: true });
  };
  handleModalPendiente = () => {
    this.setState({ modalPendiente: true, params: 'sinasignar' });
  };
  handleModalOff = () => {
    this.setState({
      modalMantZona: false,
      modalPendiente: false,
      params: undefined,
      zonaEdit: undefined,
    });
    this.props.ACTIONCLEANZONAS();
  };
  handleEditInspector = (e, params) => {
    this.setState({ zonaEdit: e, modalMantZona: true, params: params });
  };
  handleAsignarZona = (e, params) => {
    this.setState({ modalMantZona: true, zonaEdit: e, params: params });
  };
  handleSubmitInspector = data => {
    this.props.STARTACTIONSEARCH(data);
  };
  handleClearInspector = () => {};
  handleDeleteInspector = e => {
    showDeleteConfirm(messages.zonasgeograficas.title, messages.confirmationDelete, () =>
      this.props.STARTACTIONDELETE(e),
    );
  };

  render() {
    const { modalMantZona, modalPendiente, zonaEdit, params } = this.state;
    const {
      zonasgeograficas,
      zonasgeograficascurrent,
      zonasubigeo,
      paises,
      departamentos,
      provincias,
      distritos,
      zonaErroAdd,
      STARTACTIONSEARCH,
      ACTIONSELECTDEPARTAMENTO,
      ACTIONSELECTPROVINCIA,
      ACTIONSELECTDISTRITO,
      ACTIONREGISTERZONA,
      ACTIONCLEANZONAS,
      ACTIONDELETECURRENTZONA,
      ACTIONCLEANSEARCHZONAS,
      STARTACTIONZONASFREE,
      acciones,
    } = this.props;

    let buscar = acciones.permisos.indexOf(indexBuscar);
    let agregar = acciones.permisos.indexOf(indexRegistrar);
    let modificar = acciones.permisos.indexOf(indexModificar);
    let eliminar = acciones.permisos.indexOf(indexEliminar);
    let pendientes = acciones.permisos.indexOf(indexPendientes);

    const dataSource = zonasgeograficas.zonasgeograficas;
    const zonasfree = zonasgeograficas.zonasgeograficasfree;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'ideubigeozona',
        width: 'auto',
        sorter: (a, b) => {
          if (a.ideubigeozona < b.ideubigeozona) return -1;
          if (a.ideubigeozona > b.ideubigeozona) return 1;
          return 0;
        },
      },
      {
        title: 'Nombre de la Zona',
        dataIndex: 'zona.nombre',
        width: 'auto',
        sorter: (a, b) => {
          if (a.zona.nombre < b.zona.nombre) return -1;
          if (a.zona.nombre > b.zona.nombre) return 1;
          return 0;
        },
      },
      {
        title: 'País',
        dataIndex: 'pais.nombre',
        width: 'auto',
        sorter: (a, b) => {
          if (a.pais.nombre < b.pais.nombre) return -1;
          if (a.pais.nombre > b.pais.nombre) return 1;
          return 0;
        },
      },
      {
        title: 'Departamento',
        dataIndex: 'departamento.nombre',
        width: 'auto',
        sorter: (a, b) => {
          if (a.departamento.nombre < b.departamento.nombre) return -1;
          if (a.departamento.nombre > b.departamento.nombre) return 1;
          return 0;
        },
      },
      {
        title: 'Provincia',
        dataIndex: 'provincia.nombre',
        width: 'auto',
        sorter: (a, b) => {
          if (a.provincia.nombre < b.provincia.nombre) return -1;
          if (a.provincia.nombre > b.provincia.nombre) return 1;
          return 0;
        },
      },
      {
        title: 'Distrito',
        dataIndex: 'distrito.nombre',
        width: 'auto',
        sorter: (a, b) => {
          if (a.distrito.nombre < b.distrito.nombre) return -1;
          if (a.distrito.nombre > b.distrito.nombre) return 1;
          return 0;
        },
      },
      {
        title: 'Acciones',
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
                  onClick={() => this.handleEditInspector(record, 'editar')}
                />
              )}
              {eliminar < 0 ? (
                ''
              ) : (
                <IconWrapper
                  type="delete"
                  theme="filled"
                  className="delete"
                  onClick={() => this.handleDeleteInspector(record.ideubigeozona)}
                />
              )}
            </div>
          );
        },
      },
    ];

    return (
      <div className="container">
        <PageTitle titulo={messages.zonasgeograficas.title} />
        {buscar < 0 ? (
          ''
        ) : (
          <SearchMantZona
            handleSubmitInspector={this.handleSubmitInspector}
            handleClearInspector={this.handleClearInspector}
            zonas={zonasubigeo}
            paises={paises}
            departamentos={departamentos}
            provincias={provincias}
            distritos={distritos}
            STARTACTIONSEARCH={STARTACTIONSEARCH}
            ACTIONSELECTDEPARTAMENTO={ACTIONSELECTDEPARTAMENTO}
            ACTIONSELECTPROVINCIA={ACTIONSELECTPROVINCIA}
            ACTIONSELECTDISTRITO={ACTIONSELECTDISTRITO}
            ACTIONCLEANSEARCHZONAS={ACTIONCLEANSEARCHZONAS}
          />
        )}
        <div className="text-right">
          {pendientes < 0 ? (
            ''
          ) : (
            <ButtonForm className="btn_secondary" onClick={this.handleModalPendiente}>
              <i className="i-add" />
              <span>Pendientes</span>
            </ButtonForm>
          )}
          {agregar < 0 ? (
            ''
          ) : (
            <ButtonForm className="btn_secondary" onClick={this.handleModal}>
              <i className="i-add" />
              <span>Añadir Zona Geográfica</span>
            </ButtonForm>
          )}
        </div>
        {modalMantZona ? (
          <FormMantZona
            modal={modalMantZona}
            handleModalOff={this.handleModalOff}
            dataEdit={zonaEdit}
            params={params}
            STARTACTIONPOST={this.props.STARTACTIONPOST}
            STARTACTIONPUT={this.props.STARTACTIONPUT}
            zonasgeograficascurrent={zonasgeograficascurrent}
            zonas={zonasubigeo}
            paises={paises}
            departamentos={departamentos}
            provincias={provincias}
            distritos={distritos}
            zonaErroAdd={zonaErroAdd}
            ACTIONSELECTDEPARTAMENTO={ACTIONSELECTDEPARTAMENTO}
            ACTIONSELECTPROVINCIA={ACTIONSELECTPROVINCIA}
            ACTIONSELECTDISTRITO={ACTIONSELECTDISTRITO}
            ACTIONREGISTERZONA={ACTIONREGISTERZONA}
            ACTIONCLEANZONAS={ACTIONCLEANZONAS}
            ACTIONDELETECURRENTZONA={ACTIONDELETECURRENTZONA}
          />
        ) : (
          ''
        )}
        {modalPendiente ? (
          <ListZona
            modal={modalPendiente}
            handleModalOff={this.handleModalOff}
            dataSource={zonasfree}
            params={params}
            STARTACTIONZONASFREE={STARTACTIONZONASFREE}
            handleAsignarZona={this.handleAsignarZona}
            STARTACTIONPOST={this.props.STARTACTIONPOST}
            STARTACTIONPUT={this.props.STARTACTIONPUT}
          />
        ) : (
          ''
        )}
        <Table
          title={messages.zonasgeograficas.title}
          rowKey="ideubigeozona"
          columns={columns}
          dataSource={dataSource}
          loading={zonasgeograficas.loading}
        />
      </div>
    );
  }
}

const mapPropsState = state => ({
  zonasgeograficas: state.zonasgeograficas,
  paises: state.common.paises,
  departamentos: state.common.departamentos,
  provincias: state.common.provincias,
  distritos: state.common.distritos,
  zonasubigeo: state.common.zonas,
  zonasgeograficascurrent: state.common.zonasgeograficascurrent,
  zonasgeograficasfree: state.common.zonasgeograficasfree,
  zonaErroAdd: state.zonasgeograficas.statusAdd,
  acciones: state.auth.acciones.find(res => res.nombre === index),
});

const mapPropsDispatch = dispatch => ({
  STARTACTIONPOST: data => dispatch(STARTACTIONPOST(data)),
  STARTACTIONDELETE: id => dispatch(STARTACTIONDELETE(id)),
  STARTACTIONPUT: (id, data) => dispatch(STARTACTIONPUT(id, data)),
  STARTACTIONSEARCH: data => dispatch(STARTACTIONSEARCH(data)),
  ACTIONSELECTDEPARTAMENTO: id => dispatch(ACTIONSELECTDEPARTAMENTO(id)),
  ACTIONSELECTPROVINCIA: id => dispatch(ACTIONSELECTPROVINCIA(id)),
  ACTIONSELECTDISTRITO: id => dispatch(ACTIONSELECTDISTRITO(id)),
  ACTIONREGISTERZONA: data => dispatch(ACTIONREGISTERZONA(data)),
  ACTIONCLEANZONAS: () => dispatch(ACTIONCLEANZONAS()),
  STARTACTIONZONASFREE: () => dispatch(STARTACTIONZONASFREE()),
  ACTIONDELETECURRENTZONA: id => dispatch(ACTIONDELETECURRENTZONA(id)),
  ACTIONCLEANSEARCHZONAS: () => dispatch(ACTIONCLEANSEARCHZONAS()),
});

export default connect(
  mapPropsState,
  mapPropsDispatch,
)(MantZona);
