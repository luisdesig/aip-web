import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { BandAsignacion } from '../../services/bandAsignacion.service';
import { Notification } from '../../components/Notifications/Notifications';
import { error } from '../../components/Messages/Messages';
import { messagesEvent, messages } from '../../util/messages';

export function* buscarAsignacion() {
  yield takeEvery('_STARTACTIONSEARCH', function*({ payload }) {
    yield put({
      type: 'CARGANDOASIGNACION',
    });
    let response = payload;
    try {
      const result = yield call(BandAsignacion, response, 1);
      if (result.data.response.status.success === true) {
        let data = result.data.response.payload;
        yield put({
          type: 'SEARCHBANDASIGNACION',
          data: data,
        });
        //Notification('success', messages.asiginspectores.title, data)
      } else {
        yield put({
          type: 'SEARCHBANDASIGNACION',
          data: [],
        });
        //Notification('error', messages.asiginspectores.title, data)
      }
    } catch (error) {
      Notification('error', messages.bandejaasignacion.title, messagesEvent.errorservidor.error);
    }
  });
}
export function* agregarAsignacion() {
  yield takeEvery('_STARTACTIONPOST', function*({ payload }) {
    let response = payload;
    try {
      const result = yield call(BandAsignacion, response, 3);
      let res = result.data.response;
      if (res.status.success === true) {
        yield put({
          type: 'POSTBANDASIGNACION',
        });
        Notification('success', messages.bandejaasignacion.title, res.payload);
      } else {
        Notification('error', messages.bandejaasignacion.title, res.status.error.messages);
      }
    } catch (error) {
      Notification('error', messages.bandejaasignacion.title, messagesEvent.errorservidor.error);
    }
  });
}
export function* actualizarAsignacion() {
  yield takeEvery('_STARTACTIONPUT', function*({ payload }) {
    let response = payload;
    try {
      const result = yield call(BandAsignacion, response, 4);
      let res = result.data.response;
      if (result.data.response.status.success === true) {
        yield put({
          type: 'POSTBANDASIGNACION',
        });
        Notification('success', messages.bandejaasignacion.title, res.payload);
      } else {
        Notification('error', messages.bandejaasignacion.title, res.status.error.messages);
      }
    } catch (error) {
      Notification('error', messages.bandejaasignacion.title, messagesEvent.errorservidor.error);
    }
  });
}
export function* eliminarAsignacion() {
  yield takeEvery('_STARTACTIONDELETE', function*({ payload }) {
    let response = payload;
    try {
      const result = yield call(BandAsignacion, response, 5);
      let res = result.data.response;
      if (result.data.response.status.success === true) {
        yield put({
          type: 'POSTBANDASIGNACION',
        });
        Notification('success', messages.bandejaasignacion.title, res.payload);
      } else {
        Notification('error', messages.bandejaasignacion.title, res.status.error.messages);
      }
    } catch (error) {
      Notification('error', messages.bandejaasignacion.title, messagesEvent.errorservidor.error);
    }
  });
}
export function* consultarGiroNegocio() {
  yield takeEvery('_STARTACTIONGETINSPECTORES', function*({ payload }) {
    let response = payload;
    try {
      const result = yield call(BandAsignacion, response, 7);
      const res = result.data.response;
      if (res.status.success === true) {
        let data = res.payload;
        yield put({
          type: 'GETINSPECTORES',
          data: data,
        });
        //success(messages.bandejainspeccion.poliza)
      } else {
        yield put({
          type: 'CLEANINSPECTORES',
        });
        error(res.status.error.messages);
      }
    } catch (error) {
      Notification('error', messages.bandejaasignacion.title, messagesEvent.errorservidor.error);
    }
  });
}
//_STARTACTIONEDITAGENDA
export function* editAgenda() {
  yield takeEvery('_STARTACTIONEDITAGENDA', function*({ payload }) {
    let response = payload;
    try {
      const result = yield call(BandAsignacion, response, 9);
      const res = result.data.response;
      if (res.status.success === true) {
        let data = res.payload;
        yield put({
          type: 'GETAGENDA',
          data: data,
        });
      } else {
        error(res.status.error.messages);
      }
    } catch (error) {
      Notification('error', messages.bandejaasignacion.title, messagesEvent.errorservidor.error);
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(buscarAsignacion),
    fork(agregarAsignacion),
    fork(actualizarAsignacion),
    fork(eliminarAsignacion),
    fork(consultarGiroNegocio),
    fork(editAgenda),
  ]);
}
