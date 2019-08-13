import React from 'react';
import { TabsForm } from '../../../../../components/Util/util.style';
import CategoriasInspeccion from '../CategoriasInspeccion/CategoriasInspeccion';
import Cuestionario from '../Cuestionario/Cuestionario';
import MediaForm from '../Media/ComentarioForm';
import Media from '../Media/Media';
import Scoring from '../Scoring/Scoring';
import { Button } from 'antd';
import { ModalWrapper } from '../../../../../components/Modal/Modal.style';
import ImageView from '../../../../../components/Image/ImageView';

import Reactotron from 'reactotron-react-js';
import { successloading, error } from '../../../../../components/Messages/Messages';

import GarantiaRecomendacion from '../GarantiaRecomendacion/GarantiaRecomendacion';
import SeguimientoGarRec from '../GarantiaRecomendacion/SeguimientoGarRec';
import GarantiaRecInforme from '../GarantiaRecomendacion/GarantiaRecInforme';

const TabPane = TabsForm.TabPane;

class DetalleInforme extends React.Component {
  constructor(props) {
    super(props);
    const {
      modalCancelarInspeccionVisible,
      modalRechazarInspeccionVisible,
      modalFinalizarInspeccionVisible,
    } = props;
    this.state = {
      ideinformeinspeccion: '',
      idecuestionario: '',
      idx: 0,
      tituloModal: '',
      preguntaQ: {},
      idxPreguntasQ: undefined,
      ERROR: [],
      modalCuestionarioVisible: false,
      modalSeguimientoGarRecVisible: false,
      modalGarantiaRecomendacionVisible: false,
      modalCancelarInspeccionVisible,
      modalRechazarInspeccionVisible,
      modalFinalizarInspeccionVisible,
      categoriaSeleccionada: null,
      modalMediaVisible: false,
      previewVisible: false,
      previewImage: '',
      ideriesgo: 0,
      dataEditComentario: undefined,
    };
    this.handeEditComentario = this.handeEditComentario.bind(this);

    this.refGarantiaRecInforme = React.createRef();
  }

  openCategoria = (idx, cuestionariocnf) => {
    this.setState({
      idx: idx,
      tituloModal: cuestionariocnf.dsccuestionariocnf,
    });
    this.props.handleModal();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let modalRechazarInspeccionVisible = null;
    let modalFinalizarInspeccionVisible = null;
    if (nextProps.modalRechazarInspeccionVisible !== prevState.modalRechazarInspeccionVisible) {
      modalRechazarInspeccionVisible = {
        modalRechazarInspeccionVisible: nextProps.modalRechazarInspeccionVisible,
      };
    }
    if (nextProps.modalFinalizarInspeccionVisible !== prevState.modalFinalizarInspeccionVisible) {
      modalFinalizarInspeccionVisible = {
        modalFinalizarInspeccionVisible: nextProps.modalFinalizarInspeccionVisible,
      };
    }
    if (!modalRechazarInspeccionVisible && !modalFinalizarInspeccionVisible) {
      return null;
    }
    return { ...modalRechazarInspeccionVisible, ...modalFinalizarInspeccionVisible };
  }

  escuchaSeleccionCategoria = categoria => {
    this.setState({ modalCuestionarioVisible: true, categoriaSeleccionada: categoria });
  };

  escuchaSeleccionMedia = categoria => {
    this.setState({
      modalMediaVisible: true,
      categoriaSeleccionada: categoria,
      ideriesgo: this.props.informeInspeccion.ideriesgo,
    });
  };
  handeEditComentario = comentario => {
    this.setState({
      modalMediaVisible: true,
      categoriaSeleccionada: comentario.idegrupogarantia,
      ideriesgo: this.props.informeInspeccion.ideriesgo,
      dataEditComentario: comentario,
    });
  };
  handleView = e => {
    this.setState({ previewVisible: true, previewImage: e });
  };
  handelCloseView = () => {
    this.setState({ previewVisible: false });
  };

  escuchaSeleccionSeguimiento = () => {
    this.setState({ modalSeguimientoGarRecVisible: true });
  };
  escuchaSeleccionGarantiaRecomendacion = categoria => {
    this.setState({ modalGarantiaRecomendacionVisible: true });
  };

