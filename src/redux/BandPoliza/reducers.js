const initState = {
  polizasrenovar: [],
  polizarenovar: {},
  polizainmuebles: [{ active: 0 }],
  polizainmueble: {},
  garantiascurrent: [],
  reload: false,
  loading: true
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'CARGANDOPOLIZA': {
      return {
        ...state,
        loading: true
      }
    }
    case 'SEARCHBANDPOLIZA':
      return {
        ...state,
        polizasrenovar: action.data,
        reload: false,
        loading: false
      };
    case 'POSTBANDPOLIZA':
      return {
        ...state,
        reload: true,
        loading: false
      };
    case 'GETBANDPOLIZA':
      let inmuebles = action.data;
      for(let i = 0 ; i < inmuebles.length ; i++){
        if(inmuebles[i].active === 1 && inmuebles[i].checked === false && inmuebles[i].disabled === false && i < 11){
          inmuebles[i].checked = true
        }
      }
      return {
        ...state,
        polizainmuebles: action.data,
      };
    case 'CHANGEESTADO':
      return {
        ...state,
        polizainmuebles: state.polizainmuebles.map(inmueble => {
          if (inmueble.ideinmueblepoliza === action.data.ideinmueblepoliza) {
            inmueble.checked = action.data.checked;
            return {
              ...inmueble,
            };
          } else {
            return inmueble;
          }
        }),
      };
    case 'REGISTERGARANTIAPOLIZA':
      return {
        ...state,
        garantiascurrent: state.garantiascurrent.concat(action.data),
      };
    case 'DELETEGARANTIAPOLIZA':
      return {
        ...state,
        garantiascurrent: state.garantiascurrent.filter(res => res.idegarantiarec !== action.id),
      };
    case 'CLEANDATA':
      return {
        ...state,
        polizainmuebles: [],
        garantiascurrent: [],
      };
    default:
      return state;
  }
};
export default reducer;
