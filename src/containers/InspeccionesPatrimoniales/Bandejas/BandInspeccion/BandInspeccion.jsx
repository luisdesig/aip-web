import React from 'react';
import SearchBandInspeccion from './SearchBandInspeccion';
import Table from '../../../../components/Table/Table';
import PageTitle from '../../../../components/Page/TitlePage';
import FormBandInspeccion from './FormBandInspeccion';
import FormMotivo from './FormMotivo';
import { IconWrapper, ButtonForm } from '../../../../components/Util/util.style';
import { showDeleteConfirm } from '../../../../components/Modal/Utils';
import { connect } from 'react-redux';
import { messages } from '../../../../util/messages';
import {} from '../../../../util/messages';
import {
  STARTACTIONSEARCH,
  STARTACTIONPOST,
  STARTACTIONPUT,
  STARTACTIONDELETE,
  STARTACTIONSOLICITUDPOLIZA,
  ACTIONREGISTERGARANTIA,
  ACTIONDELETEGARANTIA,
  ACTIONCLEANINSPECCION,
  ACTIONCHANGEVALUES,
  ACTIONVALUESINMUEBLE,
  STARTACTIONINMUEBLEINSPECCION,
  ACTIONCHANGEVALORDECLARADO,
  STARTACTIONSOLICITUDGARANTIA,
} from '../../../../redux/BandInspeccion/actions';

import {
  STARTACTIONGETSUBGARANTIA,
  ACTIONCLEANINMUEBLES,
} from '../../../../redux/MantGarantia/actions';
import { ACTIONSUBGARANTIA, ACTIONCLEANSUBGARANTIA } from '../../../../redux/Common/filters';
import { STARTACTIONLIST } from '../../../../redux/MantCorredor/actions';
import { STARTACTIONLISTCLIENTES, CLEANCOMBOCLIENTES } from '../../../../redux/Clientes/actions';
import { STARTACTIONLISTZONAS } from '../../../../redux/MantZona/actions';
import { STARTACTIONLISTGIRONEGOCIO } from '../../../../redux/ClasRiesgo/actions';

const index = 'Solicitudes de Inspección';
const indexBuscar = 'CONSULTAR SOLICITUDES DE INSPECCION';
const indexRegistrar = 'REGISTRAR SOLICITUDES DE INSPECCION';
const indexModificar = 'MODIFICAR SOLICITUDES DE INSPECCION';
const indexEliminar = 'CANCELAR SOLICITUDES DE INSPECCION';

