const modelData = {
  idesolicitudinspeccion: 'Seleccione',
  idpmotivoendoso: 'Seleccione',
  idpmotivoinspeccion: 'Seleccione',
  numsolicitudinspeccion: 'Seleccione',
  idppolizaestrategica: '',
  codprod: '1301',
  idepolizaacuerdo: '',
  numpol: '',
  numren: '',
  idecliente: 'Seleccione',
  cliente: '',
  idecorredor: 'Seleccione',
  corredor: 'Seleccione',
  ideinmueblepoliza: 'Seleccione',
  idedirec: '',
  direccion: '',
  valordeclarado: '',
  ideriesgogironegocio: 'Seleccione',
  riesgo: '',
  ideubigeozona: 'Seleccione',
  zona: '',
  garantias: [],
};
const initState = {
  bandejainspecciones: [],
  bandejainspeccion: modelData,
  garantiascurrent: [],
  inmuebles: [],
  inmueble: {
    direccion: '',
    garantias: [],
    zona: {
      ideubigeozona: 'Seleccione',
      nombre: '',
    },
    riesgo: {
      ideriesgogironegocio: 'Seleccione',
      nombre: '',
    },
    valordeclarado: '',
  },
  reload: false,
  loading: true,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'CARGANDOINSPECCION':
      return {
        ...state,
        loading: true,
      };
    case 'SEARCHBANDINSPECCION':
      return {
        ...state,
        bandejainspecciones: action.data,
        reload: false,
        loading: false,
      };
    case 'POSTBANDINSPECCION':
      return {
        ...state,
        reload: true,
        loading: false,
      };
    case 'GETSOLICITUDINSPECCION':
      for (const key in state.bandejainspeccion) {
        state.bandejainspeccion[key] = action.data[key];
      }
      return {
        ...state,
        inmuebles: action.data.inmuebles,
      };
    case 'GETINMUEBLEINSPECCION':
      return {
        ...state,
        inmueble: action.data,
      };
    case 'CLEANDATA':
      return {
        ...state,
      };
    case 'SOLICITUDGARANTIA':
      return {
        ...state,
        garantiascurrent: action.data,
      };
    case 'REGISTERGARANTIA':
      return {
        ...state,
        garantiascurrent: state.garantiascurrent.concat(action.data),
      };
    case 'DELETEGARANTIA':
      console.log(action.id);
      return {
        ...state,
        garantiascurrent: state.garantiascurrent.map(res => {
          if (res.idegarantiarec === action.id) {
            res.indeliminado = 1;
            return {
              ...res,
            };
          } else {
            return res;
          }
        }),
        //garantiascurrent: state.garantiascurrent.filter((res) => res.idegarantiarec !== action.id)
      };
    case 'VALUESINMUEBLE':
      return {
        ...state,
      };
    case 'CHANGEVALORDECLARADO':
      state.inmueble.valordeclarado = action.data;
      return {
        ...state,
      };
    case 'CLEANINSPECCION':
      state.bandejainspeccion.numren = '';
      state.bandejainspeccion.cliente = '';
      state.bandejainspeccion.corredor = 'Seleccione';
      return {
        ...state,
        inmueble: {
          direccion: '',
          garantias: [],
          zona: {
            ideubigeozona: 'Seleccione',
            nombre: '',
          },
          riesgo: {
            ideriesgogironegocio: 'Seleccione',
            nombre: '',
          },
          valordeclarado: '',
        },
        garantiascurrent: [],
        inmuebles: [],
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
