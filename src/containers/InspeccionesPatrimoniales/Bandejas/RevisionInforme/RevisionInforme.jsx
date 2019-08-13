import React from 'react';
import SearchRevisionInforme from './SearchRevisionInforme';
import Table from '../../../../components/Table/Table';
import PageTitle from '../../../../components/Page/TitlePage';
import { IconWrapper } from '../../../../components/Util/util.style';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-js';
import { messages } from '../../../../util/messages';
import { ModalWrapper } from '../../../../components/Modal/Modal.style';
import { EstadosInspeccion } from '../../../../services/constants';
import {
  STARTACTIONSEARCH,
  STARTACTIONGET,
  ACTIONCHANGEVALUESCUESTIONARIO,
  cancelarInformeAction,
  reprogramarInformeAction,
  rechazarInformeAction,
  finalizarInformeAction,
} from '../../../../redux/RevisionInforme/actions';
import {
  STARTACTIONGETMEDIA,
  STARTACTIONPOSTMEDIA,
  getGrupoPregunta,
  addComentario,
  deleteComentario,
  updateComentario,
  deleteImage,
} from '../../../../redux/Media/actions';
import {
  listarGarantiasRecInformeAction,
  procesarLoteGarantiaRecInformeAction,
} from '../../../../redux/GarantiaRecomendacion/actions';
import { getScoring, cleanScoring } from '../../../../redux/Scoring/actions';
import { consultarCategoriasPorInspeccionAction, descargarInspeccionAction } from '../../../../redux/Categorias/actions';
import {
  guardarCuestionarioTrabajadoAction,
  guardarCuestionarioAction,
} from '../../../../redux/CuestionarioTrabajado/actions';
import DetalleInforme from './DetalleInforme/DetalleInforme';
import { notification, Popover, Button, Input } from 'antd';

import axios from 'axios';
import { APIBASE } from './../../../../services/constants';

const { TextArea } = Input;