  dev_garantia_recomendacion;
  cambiarVisibilidadModalCerrarInspeccion = () => {
    this.setState({ modalFinalizarInspeccionVisible: true });
  };
  componentDidMount() {
    this.props.STARTGARANTIARECINFORME({
      ideinformeinspeccion: this.props.informeInspeccion.ideinformeinspeccion,
    });
  }
  render() {
    const {
      cambiarVisibilidadModalDetalleInforme,
      cambiarVisibilidadModalCancelarInspeccion,
      cambiarVisibilidadModalRechazarInspeccion,
      cambiarVisibilidadModalFinalizarInspeccion,
      modaDetalleInformeVisible,
      informeInspeccion,
      categorias,
      cargandoCategorias,
      medias,
      scoring,
      STARTACTIONGETMEDIA,
      getScoring,
      guardandoCuestionario,
      getGrupoPregunta,
      addComentario,
      deleteComentario,
      updateComentario,
      STARTACTIONPOSTMEDIA,
      deleteImage,
      cancelandoInforme,
      guardandoRevisionInforme,
      procesarLoteGarantiaRecInformeAction,
      loteGarantiaRecInforme,
    } = this.props;

    const {
      modalCuestionarioVisible,
      categoriaSeleccionada,
      modalMediaVisible,
      ideriesgo,
      dataEditComentario,
      previewVisible,
      previewImage,
      modalSeguimientoGarRecVisible,
      modalGarantiaRecomendacionVisible,
      dev_garantia_recomendacion,
      modalCancelarInspeccionVisible,
      modalRechazarInspeccionVisible,
      modalFinalizarInspeccionVisible,
    } = this.state;

    const detalleInformeComponent = () => (
      <div>
        <TabsForm>
          <TabPane key="1" tab="Categorías">
            <CategoriasInspeccion
              escuchaSeleccionCategoria={this.escuchaSeleccionCategoria}
              informeInspeccion={informeInspeccion}
            />
          </TabPane>
          <TabPane tab="Media" key="2">
            <Media
              informeInspeccion={informeInspeccion}
              categorias={categorias}
              cargandoCategorias={cargandoCategorias}
              STARTACTIONGETMEDIA={STARTACTIONGETMEDIA}
              medias={medias}
              escuchaSeleccionMedia={this.escuchaSeleccionMedia}
              handeEditComentario={this.handeEditComentario}
              deleteComentario={deleteComentario}
              STARTACTIONPOSTMEDIA={STARTACTIONPOSTMEDIA}
              deleteImage={deleteImage}
              handleView={this.handleView}
            />
          </TabPane>
          <TabPane tab="Garantías y recomendaciones" key="3">
            <GarantiaRecomendacion
              escuchaSeleccionSeguimiento={this.escuchaSeleccionSeguimiento}
              escuchaSeleccionGarantiaRecomendacion={this.escuchaSeleccionGarantiaRecomendacion}
            />
          </TabPane>
          <TabPane tab="Scoring" key="4">
            <Scoring
              getScoring={getScoring}
              scoring={scoring}
              informeInspeccion={informeInspeccion}
            />
          </TabPane>
        </TabsForm>
      </div>
    );

    const guardarCuestionarioTrabajado = async () => {
      debugger;
      const inspectionId = informeInspeccion.ideinformeinspeccion;
      const { respuestas: answers, guardarCuestionarioTrabajado } = this.props;
      await guardarCuestionarioTrabajado({ inspectionId, answers });
    };

    const cancelarReprogramandoInformeInspeccion = () => {
      // this.setState({ modalCancelarInspeccionVisible: false });
      // cambiarVisibilidadModalDetalleInforme();
      const ideInformeInspeccion = informeInspeccion.ideinformeinspeccion;
      const motivo = 'cancelar y reprogramar';
      const reprogramar = true;
      const { cancelarInforme } = this.props;
      cancelarInforme({ ideInformeInspeccion, motivo, reprogramar });
    };

    const cancelarInformeInspeccion = () => {
      const ideInformeInspeccion = informeInspeccion.ideinformeinspeccion;
      const motivo = 'ejemplo';
      const reprogramar = false;
      const { cancelarInforme } = this.props;
      cancelarInforme({ ideInformeInspeccion, motivo, reprogramar });
    };

    const rechazarInformeInspeccion = async () => {
      const ideInformeInspeccion = informeInspeccion.ideinformeinspeccion;
      const { rechazarInforme } = this.props;

      if (!existenRespuestasNoProcesadas()) {
        await guardarCuestionarioTrabajado();
      }

      rechazarInforme({ ideInformeInspeccion });
    };

    const finalizarInformeInspeccion = async () => {
      const ideInformeInspeccion = informeInspeccion.ideinformeinspeccion;
      const { finalizarInforme } = this.props;

      if (!existenRespuestasNoProcesadas()) {
        await guardarCuestionarioTrabajado();
      }

      finalizarInforme({ ideInformeInspeccion });
    };

    const existenRespuestasNoProcesadas = () => {
      const ideInformeInspeccion = informeInspeccion.ideinformeinspeccion;
      const { respuestas } = this.props;
      return (respuestas || []).some(respuesta => respuesta.inspectionId === ideInformeInspeccion);
    };

    return (
      <div>
        <ModalWrapper
          title={'Revisión de Cuestionario'}
          visible={modaDetalleInformeVisible}
          width={'90%'}
          centered={false}
          onCancel={cambiarVisibilidadModalDetalleInforme}
          footer={[
            <Button
              className="aceptar"
              key="saveWarranty"
              type="primary"
              onClick={() => {
                procesarLoteGarantiaRecInformeAction(loteGarantiaRecInforme);
                successloading('Exito', 'Se grabo correctamente.');
                cambiarVisibilidadModalDetalleInforme();
              }}
            >
              Grabar Garantias y Recomendaciones
            </Button>,
            <Button
              className="cancelar"
              key="exitRevision"
              onClick={cambiarVisibilidadModalDetalleInforme}
            >
              Salir
            </Button>,
            <Button
              className="aceptar"
              key="rechazar"
              type="primary"
              onClick={() => cambiarVisibilidadModalRechazarInspeccion()}
            >
              Rechazar Inspección
            </Button>,
            <Button
              className="aceptar"
              key="finishInspection"
              type="primary"
              onClick={() => cambiarVisibilidadModalFinalizarInspeccion()}
            >
              Finalizar Inspección
            </Button>,
          ]}
        >
          {detalleInformeComponent()}
        </ModalWrapper>
        <ModalWrapper
          title={'Revisión de Cuestionario'}
          visible={modalCuestionarioVisible}
          width={'90%'}
          centered={false}
          onCancel={() => this.setState({ modalCuestionarioVisible: false })}
          footer={[
            <Button
              className="cancelar"
              loading={guardandoCuestionario}
              key="exit"
              onClick={() => this.setState({ modalCuestionarioVisible: false })}
            >
              Salir
            </Button>,
            <Button
              className="aceptar"
              key="finalizar"
              loading={guardandoCuestionario}
              type="primary"
              style={{ display: 'inline' }}
              onClick={guardarCuestionarioTrabajado}
            >
              Guardar
            </Button>,
          ]}
        >
          <Cuestionario informeInspeccion={informeInspeccion} categoria={categoriaSeleccionada} />
        </ModalWrapper>
        {modalMediaVisible ? (
          <MediaForm
            modal={modalMediaVisible}
            handleModalOff={() =>
              this.setState({ modalMediaVisible: false, dataEditComentario: undefined })
            }
            categoria={categoriaSeleccionada}
            ideriesgo={ideriesgo}
            getGrupoPregunta={getGrupoPregunta}
            medias={medias}
            addComentario={addComentario}
            dataEdit={dataEditComentario}
            updateComentario={updateComentario}
          />
        ) : (
          ''
        )}
        <ImageView
          previewVisible={previewVisible}
          footer={null}
          handelCloseView={this.handelCloseView}
          children={<img alt="example" style={{ width: '100%' }} src={previewImage} />}
        />
        <ModalWrapper
          title={'Seguimiento'}
          visible={modalSeguimientoGarRecVisible}
          width={'90%'}
          centered={false}
          onCancel={() => this.setState({ modalSeguimientoGarRecVisible: false })}
          footer={[
            <Button
              className="cancelar"
              loading={guardandoCuestionario}
              key="exitSeguimiento"
              onClick={() => this.setState({ modalSeguimientoGarRecVisible: false })}
            >
              Salir
            </Button>,
          ]}
        >
          <SeguimientoGarRec
            modalSeguimientoGarRecVisible={modalSeguimientoGarRecVisible}
            informeInspeccion={informeInspeccion}
          />
        </ModalWrapper>
        <ModalWrapper
          title={'Garantías y Recomendaciones'}
          visible={modalGarantiaRecomendacionVisible}
          width={'90%'}
          centered={false}
          onCancel={() => this.setState({ modalGarantiaRecomendacionVisible: false })}
          footer={[
            <Button
              className="cancelar"
              loading={guardandoCuestionario}
              key="exitGarantiasReco"
              onClick={() => this.setState({ modalGarantiaRecomendacionVisible: false })}
            >
              Salir
            </Button>,
            <Button
              className="aceptar"
              loading={guardandoCuestionario}
              key="deleteGarantiasReco"
              onClick={() => this.refGarantiaRecInforme.current.handleEditGarantia('eliminar')}
            >
              Eliminar
            </Button>,
            <Button
              className="aceptar"
              loading={guardandoCuestionario}
              key="editGarantiasReco"
              onClick={() => this.refGarantiaRecInforme.current.handleEditGarantia('editar')}
            >
              Editar
            </Button>,
            <Button
              className="aceptar"
              loading={guardandoCuestionario}
              key="addGarantiasReco"
              onClick={() => this.refGarantiaRecInforme.current.handleEditGarantia('agregar')}
            >
              Agregar
            </Button>,
          ]}
        >
          <GarantiaRecInforme
            ref={this.refGarantiaRecInforme}
            modalGarantiaRecomendacionVisible={modalGarantiaRecomendacionVisible}
            informeInspeccion={informeInspeccion}
          />
        </ModalWrapper>
        <ModalWrapper
          title={'Cancelar Inspección'}
          visible={modalCancelarInspeccionVisible}
          width={'50%'}
          centered={false}
          onCancel={cambiarVisibilidadModalCancelarInspeccion}
          footer={[
            <Button
              className="cancelar"
              loading={cancelandoInforme}
              key="exitCancelInspection"
              onClick={cambiarVisibilidadModalCancelarInspeccion}
            >
              Salir
            </Button>,
            <Button
              className="aceptar"
              key="submit"
              loading={cancelandoInforme}
              type="primary"
              style={{ display: 'inline' }}
              onClick={cancelarInformeInspeccion}
            >
              Cancelar
            </Button>,
            <Button
              className="aceptar"
              key="submit"
              loading={cancelandoInforme}
              type="primary"
              style={{ display: 'inline' }}
              onClick={cancelarReprogramandoInformeInspeccion}
            >
              Cancelar y Reprogramar
            </Button>,
          ]}
        >
          <span style={{ fontWeight: 'lighter', fontSize: 18 }}>
            ¿Está seguro de cancelar Inspección?
          </span>
        </ModalWrapper>

        <ModalWrapper
          title={'Rechazar Inspección'}
          visible={modalRechazarInspeccionVisible}
          width={'50%'}
          centered={false}
          onCancel={() => cambiarVisibilidadModalRechazarInspeccion()}
          footer={[
            <Button
              className="cancelar"
              loading={guardandoRevisionInforme}
              key="rejectedInspection"
              onClick={() => cambiarVisibilidadModalRechazarInspeccion()}
            >
              Salir
            </Button>,
            <Button
              className="aceptar"
              key="submit"
              loading={guardandoRevisionInforme}
              type="primary"
              style={{ display: 'inline' }}
              onClick={rechazarInformeInspeccion}
            >
              Rechazar
            </Button>,
          ]}
        >
          <span style={{ fontWeight: 'lighter', fontSize: 18 }}>
            ¿Está seguro de rechazar Inspección?
          </span>
        </ModalWrapper>

        <ModalWrapper
          title={'Cerrar Inspección'}
          visible={modalFinalizarInspeccionVisible}
          width={'50%'}
          centered={false}
          onCancel={() => cambiarVisibilidadModalFinalizarInspeccion()}
          footer={[
            <Button
              className="cancelar"
              loading={guardandoRevisionInforme}
              key="exitCerrarInspeccion"
              onClick={() => cambiarVisibilidadModalFinalizarInspeccion()}
            >
              Salir
            </Button>,
            <Button
              className="aceptar"
              key="submit"
              loading={guardandoRevisionInforme}
              type="primary"
              style={{ display: 'inline' }}
              onClick={finalizarInformeInspeccion}
            >
              Cerrar
            </Button>,
          ]}
        >
          <span style={{ fontWeight: 'lighter', fontSize: 18 }}>
            ¿Está seguro de Cerrar Inspección?
          </span>
        </ModalWrapper>
      </div>
    );
  }
}

export default DetalleInforme;
