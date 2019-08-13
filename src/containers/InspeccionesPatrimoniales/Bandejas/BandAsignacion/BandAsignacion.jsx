import React from 'react';
import FormBandAsignacion from './FormBandAsignacion';
import SearchBandAsignacion from './SearchBandAsignacion';
import Table from '../../../../components/Table/Table';
import PageTitle from '../../../../components/Page/TitlePage';
import FormMotivo from '../BandInspeccion/FormMotivo';
import { IconWrapper } from '../../../../components/Util/util.style';
import { connect } from 'react-redux';
import { messages } from '../../../../util/messages';
import {} from '../../../../util/messages';
import {
  STARTACTIONSEARCH,
  STARTACTIONGET,
  STARTACTIONPOST,
  STARTACTIONPUT,
  STARTACTIONDELETE,
  ACTIONCLEANASIGNACION,
  ACTIONCHANGEVALUES,
  STARTACTIONGETINSPECTORES,
  STARTACTIONGETAGENDA,
  ACTIONASIGNARHORA,
  STARTACTIONEDITAGENDA,
} from '../../../../redux/BandAsignacion/actions';
import { STARTACTIONLISTGIRONEGOCIO } from '../../../../redux/ClasRiesgo/actions';

const index = 'Asignación de Inspector';
const indexBuscar = 'CONSULTAR ASIGNACION DE INSPECTOR';
//const indexRegistrar = 'REGISTRAR ASIGNACION DE INSPECTOR';
const indexModificar = 'REGISTRAR ASIGNACION DE INSPECTOR';
const indexEliminar = 'CANCELAR ASIGNACION DE INSPECTOR';