class BandPolizas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalBandInspeccion: false,
      BandInspeccionEdit: undefined,
      params: undefined,
      id: undefined,
      modalMotivo: false,
      idesolicitudinspeccion: '',
    };
    this.handleModalOff = this.handleModalOff.bind(this);
    this.searchPoliza = this.searchPoliza.bind(this);
  }
  componentDidMount() {
    this.props.STARTACTIONSEARCH({
      numsolicitudinspeccion: '',
      codprod: '',
      numpol: '',
      nomcorredor: '',
      numdoccliente: '',
      nomcliente: '',
      idpmotivoinspeccion: '',
      ideriesgo: '',
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.bandejainspecciones.reload !== prevProps.bandejainspecciones.reload) {
      this.updateData();
    }
  }
  updateData() {
    this.props.STARTACTIONSEARCH({
      numsolicitudinspeccion: '',
      codprod: '',
      numpol: '',
      nomcorredor: '',
      numdoccliente: '',
      nomcliente: '',
      idpmotivoinspeccion: '',
      ideriesgo: '',
    });
  }
  handleModal = () => {
    this.setState({ modalBandInspeccion: true });
  };
  handleModalMotivo = e => {
    this.setState({ modalMotivo: true, idesolicitudinspeccion: e.idesolicitudinspeccion });
  };
  handleModalOff = () => {
    this.setState({
      modalBandInspeccion: false,
      modalMotivo: false,
      BandInspeccionEdit: undefined,
      idesolicitudinspeccion: '',
      params: undefined,
    });
    this.props.ACTIONCLEANINSPECCION();
    this.props.CLEANCOMBOCLIENTES();
  };
  handleEditBandInspeccion = (e, params) => {
    if (e.motivo.idpmotivoinspeccion === 20) {
      //para renovacion
      this.setState({
        BandInspeccionEdit: e,
        modalBandInspeccion: true,
        params: 'editar',
      });
    } else {
      //para prospecto o endoso
      this.setState({
        BandInspeccionEdit: e,
        modalBandInspeccion: true,
        params: 'endoso',
      });
    }
  };
  handleDeleteBandInspeccion = e => {
    if (e.motivo.idpmotivoinspeccion !== 20) {
      showDeleteConfirm(messages.bandejainspeccion.title, messages.confirmationDelete, () =>
        this.props.STARTACTIONDELETE({
          idesolicitudinspeccion: e.idesolicitudinspeccion,
          dscmotivo: '',
        }),
      );
    } else {
      this.setState({ BandInspeccionEdit: e });
      this.handleModalMotivo(e);
    }
  };
  searchPoliza = data => {
    this.props.STARTACTIONSOLICITUDPOLIZA(data);
    this.setState({ params: 'poliza' });
  };
  render() {
    const {
      modalBandInspeccion,
      BandInspeccionEdit,
      modalMotivo,
      idesolicitudinspeccion,
      params,
    } = this.state;
    const {
      girosocupaciones,
      bandejainspecciones,
      motivosinspeccion,
      riesgos,
      gruposgarantias,
      subgruposgarantias,
      inmueblegarantias,
      garantiascurrent,
      STARTACTIONSEARCH,
      STARTACTIONPOST,
      STARTACTIONPUT,
      STARTACTIONDELETE,
      STARTACTIONSOLICITUDPOLIZA,
      ACTIONSUBGARANTIA,
      STARTACTIONGETSUBGARANTIA,
      ACTIONCLEANINMUEBLES,
      ACTIONCLEANSUBGARANTIA,
      ACTIONREGISTERGARANTIA,
      ACTIONDELETEGARANTIA,
      STARTACTIONLIST,
      STARTACTIONLISTCLIENTES,
      STARTACTIONLISTZONAS,
      STARTACTIONLISTGIRONEGOCIO,
      ACTIONCHANGEVALUES,
      ACTIONVALUESINMUEBLE,
      STARTACTIONINMUEBLEINSPECCION,
      STARTACTIONSOLICITUDGARANTIA,
      ACTIONCLEANINSPECCION,
      ACTIONCHANGEVALORDECLARADO,
      CLEANCOMBOCLIENTES,
      corredores,
      clientes,
      zonas,
      giros,
      parametricas,
      common,
      acciones,
    } = this.props;

    const dataSource = bandejainspecciones.bandejainspecciones;

    let buscar = acciones.permisos.indexOf(indexBuscar);
    let agregar = acciones.permisos.indexOf(indexRegistrar);
    let modificar = acciones.permisos.indexOf(indexModificar);
    let eliminar = acciones.permisos.indexOf(indexEliminar);

    const columns = [
      {
        title: 'Código Inspección',
        dataIndex: 'numsolicitudinspeccion',
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
        title: 'Número de Producto',
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
        title: 'Número de Renovación',
        dataIndex: 'numren',
        width: 'auto',
        sorter: (a, b) => {
          if (a.numren < b.numren) return -1;
          if (a.numren > b.numren) return 1;
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
        title: 'DNI Cliente',
        dataIndex: 'cliente.dni',
        width: 'auto',
        sorter: (a, b) => {
          if (a.cliente.dni < b.cliente.dni) return -1;
          if (a.cliente.dni > b.cliente.dni) return 1;
          return 0;
        },
      },
      {
        title: 'Nombre del Cliente',
        dataIndex: 'cliente.nombre',
        width: 'auto',
        sorter: (a, b) => {
          if (a.cliente.nombre < b.cliente.nombre) return -1;
          if (a.cliente.nombre > b.cliente.nombre) return 1;
          return 0;
        },
      },
      {
        title: 'Indicador de Cuenta Estratégica',
        dataIndex: 'polizaestrategica.nombre',
        width: 'auto',
        sorter: (a, b) => {
          if (a.polizaestrategica.nombre < b.polizaestrategica.nombre) return -1;
          if (a.polizaestrategica.nombre > b.polizaestrategica.nombre) return 1;
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
        title: 'Zona',
        dataIndex: 'zona.nombre',
        width: 'auto',
        sorter: (a, b) => {
          if (a.zona.nombre < b.zona.nombre) return -1;
          if (a.zona.nombre > b.zona.nombre) return 1;
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
        title: 'Ocupación',
        dataIndex: 'ocupacion.nombre',
        width: 'auto',
        sorter: (a, b) => {
          if (a.ocupacion.nombre < b.ocupacion.nombre) return -1;
          if (a.ocupacion.nombre > b.ocupacion.nombre) return 1;
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
                  onClick={() => this.handleEditBandInspeccion(record)}
                />
              )}
              {eliminar < 0 ? (
                ''
              ) : (
                <IconWrapper
                  type="delete"
                  theme="filled"
                  className="edit"
                  onClick={() => this.handleDeleteBandInspeccion(record)}
                />
              )}
            </div>
          );
        },
      },
    ];

    return (
      <div className="container">
        <PageTitle titulo={messages.bandejainspeccion.title} />
        {buscar < 0 ? (
          ''
        ) : (
          <SearchBandInspeccion
            STARTACTIONSEARCH={STARTACTIONSEARCH}
            motivosinspeccion={motivosinspeccion}
            riesgos={riesgos}
          />
        )}
        <div className="text-right">
          {agregar < 0 ? (
            ''
          ) : (
            <ButtonForm className="btn_secondary" onClick={this.handleModal}>
              <i className="i-add" />
              <span>Agregar</span>
            </ButtonForm>
          )}
        </div>
        <Table
          title={messages.bandejainspeccion.title}
          rowKey="idesolicitudinspeccion"
          columns={columns}
          scroll={{ x: '100%' }}
          dataSource={dataSource}
          pageSize={3}
          loading={bandejainspecciones.loading}
        />
        {modalMotivo ? (
          <FormMotivo
            modal={modalMotivo}
            title="Solicitud"
            handleModalOff={this.handleModalOff}
            STARTACTIONDELETE={STARTACTIONDELETE}
            dataEdit={BandInspeccionEdit}
          />
        ) : (
          ''
        )}
        {modalBandInspeccion ? (
          <FormBandInspeccion
            modal={modalBandInspeccion}
            handleModalOff={this.handleModalOff}
            bandejainspeccion={bandejainspecciones.bandejainspeccion}
            inmuebles={bandejainspecciones.inmuebles}
            inmueble={bandejainspecciones.inmueble}
            girosocupaciones={girosocupaciones}
            gruposgarantias={gruposgarantias}
            subgruposgarantias={subgruposgarantias}
            inmueblegarantias={inmueblegarantias}
            dataEdit={BandInspeccionEdit}
            params={params}
            garantiascurrent={bandejainspecciones.garantiascurrent}
            STARTACTIONPOST={STARTACTIONPOST}
            STARTACTIONPUT={STARTACTIONPUT}
            searchPoliza={this.searchPoliza}
            ACTIONSUBGARANTIA={ACTIONSUBGARANTIA}
            STARTACTIONGETSUBGARANTIA={STARTACTIONGETSUBGARANTIA}
            ACTIONCLEANINMUEBLES={ACTIONCLEANINMUEBLES}
            ACTIONREGISTERGARANTIA={ACTIONREGISTERGARANTIA}
            ACTIONDELETEGARANTIA={ACTIONDELETEGARANTIA}
            ACTIONCLEANSUBGARANTIA={ACTIONCLEANSUBGARANTIA}
            STARTACTIONLIST={STARTACTIONLIST}
            STARTACTIONLISTCLIENTES={STARTACTIONLISTCLIENTES}
            STARTACTIONLISTZONAS={STARTACTIONLISTZONAS}
            STARTACTIONLISTGIRONEGOCIO={STARTACTIONLISTGIRONEGOCIO}
            STARTACTIONSOLICITUDGARANTIA={STARTACTIONSOLICITUDGARANTIA}
            corredores={corredores}
            clientes={clientes}
            zonas={zonas}
            giros={giros}
            ACTIONCHANGEVALUES={ACTIONCHANGEVALUES}
            ACTIONVALUESINMUEBLE={ACTIONVALUESINMUEBLE}
            STARTACTIONINMUEBLEINSPECCION={STARTACTIONINMUEBLEINSPECCION}
            ACTIONCLEANINSPECCION={ACTIONCLEANINSPECCION}
            ACTIONCHANGEVALORDECLARADO={ACTIONCHANGEVALORDECLARADO}
            CLEANCOMBOCLIENTES={CLEANCOMBOCLIENTES}
            parametricas={parametricas}
            common={common}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapPropsState = state => ({
  common: state.common,
  bandejainspecciones: state.bandejainspecciones,
  motivosinspeccion: state.common.motivosinspeccion,
  riesgos: state.common.riesgos,
  girosnegocios: state.common.girosnegocios,
  ocupaciones: state.common.ocupaciones,
  gruposgarantias: state.common.gruposgarantias,
  subgruposgarantias: state.common.subgruposgarantias,
  inmueblegarantias: state.garantias.inmueblegarantias,
  //listas
  corredores: state.corredores.combocorredores,
  clientes: state.clientes,
  zonas: state.zonasgeograficas.combozonas,
  giros: state.clasriesgos.combogirosnegocios,
  //parameters
  parametricas: state.common.paramentricas,
  acciones: state.auth.acciones.find(res => res.nombre === index),
});

const mapPropsDispatch = dispatch => ({
  STARTACTIONSEARCH: data => dispatch(STARTACTIONSEARCH(data)),
  STARTACTIONPOST: data => dispatch(STARTACTIONPOST(data)),
  STARTACTIONPUT: data => dispatch(STARTACTIONPUT(data)),
  STARTACTIONDELETE: data => dispatch(STARTACTIONDELETE(data)),
  STARTACTIONSOLICITUDPOLIZA: data => dispatch(STARTACTIONSOLICITUDPOLIZA(data)),
  ACTIONSUBGARANTIA: id => dispatch(ACTIONSUBGARANTIA(id)),
  STARTACTIONGETSUBGARANTIA: data => dispatch(STARTACTIONGETSUBGARANTIA(data)),
  ACTIONCLEANINMUEBLES: () => dispatch(ACTIONCLEANINMUEBLES()),
  ACTIONREGISTERGARANTIA: data => dispatch(ACTIONREGISTERGARANTIA(data)),
  ACTIONDELETEGARANTIA: id => dispatch(ACTIONDELETEGARANTIA(id)),
  ACTIONCLEANINSPECCION: () => dispatch(ACTIONCLEANINSPECCION()),
  ACTIONCLEANSUBGARANTIA: () => dispatch(ACTIONCLEANSUBGARANTIA()),
  STARTACTIONLIST: () => dispatch(STARTACTIONLIST()),
  STARTACTIONLISTCLIENTES: data => dispatch(STARTACTIONLISTCLIENTES(data)),
  STARTACTIONLISTZONAS: () => dispatch(STARTACTIONLISTZONAS()),
  STARTACTIONLISTGIRONEGOCIO: () => dispatch(STARTACTIONLISTGIRONEGOCIO()),
  ACTIONCHANGEVALUES: (key, value) => dispatch(ACTIONCHANGEVALUES(key, value)),
  ACTIONVALUESINMUEBLE: id => dispatch(ACTIONVALUESINMUEBLE(id)),
  STARTACTIONINMUEBLEINSPECCION: data => dispatch(STARTACTIONINMUEBLEINSPECCION(data)),
  ACTIONCHANGEVALORDECLARADO: data => dispatch(ACTIONCHANGEVALORDECLARADO(data)),
  CLEANCOMBOCLIENTES: () => dispatch(CLEANCOMBOCLIENTES()),
  STARTACTIONSOLICITUDGARANTIA: data => dispatch(STARTACTIONSOLICITUDGARANTIA(data)),
});

export default connect(
  mapPropsState,
  mapPropsDispatch,
)(BandPolizas);
