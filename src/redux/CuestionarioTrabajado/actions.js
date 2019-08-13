import CuestionarioService from '../../services/cuestionario.service';
import Reactotron from 'reactotron-react-js';

export const guardarRespuestaAction = respuesta => {
  return async dispatch => {
    dispatch({
      type: 'GUARDAR_RESPUESTA',
      respuesta,
    });
  };
};

export const consultarRespuestasPorInspeccionAction = inspectionId => {
  return async dispatch => {
    dispatch({
      type: 'RESPUESTAS_SELECCIONADAS',
      inspectionId,
    });
  };
};

const guardarCuestionarioTrabajadoPendienteAction = () => ({
  type: 'GUARDAR_CUESTIONARIO_TRABAJADO_PENDIENTE',
  error: null,
});

const guardarCuestionarioTrabajadoErrorAction = payload => ({
  type: 'GUARDAR_CUESTIONARIO_TRABAJADO_ERROR',
  error: payload.error,
});

const guardarCuestionarioTrabajadoSatisfactorioAction = payload => ({
  type: 'GUARDAR_CUESTIONARIO_TRABAJADO_SATISFACTORIO',
  inspectionId: payload.inspectionId,
});

export const guardarCuestionarioTrabajadoAction = payload => {
  return async dispatch => {
    dispatch(guardarCuestionarioTrabajadoPendienteAction());
    await CuestionarioService.save(payload);
    try {
      dispatch(
        guardarCuestionarioTrabajadoSatisfactorioAction({
          inspectionId: payload.inspectionId,
        }),
      );
    } catch (error) {
      dispatch(guardarCuestionarioTrabajadoErrorAction({ error: error.message }));
    }
  };
};
