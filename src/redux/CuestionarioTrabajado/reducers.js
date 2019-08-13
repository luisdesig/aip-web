import Reactotron from 'reactotron-react-js';

const initState = {
  respuestas: [],
  respuestasSeleccionadas: [],
  guardando: false,
  error: null,
};

const reducer = (state = initState, action) => {
  const { type, respuesta, inspectionId, error } = action;

  switch (type) {
    case 'RESPUESTAS_SELECCIONADAS': {
      return {
        ...state,
        respuestasSeleccionadas: state.respuestas.filter(item => {
          if (item.inspectionId === inspectionId) {
            return true;
          }
          return false;
        }),
      };
    }
    case 'GUARDAR_RESPUESTA': {
      const exists = !!state.respuestas.some(
        item =>
          item.inspectionId === respuesta.inspectionId &&
          item.groupId === respuesta.groupId &&
          item.sectionId === respuesta.sectionId &&
          item.questionId === respuesta.questionId,
      );

      if (!exists) {
        return {
          ...state,
          respuestas: state.respuestas.concat([respuesta]),
        };
      }
      return {
        ...state,
        respuestas: state.respuestas.map(item => {
          if (
            item.inspectionId === respuesta.inspectionId &&
            item.groupId === respuesta.groupId &&
            item.sectionId === respuesta.sectionId &&
            item.questionId === respuesta.questionId
          ) {
            return respuesta;
          }
          return item;
        }),
      };
    }
    case 'GUARDAR_CUESTIONARIO_TRABAJADO_PENDIENTE':
      return {
        ...state,
        guardando: true,
        error: null,
      };
    case 'GUARDAR_CUESTIONARIO_TRABAJADO_ERROR':
      return {
        ...state,
        guardando: false,
        error,
      };
    case 'GUARDAR_CUESTIONARIO_TRABAJADO_SATISFACTORIO':
      return {
        ...state,
        guardando: false,
        error: null,
        respuestas: state.respuestas.filter(respuesta => {
          const result = respuesta.inspectionId !== inspectionId;
          return result;
        }),
        // deprecated
        respuestasSeleccionadas: state.respuestasSeleccionadas.filter(respuesta => {
          const result = respuesta.inspectionId !== inspectionId;
          return result;
        }),
        // deprecated
      };
    default:
      return state;
  }
};
export default reducer;