class RevisionInforme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalImportar: false,
      informeInspeccion: undefined,
      params: undefined,
      modaDetalleInformeVisible: false,
      modalCategoriaVisible: false,
      id: undefined,
      modalCancelarInspeccionVisible: false,
      modalReprogramarInspeccionVisible: false,
      modalRechazarInspeccionVisible: false,
      modalFinalizarInspeccionVisible: false,
      inspeccionSeleccionada: null,
      motivoCancelacion: '',
    };
    //this.handleModalOff = this.handleModalOff.bind(this);
    //this.handleModal = this.handleModal.bind(this);
    // props.STARTACTIONSEARCH({});
  }

  async componentDidMount() {
    await this.props.STARTACTIONSEARCH({});
  }

  async componentDidUpdate(prevProps) {
    this.comprobarActualizacionDeCuestionario(prevProps);
    await this.comprobarActualizarInspeccion(prevProps);
  }

  comprobarActualizacionDeCuestionario = prevProps => {
    if (this.props.cuestionarioTrabajados.error) {
      notification.error({
        message: 'Ocurrió un error al actualizar cuestionario',
        description: 'Error',
      });
    }
    const seTerminoDeGuardarCuestionario = !this.props.guardandoCuestionario;
    const seIntentoGuardarCuestionarioPreviamente = !!prevProps.guardandoCuestionario;
    if (
      seIntentoGuardarCuestionarioPreviamente &&
      seTerminoDeGuardarCuestionario &&
      !this.props.cuestionarioTrabajados.error
    ) {
      notification.success({
        message: 'Cuestionario Actualizado',
        description: 'Exito',
      });
    }
  };



  descargarInformeInspeccion = async prevProps => {
    const url = `${APIBASE}/obtReporte`;
    console.log(url);
    const data = {
        "request": {
          "trace": {
            "serviceId": "API-SEG",
            "consumerId": "WEBPRIV",
            "moduleId": "module id",
            "channelCode": "web",
            "traceId": "125751027100110360156000000000000",
            "timestamp": "2019-07-24  4:02:49 pm",
            "identity": {
              "userId": "eddy.cordova.rsr@viaexperis.pe",
              "deviceId": "device id",
              "host": "host ip",
              "accesoId": 1
            },
            "functionId": 1
          },
          "payload": {
            "ideCuestInspec": "2"
          }
        }
      };


    const responseBody = await axios({
      method: 'POST',
      url: url,
      data,
    });

  };


  comprobarActualizarInspeccion = async prevProps => {
    if (
      this.props.revisioninformes.error &&
      prevProps.revisioninformes.error !== this.props.revisioninformes.error
    ) {
      notification.error({
        message: this.props.revisioninformes.error,
        description: 'Error',
      });
    }
    const seTerminoDeGuardarRevisionInforme = !this.props.guardandoRevisionInforme;
    const seIntentoGuardarRevisionInformePreviamente = !!prevProps.guardandoRevisionInforme;
    if (
      seIntentoGuardarRevisionInformePreviamente &&
      seTerminoDeGuardarRevisionInforme &&
      !this.props.revisioninformes.error
    ) {
      await this.props.STARTACTIONSEARCH({});
      notification.success({
        message: 'Operación Satisfactoria!',
        description: 'Éxito',
      });
      this.cambiarVisibilidadModalCancelarInspeccion(false);
      this.cambiarVisibilidadModalReprogramarInspeccion(false);
      this.cambiarVisibilidadModalRechazarInspeccion(false);
      this.cambiarVisibilidadModalFinalizarInspeccion(false);
      this.cambiarVisibilidadModalDetalleInforme();
    }
  };

  /*
  updateData() {
    this.props.STARTACTIONSEARCH();
  }
  */

  handleModal = () => {
    this.setState({
      modaDetalleInformeVisible: true,
      modalCategoriaVisible: true,
    });
  };

  handleModalOff = () => {
    this.setState({
      modaDetalleInformeVisible: true,
      modalCategoriaVisible: false,
    });
  };
  cambiarVisibilidadModalDetalleInforme = () => {
    this.setState({
      modaDetalleInformeVisible: false,
    });
    this.props.cleanScoring();
  };

  mostrarCancelarInformeInspeccion = record => {
    this.setState({ inspeccionSeleccionada: record });
    this.cambiarVisibilidadModalCancelarInspeccion();
  };

  mostrarReprogramarInformeInspeccion = record => {
    this.setState({ inspeccionSeleccionada: record });
    this.cambiarVisibilidadModalReprogramarInspeccion();
  };

  cambiarVisibilidadModalCancelarInspeccion = visibilidadDefinida => {
    const esDefinido = visibilidadDefinida !== undefined ? true : false;
    const { modalCancelarInspeccionVisible } = this.state;
    this.setState({
      modalCancelarInspeccionVisible: esDefinido
        ? visibilidadDefinida
        : !modalCancelarInspeccionVisible,
      motivoCancelacion: '',
    });
  };

  cambiarVisibilidadModalRechazarInspeccion = visibilidadDefinida => {
    const esDefinido = visibilidadDefinida !== undefined ? true : false;
    const { modalRechazarInspeccionVisible } = this.state;
    this.setState({
      modalRechazarInspeccionVisible: esDefinido
        ? visibilidadDefinida
        : !modalRechazarInspeccionVisible,
    });
  };

  cambiarVisibilidadModalFinalizarInspeccion = visibilidadDefinida => {
    const esDefinido = visibilidadDefinida !== undefined ? true : false;
    const { modalFinalizarInspeccionVisible } = this.state;
    this.setState({
      modalFinalizarInspeccionVisible: esDefinido
        ? visibilidadDefinida
        : !modalFinalizarInspeccionVisible,
    });
  };

  cambiarVisibilidadModalReprogramarInspeccion = visibilidadDefinida => {
    const esDefinido = visibilidadDefinida !== undefined ? true : false;
    const { modalReprogramarInspeccionVisible } = this.state;
    this.setState({
      modalReprogramarInspeccionVisible: esDefinido
        ? visibilidadDefinida
        : !modalReprogramarInspeccionVisible,
    });
  };

  handleRevisionCuestionario = e => {
    this.setState({
      informeInspeccion: e,
      modaDetalleInformeVisible: true,
      modalCategoriaVisible: false,
      params: 'editar',
    });
  };

  render() {
    const {
      informeInspeccion,
      modaDetalleInformeVisible,
      params,
      modalCancelarInspeccionVisible,
      modalReprogramarInspeccionVisible,
      motivoCancelacion,
      modalRechazarInspeccionVisible,
      modalFinalizarInspeccionVisible,
    } = this.state;
    const {
      revisioninformes,
      motivosinspeccion,
      estadosinspeccion,
      ingenierosqas,
      STARTACTIONSEARCH,
      guardandoCuestionario,
      cargandoInformes,
      consultarCategoriasPorInspeccionAction,
      guardarCuestionarioTrabajado,
      categorias,
      cargandoCategorias,
      STARTACTIONGETMEDIA,
      getScoring,
      medias,
      scoring,
      respuestas,
      getGrupoPregunta,
      addComentario,
      deleteComentario,
      updateComentario,
      STARTACTIONPOSTMEDIA,
      deleteImage,
      cancelarInforme,
      rechazarInforme,
      finalizarInforme,
      guardandoRevisionInforme,
      STARTGARANTIARECINFORME,
      procesarLoteGarantiaRecInformeAction,
      loteGarantiaRecInforme,
    } = this.props;
    const dataSource = revisioninformes.revisioninformes;
    /*if (revisioninformes.reload) {
      this.updateData();
    }*/
    const columns = [
      {
        title: 'Código Inspección',
        dataIndex: 'codigoInspeccion',
        width: 'auto',
        sorter: (a, b) => {
          if (a.codigoInspeccion < b.codigoInspeccion) return -1;
          if (a.codigoInspeccion > b.codigoInspeccion) return 1;
          return 0;
        },
      },
      {
        title: 'Motivo Inspección',
        dataIndex: 'motivoInspeccion',
        width: 'auto',
        sorter: (a, b) => {
          if (a.motivoInspeccion < b.motivoInspeccion) return -1;
          if (a.motivoInspeccion > b.motivoInspeccion) return 1;
          return 0;
        },
      },
      {
        title: 'Cod. Producto',
        dataIndex: 'codigoProducto',
        width: 'auto',
        sorter: (a, b) => {
          if (a.codigoProducto < b.codigoProducto) return -1;
          if (a.codigoProducto > b.codigoProducto) return 1;
          return 0;
        },
      },
      {
        title: 'Nro. Poliza',
        dataIndex: 'numPoliza',
        width: 'auto',
        sorter: (a, b) => {
          if (a.numPoliza < b.numPoliza) return -1;
          if (a.numPoliza > b.numPoliza) return 1;
          return 0;
        },
      },
      {
        title: 'Cliente',
        dataIndex: 'nomCliente',
        width: 'auto',
        sorter: (a, b) => {
          if (a.nomCliente < b.nomCliente) return -1;
          if (a.nomCliente > b.nomCliente) return 1;
          return 0;
        },
      },
      {
        title: 'Corredor',
        dataIndex: 'nomCorredor',
        width: 'auto',
        sorter: (a, b) => {
          if (a.nomCorredor < b.nomCorredor) return -1;
          if (a.nomCorredor > b.nomCorredor) return 1;
          return 0;
        },
      },
      {
        title: 'Giro Negocio',
        dataIndex: 'giroNegocio',
        width: 'auto',
        sorter: (a, b) => {
          if (a.giroNegocio < b.giroNegocio) return -1;
          if (a.giroNegocio > b.giroNegocio) return 1;
          return 0;
        },
      },
      {
        title: 'Ocupación',
        dataIndex: 'ocupacion',
        width: 'auto',
        sorter: (a, b) => {
          if (a.ocupacion < b.ocupacion) return -1;
          if (a.ocupacion > b.ocupacion) return 1;
          return 0;
        },
      },
      {
        title: 'Valor Declarado',
        dataIndex: 'valorDeclarado',
        width: 'auto',
        sorter: (a, b) => {
          if (a.valorDeclarado < b.valorDeclarado) return -1;
          if (a.valorDeclarado > b.valorDeclarado) return 1;
          return 0;
        },
      },
      {
        title: 'Riesgo',
        dataIndex: 'riesgo',
        width: 'auto',
        sorter: (a, b) => {
          if (a.riesgo < b.riesgo) return -1;
          if (a.riesgo > b.riesgo) return 1;
          return 0;
        },
      },
      {
        title: 'Contacto',
        dataIndex: 'nomContacto',
        width: 'auto',
        sorter: (a, b) => {
          if (a.nomContacto < b.nomContacto) return -1;
          if (a.nomContacto > b.nomContacto) return 1;
          return 0;
        },
      },
      {
        title: 'Ingeniero QA',
        dataIndex: 'nomIngeniero',
        width: 'auto',
        sorter: (a, b) => {
          if (a.nomIngeniero < b.nomIngeniero) return -1;
          if (a.nomIngeniero > b.nomIngeniero) return 1;
          return 0;
        },
      },
      {
        title: 'Estado',
        dataIndex: 'estado',
        width: 'auto',
        sorter: (a, b) => {
          if (a.estado < b.estado) return -1;
          if (a.estado > b.estado) return 1;
          return 0;
        },
      },
      {
        title: 'Acciones',
        width: 0,
        render: (text, record) => {
          return (
            <div className="icons-acciones">
              {/* TODO: Cambiar IDPESTINSPECCION_EN_PROGRAMACION por IDPESTINSPECCION_INSPECCIONADO */}
              {record.nombreParametroEstado ===
                EstadosInspeccion.IDPESTINSPECCION_INSPECCIONADO && (
                <Popover title="Revisar Informe">
                  <IconWrapper
                    type="snippets"
                    theme="filled"
                    className="snippets"
                    onClick={() => this.handleRevisionCuestionario(record)}
                  />
                </Popover>
              )}
              {(record.nombreParametroEstado ===
                EstadosInspeccion.IDPESTINSPECCION_EN_PROGRAMACION ||
                record.nombreParametroEstado ===
                  EstadosInspeccion.IDPESTINSPECCION_INSPECCIONADO) && (
                <Popover title="Cancelar Inspección">
                  <IconWrapper
                    type="close"
                    theme="outlined"
                    className="close"
                    onClick={() => this.mostrarCancelarInformeInspeccion(record)}
                  />
                </Popover>
              )}
              {record.nombreParametroEstado === EstadosInspeccion.IDPESTINSPECCION_CANCELADO && (
                <div>
                <Popover title="Descargar Informe">
                  <IconWrapper
                    type="file-pdf"
                    theme="outlined"
                    className="file-pdf"
                    onClick={() => this.descargarInformeInspeccion(record)}
                  />
                </Popover>
                <Popover title="Reprogramar Inspección">
                  <IconWrapper
                    type="redo"
                    theme="outlined"
                    className="redo"
                    onClick={() => this.mostrarReprogramarInformeInspeccion(record)}
                  />
                </Popover>
                </div>
              )}
            </div>
          );
        },
      },
    ];
    return (
      <div className="container">
        <PageTitle titulo={messages.bandejarevisioninforme.title} />
        <SearchRevisionInforme
          STARTACTIONSEARCH={STARTACTIONSEARCH}
          motivosinspeccion={motivosinspeccion}
          estadosinspeccion={estadosinspeccion}
          ingenierosqas={ingenierosqas}
          cargandoInformes={cargandoInformes}
        />
        <Table
          title={messages.bandejarevisioninforme.title}
          rowKey="ideinformeinspeccion"
          columns={columns}
          scroll={{ x: '100%' }}
          dataSource={dataSource}
        />
        {modaDetalleInformeVisible && (
          <DetalleInforme
            modaDetalleInformeVisible={modaDetalleInformeVisible}
            handleModal={this.handleModal}
            handleModalOff={this.handleModalOff}
            cambiarVisibilidadModalDetalleInforme={this.cambiarVisibilidadModalDetalleInforme}
            informeInspeccion={informeInspeccion}
            revisioninformes={revisioninformes}
            params={params}
            respuestas={respuestas}
            consultarCategoriasPorInspeccionAction={consultarCategoriasPorInspeccionAction}
            guardarCuestionarioTrabajado={guardarCuestionarioTrabajado}
            categorias={categorias}
            cargandoCategorias={cargandoCategorias}
            STARTACTIONGETMEDIA={STARTACTIONGETMEDIA}
            getScoring={getScoring}
            medias={medias}
            scoring={scoring}
            guardandoCuestionario={guardandoCuestionario}
            getGrupoPregunta={getGrupoPregunta}
            addComentario={addComentario}
            deleteComentario={deleteComentario}
            updateComentario={updateComentario}
            STARTACTIONPOSTMEDIA={STARTACTIONPOSTMEDIA}
            deleteImage={deleteImage}
            cancelarInforme={cancelarInforme}
            rechazarInforme={rechazarInforme}
            finalizarInforme={finalizarInforme}
            modalCancelarInspeccionVisible={modalCancelarInspeccionVisible}
            modalRechazarInspeccionVisible={modalRechazarInspeccionVisible}
            modalFinalizarInspeccionVisible={modalFinalizarInspeccionVisible}
            cambiarVisibilidadModalCancelarInspeccion={
              this.cambiarVisibilidadModalCancelarInspeccion
            }
            cambiarVisibilidadModalRechazarInspeccion={
              this.cambiarVisibilidadModalRechazarInspeccion
            }
            cambiarVisibilidadModalFinalizarInspeccion={
              this.cambiarVisibilidadModalFinalizarInspeccion
            }
            cancelandoInforme={guardandoRevisionInforme}
            guardandoRevisionInforme={guardandoRevisionInforme}
            STARTGARANTIARECINFORME={STARTGARANTIARECINFORME}
            procesarLoteGarantiaRecInformeAction={procesarLoteGarantiaRecInformeAction}
            loteGarantiaRecInforme={loteGarantiaRecInforme}
          />
        )}

        <ModalWrapper
          title={'Cancelar Inspección'}
          visible={modalCancelarInspeccionVisible}
          width={'50%'}
          centered={false}
          onCancel={() => this.cambiarVisibilidadModalCancelarInspeccion()}
          footer={[
            <Button
              className="cancelar"
              loading={guardandoRevisionInforme}
              key="cancelInspection"
              onClick={() => this.cambiarVisibilidadModalCancelarInspeccion()}
            >
              Salir
            </Button>,
            <Button
              className="aceptar"
              key="submit"
              loading={guardandoRevisionInforme}
              type="primary"
              style={{ display: 'inline' }}
              onClick={this.cancelarInformeInspeccion}
            >
              Cancelar
            </Button>,
          ]}
        >
          <span style={{ fontWeight: 'lighter', fontSize: 18 }}>Ingrese Motivo de Cancelación</span>
          <div style={{ marginTop: 10 }}>
            <TextArea value={motivoCancelacion} onChange={this.onChangeMotivo}></TextArea>
          </div>
        </ModalWrapper>

        <ModalWrapper
          title={'Reprogramar Inspección'}
          visible={modalReprogramarInspeccionVisible}
          width={'50%'}
          centered={false}
          onCancel={() => this.cambiarVisibilidadModalReprogramarInspeccion()}
          footer={[
            <Button
              className="cancelar"
              loading={guardandoRevisionInforme}
              key="reprogrammerInspection"
              onClick={() => this.cambiarVisibilidadModalReprogramarInspeccion()}
            >
              Salir
            </Button>,
            <Button
              className="aceptar"
              key="submit"
              loading={guardandoRevisionInforme}
              type="primary"
              style={{ display: 'inline' }}
              onClick={this.reprogramarInformeInspeccion}
            >
              Reprogramar
            </Button>,
          ]}
        >
          <span style={{ fontWeight: 'lighter', fontSize: 18 }}>
            ¿Está seguro de reprogramar Inspección (Crear Solicitud de Inspección) ?
          </span>
        </ModalWrapper>
      </div>
    );
  }

  reprogramarInformeInspeccion = () => {
    const { inspeccionSeleccionada } = this.state;
    const ideInformeInspeccion = inspeccionSeleccionada.ideinformeinspeccion;
    const { reprogramarInforme } = this.props;
    reprogramarInforme({ ideInformeInspeccion });
  };

  cancelarInformeInspeccion = () => {
    const { inspeccionSeleccionada, motivoCancelacion: motivo } = this.state;
    const ideInformeInspeccion = inspeccionSeleccionada.ideinformeinspeccion;
    const { cancelarInforme } = this.props;
    cancelarInforme({ ideInformeInspeccion, motivo });
  };

  onChangeMotivo = e => {
    const motivoCancelacion = e.target.value;
    if (motivoCancelacion.match(/^[ ña-zA-Z0-9-.]{0,400}$/)) {
      this.setState({ motivoCancelacion });
    }
  };
}

