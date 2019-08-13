const initState = {
  cargando: false,
  items: [],
  error: null,
};

const reducer = (state = initState, action) => {
  const { type, error, items } = action;

  switch (type) {
    case 'CONSULTAR_CATEGORIAS_POR_INSPECCION_PENDIENTE':
      return {
        ...state,
        cargando: true,
        error: null,
        items: [],
      };
    case 'CONSULTAR_CATEGORIAS_POR_INSPECCION_ERROR':
      return {
        ...state,
        cargando: false,
        error,
        items: [],
      };
    case 'CONSULTAR_CATEGORIAS_POR_INSPECCION_SATISFACTORIO':
      return {
        ...state,
        cargando: false,
        error: null,
        items: [...items],
      };
    case 'ESCARGAR_INSPECCION':
      return {
        ...state,
        cargando: true,
        error: null,
        items: [...items],
      };
    default:
      return state;
  }
};
export default reducer;
