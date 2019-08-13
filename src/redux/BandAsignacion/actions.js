import { BandAsignacion } from '../../services/bandAsignacion.service';

const ACTIONGETBANASIGNACION = data => ({
  type: 'GETBANDASIGNACION',
  data: data,
});
const ACTIONGETAGENDA = data => ({
  type: 'GETAGENDA',
  data: data,
});
export const ACTIONCLEANASIGNACION = () => ({
  type: 'CLEANASIGNACION',
});
export const ACTIONCHANGEVALUES = (key, value) => ({
  type: 'CHANGEVALUES',
  key,
  value,
});
export const ACTIONASIGNARHORA = (ideriesgo,data) => ({
  type: 'ASIGNARHORA',
  ideriesgo: ideriesgo,
  data: data
});
export const STARTACTIONSEARCH = data => ({
  type: '_STARTACTIONSEARCH',
  payload: data,
});

export const STARTACTIONGET = data => {
  return dispatch => {
    BandAsignacion(data, 2).then(res => {
      try {
        if (res.data.response.status.success === false) {
          dispatch(ACTIONGETBANASIGNACION([]));
        } else {
          dispatch(ACTIONGETBANASIGNACION(res.data.response.payload));
        }
      } catch (e) {
        console.log(e);
      }
    });
  };
};
export const STARTACTIONPOST = data => ({
  type: '_STARTACTIONPOST',
  payload: data,
});
export const STARTACTIONPUT = data => ({
  type: '_STARTACTIONPUT',
  payload: data,
});
export const STARTACTIONDELETE = data => ({
  type: '_STARTACTIONDELETE',
  payload: data,
});

export const STARTACTIONGETINSPECTORES = data => ({
  type: '_STARTACTIONGETINSPECTORES',
  payload: data,
});

export const STARTACTIONEDITAGENDA = data => ({
  type: '_STARTACTIONEDITAGENDA',
  payload: data,
});

export const STARTACTIONGETAGENDA = data => {
  return dispatch => {
    BandAsignacion(data, 8).then(res => {
      try {
        if (res.data.response.status.success === false) {
          dispatch(ACTIONGETAGENDA([]));
        } else {
          dispatch(ACTIONGETAGENDA(res.data.response.payload));
        }
      } catch (e) {
        console.log(e);
      }
    });
  };
};