const mapPropsState = state => ({
  revisioninformes: state.revisioninformes,
  motivosinspeccion: state.common.motivosinspeccion,
  estadosinspeccion: state.common.estadosinspeccion,
  cargandoInformes: state.revisioninformes.cargandoInformes,
  ingenierosqas: state.common.ingenierosqas,
  respuestas: state.cuestionarioTrabajados.respuestas,
  categorias: state.categorias.items,
  cargandoCategorias: state.categorias.cargando,
  medias: state.medias,
  scoring: state.scoring,
  cuestionarioTrabajados: state.cuestionarioTrabajados,
  guardandoCuestionario: state.cuestionarioTrabajados.guardando,
  guardandoRevisionInforme: state.revisioninformes.guardando,
  loteGarantiaRecInforme: state.garantiaRecInforme.items,
});

const mapPropsDispatch = dispatch => ({
  STARTACTIONSEARCH: data => dispatch(STARTACTIONSEARCH(data)),
  STARTACTIONGET: data => dispatch(STARTACTIONGET(data)),
  ACTIONCHANGEVALUESCUESTIONARIO: data => dispatch(ACTIONCHANGEVALUESCUESTIONARIO(data)),

  consultarCategoriasPorInspeccionAction: payload =>
    dispatch(consultarCategoriasPorInspeccionAction(payload)),
  STARTACTIONGETMEDIA: data => dispatch(STARTACTIONGETMEDIA(data)),
  getScoring: data => dispatch(getScoring(data)),
  cleanScoring: () => dispatch(cleanScoring()),
  getGrupoPregunta: payload => dispatch(getGrupoPregunta(payload)),
  addComentario: payload => dispatch(addComentario(payload)),
  deleteComentario: id => dispatch(deleteComentario(id)),
  updateComentario: payload => dispatch(updateComentario(payload)),
  STARTACTIONPOSTMEDIA: payload => dispatch(STARTACTIONPOSTMEDIA(payload)),
  deleteImage: id => dispatch(deleteImage(id)),
  guardarCuestionarioTrabajado: payload => dispatch(guardarCuestionarioTrabajadoAction(payload)),
  cancelarInforme: payload => dispatch(cancelarInformeAction(payload)),
  reprogramarInforme: payload => dispatch(reprogramarInformeAction(payload)),
  rechazarInforme: payload => dispatch(rechazarInformeAction(payload)),
  finalizarInforme: payload => dispatch(finalizarInformeAction(payload)),

  STARTGARANTIARECINFORME: async payload =>
    await dispatch(listarGarantiasRecInformeAction(payload)),
  procesarLoteGarantiaRecInformeAction: payload =>
    dispatch(procesarLoteGarantiaRecInformeAction(payload)),
});

export default connect(
  mapPropsState,
  mapPropsDispatch,
)(RevisionInforme);
