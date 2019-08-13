const initState = {
  revisioninformes: [],
  cargandoInformes: false,
  revisioncuestionario: {
    cuestionario: [
      {
        grupopregunta: [
          {
            seccion: [
              {
                agrupador: [
                  {
                    pregunta: [
                      {
                        respuesta: [],
                        valorrespuesta: {
                          idevalorrespuesta: '',
                          valor: '',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    garantias: [],
    media: [],
  },
  respuestas: [],

  // Desarrollo MVF
  guardando: false,
  error: null,
};

const reducer = (state = initState, action) => {
  const { error } = action;

  switch (action.type) {
    case 'SEARCHREVISIONINFORME':
      return {
        ...state,
        cargandoInformes: action.cargandoInformes,
        revisioninformes: action.data,
      };
    case 'PENDIENTESEARCHREVISIONINFORME':
      return {
        ...state,
        cargandoInformes: action.cargandoInformes,
      };
    case 'GETREVISIONCUESTIONARIO':
      return {
        ...state,
        revisioncuestionario: action.data,
      };
    case 'CHANGEVALUESCUESTIONARIO':
      state.revisioncuestionario.cuestionario.forEach(cu => {
        cu.grupopregunta.forEach(gr => {
          gr.seccion.forEach(se => {
            se.agrupador.forEach(ag => {
              if (ag.dscagrupador === 'PORCENTAJE_100') {
                ag.porcentaje100 = 0;
              }

              ag.pregunta.forEach(pr => {
                //console.log(pr.idepregunta);
                if (pr.idepregunta === action.data.pregunta.idepregunta) {
                  switch (pr.dsccontrol) {
                    case 'INPUT':
                      pr.valorrespuesta.valor = action.data.respuesta;
                      break;
                    case 'COMBO':
                      pr.valorrespuesta.iderespuestavalor = action.data.respuesta;
                      break;
                    case 'TEXT_AREA':
                      pr.valorrespuesta.valor = action.data.respuesta;
                      break;
                    case 'RADIO_BUTTON':
                      pr.valorrespuesta.iderespuestavalor = action.data.respuesta;
                      break;
                    case 'CHECKBOX':
                      pr.valorrespuesta.valor = action.data.respuesta;
                      break;
                    case 'CHECKBOX_TITULO':
                      pr.valorrespuesta.valor = action.data.respuesta;
                      break;
                    default:
                      break;
                  }
                  for (let i = 0, size = state.respuestas.length; i < size; i += 1) {
                    if (
                      state.respuestas[i].idepregunta &&
                      state.respuestas[i].idepregunta === action.data.pregunta.idepregunta
                    ) {
                      state.respuestas.splice(i);
                    }
                  }
                  state.respuestas.push(pr);
                }
                if (ag.dscagrupador === 'PORCENTAJE_100' && pr.idptipopregunta !== 'TEXTO') {
                  ag.porcentaje100 += Number(pr.valorrespuesta.valor);
                }
              });
            });
          });
        });
      });

      return {
        ...state,
      };

    // Desarrollo MVF
    case 'CANCELAR_INFORME_PENDIENTE':
      return {
        ...state,
        guardando: true,
        error: null,
      };
    case 'CANCELAR_INFORME_ERROR':
      return {
        ...state,
        guardando: false,
        error,
      };
    case 'CANCELAR_INFORME_SATISFACTORIO':
      return {
        ...state,
        guardando: false,
        error: null,
      };
    case 'REPROGRAMAR_INFORME_PENDIENTE':
      return {
        ...state,
        guardando: true,
        error: null,
      };
    case 'REPROGRAMAR_INFORME_ERROR':
      return {
        ...state,
        guardando: false,
        error,
      };
    case 'REPROGRAMAR_INFORME_SATISFACTORIO':
      return {
        ...state,
        guardando: false,
        error: null,
      };
    case 'RECHAZAR_INFORME_PENDIENTE':
      return {
        ...state,
        guardando: true,
        error: null,
      };
    case 'RECHAZAR_INFORME_ERROR':
      return {
        ...state,
        guardando: false,
        error,
      };
    case 'RECHAZAR_INFORME_SATISFACTORIO':
      return {
        ...state,
        guardando: false,
        error: null,
      };
    case 'FINALIZAR_INFORME_PENDIENTE':
      return {
        ...state,
        guardando: true,
        error: null,
      };
    case 'FINALIZAR_INFORME_ERROR':
      return {
        ...state,
        guardando: false,
        error,
      };
    case 'FINALIZAR_INFORME_SATISFACTORIO':
      return {
        ...state,
        guardando: false,
        error: null,
      };
    default:
      return state;
  }
};
export default reducer;
