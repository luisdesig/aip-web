const initState = {
  cargando: false,
  guardando: false,
  items: [],
  error: null,
};

const reducer = (state = initState, action) => {
  const { type, error, items, inspectionId } = action;

  switch (type) {
    case 'CONSULTAR_CUESTIONARIOS_POR_PARAMETROS_PENDIENTE':
      return {
        ...state,
        cargando: true,
        error: null,
        items: [],
      };
    case 'CONSULTAR_CUESTIONARIOS_POR_PARAMETROS_ERROR':
      return {
        ...state,
        cargando: false,
        error,
        items: [],
      };
    case 'CONSULTAR_CUESTIONARIOS_POR_PARAMETROS_SATISFACTORIO':
      return {
        ...state,
        cargando: false,
        error: null,
        items: [...items],
      };
    case 'GUARDAR_CUESTIONARIO_PENDIENTE':
      return {
        ...state,
        guardando: true,
        error: null,
      };
    case 'GUARDAR_CUESTIONARIO_ERROR':
      return {
        ...state,
        guardando: false,
        error,
      };
    case 'GUARDAR_CUESTIONARIO_SATISFACTORIO':
      return {
        ...state,
        guardando: false,
        error: null,
        // items: state.items.filter(item ),
      };
    default:
      return state;
  }
};
export default reducer;