class BandPolizas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalBandAsignacion: false,
      BandAsignacionEdit: undefined,
      params: undefined,
      id: undefined,
      modalMotivo: false,
      idesolicitudinspeccion: '',
    };
    this.handleModalOff = this.handleModalOff.bind(this);
  }
  async componentDidMount() {
    this.props.STARTACTIONSEARCH({
      idesolicitudinspeccion: '',
      codprod: '',
      numpol: '',
      nomcorredor: '',
      nomcliente: '',
      idpmotivoinspeccion: '',
      ideriesgo: '',
      ideingeniero: '',
      idpestinspeccion: '',
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.bandejaasignaciones.reload !== prevProps.bandejaasignaciones.reload) {
      this.updateData();
    }
  }
  updateData() {
    this.props.STARTACTIONSEARCH({
      idesolicitudinspeccion: '',
      codprod: '',
      numpol: '',
      nomcorredor: '',
      nomcliente: '',
      idpmotivoinspeccion: '',
      ideriesgo: '',
      ideingeniero: '',
      idpestinspeccion: '',
    });
  }

  handleModal = () => {
    this.setState({ modalBandAsignacion: true });
  };
  handleModalMotivo = e => {
    this.setState({ modalMotivo: true, idesolicitudinspeccion: e.idesolicitudinspeccion });
  };
  handleModalOff = () => {
    this.setState({
      modalBandAsignacion: false,
      modalMotivo: false,
      BandAsignacionEdit: undefined,
      idesolicitudinspeccion: '',
    });
    this.props.ACTIONCLEANASIGNACION();
  };
  handleEditBandAsignacion = e => {
    this.setState({ modalBandAsignacion: true, BandAsignacionEdit: e });
  };
  handleDeleteBandAsignacion = e => {
    this.setState({ BandAsignacionEdit: e });
    this.handleModalMotivo(e);
  };
  render() {
    const { BandAsignacionEdit, modalMotivo, modalBandAsignacion } = this.state;
    const {
      bandejaasignaciones,
      common,
      STARTACTIONSEARCH,
      STARTACTIONGET,
      STARTACTIONPOST,
      STARTACTIONPUT,
      STARTACTIONDELETE,
      STARTACTIONLISTGIRONEGOCIO,
      ACTIONCHANGEVALUES,
      STARTACTIONGETINSPECTORES,
      STARTACTIONGETAGENDA,
      STARTACTIONEDITAGENDA,
      ACTIONASIGNARHORA,
      giros,
      acciones,
    } = this.props;

    let buscar = acciones.permisos.indexOf(indexBuscar);
    //let agregar = acciones.permisos.indexOf(indexRegistrar);
    let modificar = acciones.permisos.indexOf(indexModificar);
    let eliminar = acciones.permisos.indexOf(indexEliminar);

    const dataSource = bandejaasignaciones.bandejaasignaciones;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'idesolicitudinspeccion',
        width: 'auto',
        sorter: (a, b) => {
          if (a.idesolicitudinspeccion < b.idesolicitudinspeccion) return -1;
          if (a.idesolicitudinspeccion > b.idesolicitudinspeccion) return 1;
          return 0;
        },
      },
      {
        title: 'Motivo Inspección',
        dataIndex: 'motivo.nombre',
        width: 'auto',
        sorter: (a, b) => {
          if (a.motivo.nombre < b.motivo.nombre) return -1;
          if (a.motivo.nombre > b.motivo.nombre) return 1;
          return 0;
        },
      },
      {
        title: 'Número de producto',
        dataIndex: 'codprod',
        width: 'auto',
        sorter: (a, b) => {
          if (a.codprod < b.codprod) return -1;
          if (a.codprod > b.codprod) return 1;
          return 0;
        },
      },
      {
        title: 'Número de Póliza',
        dataIndex: 'numpol',
        width: 'auto',
        sorter: (a, b) => {
          if (a.numpol < b.numpol) return -1;
          if (a.numpol > b.numpol) return 1;
          return 0;
        },
      },
      {
        title: 'Corredor',
        dataIndex: 'corredor.nombre',
        width: 'auto',
        sorter: (a, b) => {
          if (a.corredor.nombre < b.corredor.nombre) return -1;
          if (a.corredor.nombre > b.corredor.nombre) return 1;
          return 0;
        },
      },
      {
        title: 'Cliente',
        dataIndex: 'cliente.nombre',
        width: 'auto',
        sorter: (a, b) => {
          if (a.cliente.nombre < b.cliente.nombre) return -1;
          if (a.cliente.nombre > b.cliente.nombre) return 1;
          return 0;
        },
      },
      {
        title: 'Giro de Negocio',
        dataIndex: 'gironegocio.nombre',
        width: 'auto',
        sorter: (a, b) => {
          if (a.gironegocio.nombre < b.gironegocio.nombre) return -1;
          if (a.gironegocio.nombre > b.gironegocio.nombre) return 1;
          return 0;
        },
      },
      {
        title: 'Ocupacion',
        dataIndex: 'ocupacion.nombre',
        width: 'auto',
        sorter: (a, b) => {
          if (a.ocupacion.nombre < b.ocupacion.nombre) return -1;
          if (a.ocupacion.nombre > b.ocupacion.nombre) return 1;
          return 0;
        },
      },
      {
        title: 'Clasificación de Riesgo',
        dataIndex: 'riesgo.nombre',
        width: 'auto',
        sorter: (a, b) => {
          if (a.riesgo.nombre < b.riesgo.nombre) return -1;
          if (a.riesgo.nombre > b.riesgo.nombre) return 1;
          return 0;
        },
      },
      {
        title: 'Id Inmueble',
        dataIndex: 'ideinmueblepoliza',
        width: 'auto',
        sorter: (a, b) => {
          if (a.ideinmueblepoliza < b.ideinmueblepoliza) return -1;
          if (a.ideinmueblepoliza > b.ideinmueblepoliza) return 1;
          return 0;
        },
      },
      {
        title: 'Dirección',
        dataIndex: 'direccion',
        width: 'auto',
        sorter: (a, b) => {
          if (a.direccion < b.direccion) return -1;
          if (a.direccion > b.direccion) return 1;
          return 0;
        },
      },
      {
        title: 'Valor Declarado',
        dataIndex: 'valordeclarado',
        width: 'auto',
        sorter: (a, b) => {
          if (a.valordeclarado < b.valordeclarado) return -1;
          if (a.valordeclarado > b.valordeclarado) return 1;
          return 0;
        },
      },
      {
        title: 'Nombre Contacto',
        dataIndex: 'nomcontacto',
        width: 'auto',
        sorter: (a, b) => {
          if (a.nomcontacto < b.nomcontacto) return -1;
          if (a.nomcontacto > b.nomcontacto) return 1;
          return 0;
        },
      },
      {
        title: 'Apellido Paterno',
        dataIndex: 'apepatcontacto',
        width: 'auto',
        sorter: (a, b) => {
          if (a.apepatcontacto < b.apepatcontacto) return -1;
          if (a.apepatcontacto > b.apepatcontacto) return 1;
          return 0;
        },
      },
      {
        title: 'Apellido Materno',
        dataIndex: 'apematcontacto',
        width: 'auto',
        sorter: (a, b) => {
          if (a.apematcontacto < b.apematcontacto) return -1;
          if (a.apematcontacto > b.apematcontacto) return 1;
          return 0;
        },
      },
      {
        title: 'Ingeniero QA',
        dataIndex: 'ingeniero.nombres',
        width: 'auto',
        sorter: (a, b) => {
          if (a.ingeniero.nombres < b.ingeniero.nombres) return -1;
          if (a.ingeniero.nombres > b.ingeniero.nombres) return 1;
          return 0;
        },
      },
      {
        title: 'Estado',
        dataIndex: 'estado.nombre',
        width: 'auto',
        sorter: (a, b) => {
          if (a.estado.nombre < b.estado.nombre) return -1;
          if (a.estado.nombre > b.estado.nombre) return 1;
          return 0;
        },
      },
      {
        title: 'Acciones',
        width: 0,
        render: (text, record) => {
          return (
            <div className="icons-acciones">
              {modificar < 0 ? (
                ''
              ) : (
                <IconWrapper
                  type="edit"
                  theme="filled"
                  className="edit"
                  onClick={() => this.handleEditBandAsignacion(record)}
                />
              )}
              {eliminar < 0 ? (
                ''
              ) : (
                <IconWrapper
                  type="delete"
                  theme="filled"
                  className="edit"
                  onClick={() => this.handleDeleteBandAsignacion(record)}
                />
              )}
            </div>
          );
        },
      },
    ];

    return (
      <div className="container">
        <PageTitle titulo={messages.bandejaasignacion.title} />
        {buscar < 0 ? (
          ''
        ) : (
          <SearchBandAsignacion STARTACTIONSEARCH={STARTACTIONSEARCH} common={common} />
        )}
        {modalMotivo ? (
          <FormMotivo
            modal={modalMotivo}
            title="Inspeccion"
            handleModalOff={this.handleModalOff}
            STARTACTIONDELETE={STARTACTIONDELETE}
            dataEdit={BandAsignacionEdit}
          />
        ) : (
          ''
        )}
        {modalBandAsignacion ? (
          <FormBandAsignacion
            modal={modalBandAsignacion}
            handleModalOff={this.handleModalOff}
            bandejaasignacion={bandejaasignaciones.bandejaasignacion}
            dataEdit={BandAsignacionEdit}
            STARTACTIONGET={STARTACTIONGET}
            STARTACTIONPOST={STARTACTIONPOST}
            STARTACTIONPUT={STARTACTIONPUT}
            STARTACTIONLISTGIRONEGOCIO={STARTACTIONLISTGIRONEGOCIO}
            STARTACTIONEDITAGENDA={STARTACTIONEDITAGENDA}
            ingenierosqas={common.ingenierosqas}
            ACTIONCHANGEVALUES={ACTIONCHANGEVALUES}
            STARTACTIONGETINSPECTORES={STARTACTIONGETINSPECTORES}
            STARTACTIONGETAGENDA={STARTACTIONGETAGENDA}
            agenda={bandejaasignaciones.agenda}
            giros={giros}
            comboinspectores={bandejaasignaciones.comboinspectores}
            ACTIONASIGNARHORA={ACTIONASIGNARHORA}
          />
        ) : (
          ''
        )}
        <Table
          title={messages.bandejaasignacion.title}
          rowKey="idesolicitudinspeccion"
          columns={columns}
          scroll={{ x: '100%' }}
          dataSource={dataSource}
          pageSize={10}
          loading={bandejaasignaciones.loading}
        />
      </div>
    );
  }
}

