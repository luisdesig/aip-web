//import CuestionarioService from '../../services/cuestionario.service';
import GarantiaRecInformeService from '../../services/garantiaRecInforme.service';

const listarGarantiasRecInformePendienteAction = () => ({
  type: 'LISTAR_GARANTIAREC_INFORME_PENDIENTE',
  error: null,
});

const listarGarantiasRecInformeErrorAction = payload => ({
  type: 'LISTAR_GARANTIAREC_INFORME_ERROR',
  error: payload.error,
});

const listarGarantiasRecInformeSatisfactorioAction = payload => ({
  type: 'LISTAR_GARANTIAREC_INFORME_SATISFACTORIO',
  items: payload.items,
});

// listar garantias informe
export const listarGarantiasRecInformeAction = payload => {
  return async dispatch => {
      console.log("entro LISTARRRRRR");
      dispatch(listarGarantiasRecInformePendienteAction());
    try {
      const items = await GarantiaRecInformeService.all(payload);    
      dispatch(listarGarantiasRecInformeSatisfactorioAction({ items }));
    } catch (error) {
      dispatch(listarGarantiasRecInformeErrorAction({ error: error.message }));
    }
  };
};

const crearGarantiaRecInformePendienteAction = () => ({
  type: 'CREAR_GARANTIAREC_INFORME_PENDIENTE',
  error: null
});

const crearGarantiaRecInformeErrorAction = payload => ({
  type: 'CREAR_GARANTIAREC_INFORME_ERROR',
  error: payload.error
});

const crearGarantiaRecInformeSatisfactorioAction = (record) => ({
  type: 'CREAR_GARANTIAREC_INFORME_SATISFACTORIO',
  error: null,
  record: record
});

export const crearGarantiaRecInformeAction = payload => {
  return async dispatch => {
    dispatch(crearGarantiaRecInformePendienteAction());
    try {
      //const respuesta=await GarantiaRecInformeService.crear(payload);    
      dispatch(crearGarantiaRecInformeSatisfactorioAction(payload));
    } catch (error) {
      dispatch(crearGarantiaRecInformeErrorAction({ error: error.message }));
    }
  };
};

const actualizarGarantiaRecInformePendienteAction = () => ({
  type: 'ACTUALIZAR_GARANTIAREC_INFORME_PENDIENTE',
  error: null
});

const actualizarGarantiaRecInformeErrorAction = payload => ({
  type: 'ACTUALIZAR_GARANTIAREC_INFORME_ERROR',
  error: payload.error
});

const actualizarGarantiaRecInformeSatisfactorioAction = (record) => ({
  type: 'ACTUALIZAR_GARANTIAREC_INFORME_SATISFACTORIO',
  error: null,
  record: record
});

export const actualizarGarantiaRecInformeAction = payload => {
  return async dispatch => {
    dispatch(actualizarGarantiaRecInformePendienteAction());
    //await GarantiaRecInformeService.actualizar(payload);
    try {
      dispatch(actualizarGarantiaRecInformeSatisfactorioAction(payload));
    } catch (error) {
      dispatch(actualizarGarantiaRecInformeErrorAction({ error: error.message }));
    }
  };
};

const eliminarGarantiaRecInformePendienteAction = () => ({
  type: 'ELIMINAR_GARANTIAREC_INFORME_PENDIENTE',
  error: null
});

const eliminarGarantiaRecInformeErrorAction = payload => ({
  type: 'ELIMINAR_GARANTIAREC_INFORME_ERROR',
  error: payload.error
});

const eliminarGarantiaRecInformeSatisfactorioAction = (record) => ({
  type: 'ELIMINAR_GARANTIAREC_INFORME_SATISFACTORIO',
  error: null,
  record: record
});

export const eliminarGarantiaRecInformeAction = payload => {
  return async dispatch => {
    dispatch(eliminarGarantiaRecInformePendienteAction());
    //await GarantiaRecInformeService.eliminar(payload);
    try {
      dispatch(eliminarGarantiaRecInformeSatisfactorioAction(payload));
    } catch (error) {
      dispatch(eliminarGarantiaRecInformeErrorAction({ error: error.message }));
    }
  };
};

const procesarLoteGarantiaRecInformePendienteAction = () => ({
  type: 'PROCLOTE_GARANTIAREC_INFORME_PENDIENTE',
  error: null
});

const procesarLoteGarantiaRecInformeErrorAction = payload => ({
  type: 'PROCLOTE_GARANTIAREC_INFORME_ERROR',
  error: payload.error
});

const procesarLoteGarantiaRecInformeSatisfactorioAction = () => ({
  type: 'PROCLOTE_GARANTIAREC_INFORME_SATISFACTORIO',
  error: null
});

export const procesarLoteGarantiaRecInformeAction = payload => {
  return async dispatch => {
    dispatch(procesarLoteGarantiaRecInformePendienteAction());
    await GarantiaRecInformeService.procesarLote(payload);
    try {
      dispatch(procesarLoteGarantiaRecInformeSatisfactorioAction());
    } catch (error) {
      dispatch(procesarLoteGarantiaRecInformeErrorAction({ error: error.message }));
    }
  };
};

export const checkGarantiaRecInformeAction = (record) => ({
  type: 'CHECK_GARANTIAREC_INFORME',
  record: record
});

export const unCheckGarantiaRecInformeAction = () => ({
  type: 'UNCHECK_GARANTIAREC_INFORME'
});
