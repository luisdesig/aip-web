import RevisionInforme from '../../services/revisioninforme.service';
import Reactotron from 'reactotron-react-js';

const ACTIONPENDIENTESEARCHREVISIONINFORME = cargandoInformes => ({
  type: 'PENDIENTESEARCHREVISIONINFORME',
  cargandoInformes,
});

const ACTIONSEARCHREVISIONINFORME = (data, cargandoInformes) => ({
  type: 'SEARCHREVISIONINFORME',
  data,
  cargandoInformes,
});

const ACTIONGETREVISIONCUESTIONARIO = data => ({
  type: 'GETREVISIONCUESTIONARIO',
  data: data,
});

export const ACTIONCHANGEVALUESCUESTIONARIO = data => ({
  type: 'CHANGEVALUESCUESTIONARIO',
  data: data,
});

export const STARTACTIONSEARCH = data => {
  return dispatch => {
    RevisionInforme.consultar(data, 1).then(res => {
      try {
        dispatch(ACTIONPENDIENTESEARCHREVISIONINFORME(true));
        if (res.data.response.status.success === false) {
          dispatch(ACTIONSEARCHREVISIONINFORME([], false));
        } else {
          dispatch(ACTIONSEARCHREVISIONINFORME(res.data.response.payload, false));
        }
      } catch (e) {}
    });
  };
};

export const STARTACTIONGET = data => {
  //return (ACTIONGETREVISIONCUESTIONARIO({}));
  return dispatch => {
    RevisionInforme(data, 2).then(res => {
      try {
        if (res.data.response.status.success === false) {
          dispatch(ACTIONGETREVISIONCUESTIONARIO([]));
        } else {
          dispatch(ACTIONGETREVISIONCUESTIONARIO(res.data.response.payload));
        }
      } catch (e) {}
    });
  };
};

const cancelarInformePendienteAction = () => ({
  type: 'CANCELAR_INFORME_PENDIENTE',
  error: null,
});

const cancelarInformeErrorAction = payload => ({
  type: 'CANCELAR_INFORME_ERROR',
  error: payload.error,
});

const cancelarInformeSatisfactorioAction = () => ({
  type: 'CANCELAR_INFORME_SATISFACTORIO',
});

export const cancelarInformeAction = payload => {
  return async dispatch => {
    dispatch(cancelarInformePendienteAction());
    try {
      const resp = await RevisionInforme.cancelar(payload);
      if (!resp.data.response.status.success) {
        throw { message: resp.data.response.status.error.message };
      }
      dispatch(cancelarInformeSatisfactorioAction());
    } catch (error) {
      Reactotron.log('error', error);
      dispatch(cancelarInformeErrorAction({ error: error.message }));
    }
  };
};

const reprogramarInformePendienteAction = () => ({
  type: 'REPROGRAMAR_INFORME_PENDIENTE',
  error: null,
});

const reprogramarInformeErrorAction = payload => ({
  type: 'REPROGRAMAR_INFORME_ERROR',
  error: payload.error,
});

const reprogramarInformeSatisfactorioAction = () => ({
  type: 'REPROGRAMAR_INFORME_SATISFACTORIO',
});

export const reprogramarInformeAction = payload => {
  return async dispatch => {
    dispatch(reprogramarInformePendienteAction());
    try {
      const resp = await RevisionInforme.reprogramar(payload);
      if (!resp.data.response.status.success) {
        throw { message: resp.data.response.status.error.message };
      }
      dispatch(reprogramarInformeSatisfactorioAction());
    } catch (error) {
      Reactotron.log('error', error);
      dispatch(reprogramarInformeErrorAction({ error: error.message }));
    }
  };
};

const rechazarInformePendienteAction = () => ({
  type: 'RECHAZAR_INFORME_PENDIENTE',
  error: null,
});

const rechazarInformeErrorAction = payload => ({
  type: 'RECHAZAR_INFORME_ERROR',
  error: payload.error,
});

const rechazarInformeSatisfactorioAction = () => ({
  type: 'RECHAZAR_INFORME_SATISFACTORIO',
});

export const rechazarInformeAction = payload => {
  Reactotron.log('action.rechazarInformeAction');
  return async dispatch => {
    dispatch(rechazarInformePendienteAction());
    try {
      const resp = await RevisionInforme.rechazar(payload);
      if (!resp.data.response.status.success) {
        throw { message: resp.data.response.status.error.message };
      }
      dispatch(rechazarInformeSatisfactorioAction());
    } catch (error) {
      Reactotron.log('error', error);
      dispatch(rechazarInformeErrorAction({ error: error.message }));
    }
  };
};

const finalizarInformePendienteAction = () => ({
  type: 'FINALIZAR_INFORME_PENDIENTE',
  error: null,
});

const finalizarInformeErrorAction = payload => ({
  type: 'FINALIZAR_INFORME_ERROR',
  error: payload.error,
});

const finalizarInformeSatisfactorioAction = () => ({
  type: 'FINALIZAR_INFORME_SATISFACTORIO',
});

export const finalizarInformeAction = payload => {
  return async dispatch => {
    dispatch(finalizarInformePendienteAction());
    try {
      const resp = await RevisionInforme.finalizar(payload);
      if (!resp.data.response.status.success) {
        throw { message: resp.data.response.status.error.message };
      }
      dispatch(finalizarInformeSatisfactorioAction());
    } catch (error) {
      Reactotron.log('error', error);
      dispatch(finalizarInformeErrorAction({ error: error.message }));
    }
  };
};
