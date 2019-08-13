import CuestionarioService from '../../services/cuestionario.service';

const consultarCuestionariosPorParametrosPendienteAction = () => ({
  type: 'CONSULTAR_CUESTIONARIOS_POR_PARAMETROS_PENDIENTE',
  error: null,
});

const consultarCuestionariosPorParametrosErrorAction = payload => ({
  type: 'CONSULTAR_CUESTIONARIOS_POR_PARAMETROS_ERROR',
  error: payload.error,
});

const consultarCuestionariosPorParametrosSatisfactorioAction = payload => ({
  type: 'CONSULTAR_CUESTIONARIOS_POR_PARAMETROS_SATISFACTORIO',
  items: payload.items,
});

// Migrar a cuestionarios trabajados
export const consultarCuestionariosPorParametrosAction = payload => {
  return async dispatch => {
    dispatch(consultarCuestionariosPorParametrosPendienteAction());
    const items = await CuestionarioService.all(payload);
    try {
      dispatch(consultarCuestionariosPorParametrosSatisfactorioAction({ items }));
    } catch (error) {
      dispatch(consultarCuestionariosPorParametrosErrorAction({ error: error.message }));
    }
  };
};

const guardarCuestionarioPendienteAction = () => ({
  type: 'GUARDAR_CUESTIONARIO_PENDIENTE',
  error: null,
});

const guardarCuestionarioErrorAction = payload => ({
  type: 'GUARDAR_CUESTIONARIO_ERROR',
  error: payload.error,
});

const guardarCuestionarioSatisfactorioAction = payload => ({
  type: 'GUARDAR_CUESTIONARIO_SATISFACTORIO',
  items: payload.items,
});

export const guardarCuestionarioAction = payload => {
  return async dispatch => {
    dispatch(guardarCuestionarioPendienteAction());
    await CuestionarioService.save(payload);
    try {
      dispatch(guardarCuestionarioSatisfactorioAction({ inspectionId: payload.inspectionId }));
    } catch (error) {
      dispatch(guardarCuestionarioErrorAction({ error: error.message }));
    }
  };
};
