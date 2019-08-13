import CategoriaService from '../../services/categoria.service';
import Reactotron from 'reactotron-react-js';

const consultarCategoriasPorInspeccionPendienteAction = () => ({
  type: 'CONSULTAR_CATEGORIAS_POR_INSPECCION_PENDIENTE',
  error: null,
});

const consultarCategoriasPorInspeccionErrorAction = payload => ({
  type: 'CONSULTAR_CATEGORIAS_POR_INSPECCION_ERROR',
  error: payload.error,
});

const consultarCategoriasPorInspeccionSatisfactorioAction = payload => ({
  type: 'CONSULTAR_CATEGORIAS_POR_INSPECCION_SATISFACTORIO',
  items: payload.items,
});

const descargarInspeccion = () => ({
  type: 'ESCARGAR_INSPECCION',
  error: null,
});

export const consultarCategoriasPorInspeccionAction = payload => {
  return async dispatch => {
    dispatch(consultarCategoriasPorInspeccionPendienteAction());
    const items = await CategoriaService.all(payload);
    try {
      dispatch(consultarCategoriasPorInspeccionSatisfactorioAction({ items }));
    } catch (error) {
      dispatch(consultarCategoriasPorInspeccionErrorAction({ error: error.message }));
    }
  };
};

export const descargarInspeccionAction = payload => {                   
  return async dispatch => {
    dispatch(descargarInspeccion());
    const items = await CategoriaService.descargarInspeccion(payload);
    try {
      dispatch(descargarInspeccion({ items }));
    } catch (error) {
      dispatch(descargarInspeccion({ error: error.message }));
    }
  };
};