const mapPropsState = state => ({
  bandejaasignaciones: state.bandejaasignaciones,
  common: state.common,
  giros: state.clasriesgos.combogirosnegocios,
  acciones: state.auth.acciones.find(res => res.nombre === index),
});

const mapPropsDispatch = dispatch => ({
  STARTACTIONSEARCH: data => dispatch(STARTACTIONSEARCH(data)),
  STARTACTIONGET: data => dispatch(STARTACTIONGET(data)),
  STARTACTIONPOST: data => dispatch(STARTACTIONPOST(data)),
  STARTACTIONPUT: data => dispatch(STARTACTIONPUT(data)),
  STARTACTIONDELETE: data => dispatch(STARTACTIONDELETE(data)),
  ACTIONCLEANASIGNACION: () => dispatch(ACTIONCLEANASIGNACION()),
  STARTACTIONLISTGIRONEGOCIO: () => dispatch(STARTACTIONLISTGIRONEGOCIO()),
  ACTIONCHANGEVALUES: (key, value) => dispatch(ACTIONCHANGEVALUES(key, value)),
  STARTACTIONGETINSPECTORES: data => dispatch(STARTACTIONGETINSPECTORES(data)),
  STARTACTIONGETAGENDA: data => dispatch(STARTACTIONGETAGENDA(data)),
  ACTIONASIGNARHORA: (ideriesgo, data) => dispatch(ACTIONASIGNARHORA(ideriesgo, data)),
  STARTACTIONEDITAGENDA: data => dispatch(STARTACTIONEDITAGENDA(data)),
});

export default connect(
  mapPropsState,
  mapPropsDispatch,
)(BandPolizas);
