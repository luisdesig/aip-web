const modelAsignacion = {
  ideprogramacion: '',
  nomcontacto: '',
  apepatcontacto: '',
  apematcontacto: '',
  telefono: '',
  celular: '',
  email: '',
  idppolizaestrategica: '',
  ideinspector: 'Seleccione',
  ideingeniero: '',
  ingeniero: '',
  valordeclarado: '',
  ideriesgogironegocio: 'Seleccione',
  riesgo: '',
  zona: '',
  idezona: '',
  ideriesgo: '',
};

function asignarHora(ideriesgo, data, agenda) {
  let numseq = ideriesgo === 1 ? 1 : ideriesgo === 2 || ideriesgo === 3 || ideriesgo === 4 ? 2 : 3;
  let numAsignado = agenda.filter(res => res.status === true && res.disabled === false);
  let newAgenda = [];
  for (let i = 0; i < agenda.length; i++) {
    if (data.status === false) {
      if (numAsignado.length === 0) {
        if (
          agenda[i].id >= data.id &&
          agenda[i].id <= data.id + numseq &&
          agenda[i].disabled === false
        ) {
          newAgenda.push({
            id: agenda[i].id,
            horainiprog: agenda[i].horainiprog,
            horafinprog: agenda[i].horafinprog,
            status: true,
            disabled: false,
          });
        } else {
          newAgenda.push(agenda[i]);
        }
      } else {
        if (
          numAsignado[0].id === data.id + 1 ||
          numAsignado[numAsignado.length - 1].id === data.id - 1
        ) {
          if (agenda[i].id === data.id) {
            newAgenda.push({
              id: agenda[i].id,
              horainiprog: agenda[i].horainiprog,
              horafinprog: agenda[i].horafinprog,
              status: true,
              disabled: false,
            });
          } else {
            newAgenda.push(agenda[i]);
          }
        } else {
          if (
            agenda[i].id >= data.id &&
            agenda[i].id <= data.id + numseq &&
            agenda[i].disabled === false
          ) {
            newAgenda.push({
              id: agenda[i].id,
              horainiprog: agenda[i].horainiprog,
              horafinprog: agenda[i].horafinprog,
              status: true,
              disabled: false,
            });
          } else {
            if (agenda[i].disabled === false) {
              newAgenda.push({
                id: agenda[i].id,
                horainiprog: agenda[i].horainiprog,
                horafinprog: agenda[i].horafinprog,
                status: false,
                disabled: false,
              });
            } else {
              newAgenda.push(agenda[i]);
            }
          }
        }
      }
    } else {
      if (agenda[i].id >= data.id && agenda[i].disabled === false) {
        newAgenda.push({
          id: agenda[i].id,
          horainiprog: agenda[i].horainiprog,
          horafinprog: agenda[i].horafinprog,
          status: false,
          disabled: false,
        });
      } else {
        newAgenda.push(agenda[i]);
      }
    }
  }
  return newAgenda;
}
const initState = {
  bandejaasignaciones: [],
  bandejaasignacion: modelAsignacion,
  comboinspectores: [],
  agenda: [],
  reload: false,
  loading: true,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'CARGANDOASIGNACION':
      return {
        ...state,
        loading: true,
      };
    case 'SEARCHBANDASIGNACION':
      return {
        ...state,
        bandejaasignaciones: action.data,
        reload: false,
        loading: false,
      };
    case 'GETBANDASIGNACION':
      return {
        ...state,
        bandejaasignacion: action.data,
      };
    case 'POSTBANDASIGNACION':
      return {
        ...state,
        reload: true,
      };
    case 'CHANGEVALUES':
      let bandejaasignacion = state.bandejaasignacion;
      if (action.key === 'ideriesgogironegocio') {
        state.bandejaasignacion.ideriesgogironegocio = action.value;
        state.bandejaasignacion.ideinspector = 'Seleccione';
      }
      if (action.key === 'ideinspector') {
        state.bandejaasignacion.ideinspector = action.value;
      }
      for (const item in bandejaasignacion) {
        if (item === action.key) {
          bandejaasignacion[item] = action.value;
        }
      }
      return {
        ...state,
        bandejaasignacion: bandejaasignacion,
        agenda: [],
      };
    case 'GETINSPECTORES':
      return {
        ...state,
        comboinspectores: action.data,
      };
    case 'CLEANINSPECTORES':
      state.bandejaasignacion.zona = '';
      state.bandejaasignacion.riesgo = '';
      state.bandejaasignacion.ideriesgo = '';
      return {
        ...state,
        comboinspectores: [],
      };
    case 'GETAGENDA':
      return {
        ...state,
        agenda: action.data.filter(res => res.disabled !== true || res.status === true),
      };
    case 'ASIGNARHORA':
      let response = asignarHora(action.ideriesgo, action.data, state.agenda);
      return {
        ...state,
        agenda: response,
      };
    case 'CLEANASIGNACION':
      return {
        ...state,
        bandejaasignacion: modelAsignacion,
        comboinspectores: [],
        agenda: [],
      };
    default:
      return state;
  }
};
export default reducer;
