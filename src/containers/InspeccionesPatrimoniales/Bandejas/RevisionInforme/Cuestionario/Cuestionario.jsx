import React from 'react';
import Grupos from '../Grupos/Grupos';
import { Card, Row, Col, Skeleton } from 'antd';
import { consultarCuestionariosPorParametrosAction } from '../../../../../redux/Cuestionario/actions';
import {
  guardarRespuestaAction,
  consultarRespuestasPorInspeccionAction,
} from '../../../../../redux/CuestionarioTrabajado/actions';
import { connect } from 'react-redux';

const { Meta } = Card;

class Cuestionario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cargandoCategorias: false,
      ideCategoria: null,
    };
  }

  componentDidMount() {
    const { consultarCuestionariosPorParametrosAction, informeInspeccion, categoria } = this.props;
    consultarCuestionariosPorParametrosAction({
      idecategoria: categoria.ideCategoria,
      ideinformeinspeccion: informeInspeccion.ideinformeinspeccion,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.categoria.ideCategoria !== prevState.ideCategoria) {
      nextProps.consultarCuestionariosPorParametrosAction({
        idecategoria: nextProps.categoria.ideCategoria,
        ideinformeinspeccion: nextProps.informeInspeccion.ideinformeinspeccion,
      });
      return { ideCategoria: nextProps.categoria.ideCategoria };
    } else return null;
  }

  // RN038
  updateQuestion = response => {
    const { guardarRespuestaAction, informeInspeccion } = this.props;
    const respuesta = { inspectionId: informeInspeccion.ideinformeinspeccion, ...response };
    guardarRespuestaAction(respuesta);
  };

  render() {
    const { gruposDeCuestionarios: groups } = this.props;
    if (!Array.isArray(groups) || groups.length === 0) {
      return (
        <div>
          {[{}, {}].map(() => {
            return (
              <Row gutter={16} key={1}>
                {[{}, {}].map(() => {
                  return (
                    <Col style={{ marginBottom: 5 }} key={2} span={12}>
                      <Card key={1} style={{}} loading={true}>
                        <Skeleton loading={true} active paragraph title>
                          <Meta title={''} description={''} />
                        </Skeleton>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </div>
      );
    }
    return this.renderLista(groups);
  }

  renderLista(groups) {
    const { informeInspeccion, respuestas } = this.props;
    return (
      <Grupos
        groups={groups}
        informeInspeccion={informeInspeccion}
        updateQuestion={this.updateQuestion}
        answers={[
          ...respuestas.filter(
            respuesta => respuesta.inspectionId === informeInspeccion.ideinformeinspeccion,
          ),
        ]}
      />
    );
  }
}

const mapPropsState = state => ({
  gruposDeCuestionarios: state.cuestionarios.items,
  cargandoCuestionarios: state.cuestionarios.cargando,
  respuestas: state.cuestionarioTrabajados.respuestas,
});

const mapPropsDispatch = dispatch => ({
  consultarCuestionariosPorParametrosAction: payload =>
    dispatch(consultarCuestionariosPorParametrosAction(payload)),
  consultarRespuestasPorInspeccionAction: inspectionId =>
    dispatch(consultarRespuestasPorInspeccionAction(inspectionId)),
  guardarRespuestaAction: respuesta => {
    dispatch(guardarRespuestaAction(respuesta));
  },
});

export default connect(
  mapPropsState,
  mapPropsDispatch,
)(Cuestionario);
