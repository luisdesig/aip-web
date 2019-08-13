import actions from './actions';
import React from 'react';

import MantRoles from '../../containers/InspeccionesPatrimoniales/Mantenimientos/MantRoles/MantRoles';
import MantInspector from '../../containers/InspeccionesPatrimoniales/Mantenimientos/MantInspector/MantInspector';
import MantCorredor from '../../containers/InspeccionesPatrimoniales/Mantenimientos/MantCorredor/MantCorredor';
import MantZona from '../../containers/InspeccionesPatrimoniales/Mantenimientos/MantZona/MantZona';
import MantPoliza from "../../containers/InspeccionesPatrimoniales/Mantenimientos/MantPolizaEstrategica/MantPolizaEstrategica";
import MantGarantia from "../../containers/InspeccionesPatrimoniales/Mantenimientos/MantGarantia/MantGarantia";

import ClasRiesgo from "../../containers/InspeccionesPatrimoniales/Asignaciones/ClasRiesgo/ClasRiesgo";
import AsigZona from '../../containers/InspeccionesPatrimoniales/Asignaciones/AsigZona/AsigZona';
import AsigInspector from '../../containers/InspeccionesPatrimoniales/Asignaciones/AsigInspector/AsigInspector';
import AsigInspC from "../../containers/InspeccionesPatrimoniales/Asignaciones/AsigInspC/AsigInspC";

import BandPolizas from "../../containers/InspeccionesPatrimoniales/Bandejas/BandPolizas/BandPolizas";
import RevisionInforme from "../../containers/InspeccionesPatrimoniales/Bandejas/RevisionInforme/RevisionInforme";
import BandInspeccion from "../../containers/InspeccionesPatrimoniales/Bandejas/BandInspeccion/BandInspeccion";
import BandAsignacion from "../../containers/InspeccionesPatrimoniales/Bandejas/BandAsignacion/BandAsignacion";


let indexesMenu = [{
  index: 4,
  component: <MantRoles />
}, {
  index: 5,
  component: <MantInspector />
}, {
  index: 6,
  component: <MantCorredor />
}, {
  index: 7,
  component: <MantZona />
}, {
  index: 8,
  component: <MantPoliza />
}, {
  index: 9,
  component: <MantGarantia />
}, {
  index: 10,
  component: <ClasRiesgo />
}, {
  index: 11,
  component: <AsigZona />
}, {
  index: 12,
  component: <AsigInspector />
}, {
  index: 13,
  component: <AsigInspC />
}, {
  index: 14,
  component: <BandPolizas />
}, {
  index: 15,
  component: <BandInspeccion />
}, {
  index: 16,
  component: <BandAsignacion />
}, {
  index: 17,
  component: <RevisionInforme />
},]


const initState = {
  idToken: null,
  changePassword: false,
  userChangePassword: '',
  username: 'UN',
  sidebar: [],
  acciones: [],
  modal: false
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        idToken: action.token,
        changePassword: false,
        username: action.username
      };
    case actions.LOGOUT:
      return initState;
    case actions.CHECK_PASSWORD:
      return {
        ...state,
        changePassword: true,
        userChangePassword: action.data
      }
    case actions.CHANGEMODALOFF:
      return {
        ...state,
        changePassword: false
      }
    case actions.SIDEBAR_USER:
      return {
        ...state,
        sidebar: action.data.data.map(padre => {
          let responseChildren = padre.padre.hijos
          responseChildren.map(hijo => {
            let componentRx = indexesMenu.find(result => result.index === hijo.index)
            if (!!componentRx) {
              hijo.component = componentRx.component
              return {
                ...hijo
              }
            }
          })
          return {
            ...padre
          }
        }),
        acciones: action.data.acciones
      }
    case 'PERMISO_DENEGADO':
      return {
        ...state,
        modal: true
      }
    case 'CLEAN_MODAL':
      return {
        ...state,
        modal: false
      }
    default:
      return state;
  }
}
