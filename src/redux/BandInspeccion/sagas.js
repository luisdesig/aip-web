import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { BandInspeccion } from '../../services/bandInspeccion.service';
import { Notification } from '../../components/Notifications/Notifications';
import { success, error } from '../../components/Messages/Messages';
import { messagesEvent, messages } from '../../util/messages';

export function* buscarSolicitud() {
  yield takeEvery('SEARCHSOLICITUD', function*({ payload }) {
    yield put({
      type: 'CARGANDOINSPECCION',
    });
    let response = payload;
    try {
      const result = yield call(BandInspeccion, response, 1);
      if (result.data.response.status.success === true) {
        let data = result.data.response.payload;
        yield put({
          type: 'SEARCHBANDINSPECCION',
          data: data,
        });
        //Notification('success', messages.asiginspectores.title, data)
      } else {
        yield put({
          type: 'SEARCHBANDINSPECCION',
          data: [],
        });
        //Notification('error', messages.asiginspectores.title, data)
      }
    } catch (error) {
      Notification('error', messages.bandejainspeccion.title, messagesEvent.errorservidor.error);
    }
  });
}
export function* agregarSolicitud() {
  yield takeEvery('POSTSOLICITUD', function*({ payload }) {
    let response = payload;
    try {
      const result = yield call(BandInspeccion, response, 3);
      let res = result.data.response;
      if (res.status.success === true) {
        yield put({
          type: 'POSTBANDINSPECCION',
        });
        Notification('success', messages.bandejainspeccion.title, res.payload);
      } else {
        Notification('error', messages.bandejainspeccion.title, res.status.error.messages);
      }
    } catch (error) {
      Notification('error', messages.bandejainspeccion.title, messagesEvent.errorservidor.error);
    }
  });
}
export function* actualizarSolicitud() {
  yield takeEvery('UPDATESOLICITUD', function*({ payload }) {
    let response = payload;
    try {
      const result = yield call(BandInspeccion, response, 4);
      let res = result.data.response;
      if (result.data.response.status.success === true) {
        yield put({
          type: 'POSTBANDINSPECCION',
        });
        Notification('success', messages.bandejainspeccion.title, res.payload);
      } else {
        Notification('error', messages.bandejainspeccion.title, res.status.error.messages);
      }
    } catch (error) {
      Notification('error', messages.bandejainspeccion.title, messagesEvent.errorservidor.error);
    }
  });
}
export function* eliminarSolicitud() {
  yield takeEvery('DELETESOLICITUD', function*({ payload }) {
    let response = payload;
    try {
      const result = yield call(BandInspeccion, response, 5);
      let res = result.data.response;
      if (result.data.response.status.success === true) {
        yield put({
          type: 'POSTBANDINSPECCION',
        });
        Notification('success', messages.bandejainspeccion.title, res.payload);
      } else {
        Notification('error', messages.bandejainspeccion.title, res.status.error.messages);
      }
    } catch (error) {
      Notification('error', messages.bandejainspeccion.title, messagesEvent.errorservidor.error);
    }
  });
}
export function* consultarsolicitudpoliza() {
  yield takeEvery('GETSOLICITUDPOLIZA', function*({ payload }) {
    let response = payload;
    try {
      const result = yield call(BandInspeccion, response, 7);
      if (result.data.response.status.success === true) {
        let data = result.data.response.payload;
        yield put({
          type: 'GETSOLICITUDINSPECCION',
          data: data,
        });
        //success(messages.bandejainspeccion.poliza);
      } else {
        error(result.data.response.status.error.messages);
      }
    } catch (error) {
      Notification('error', messages.bandejainspeccion.title, messagesEvent.errorservidor.error);
    }
  });
}
export function* consultarsolicitudgarantia() {
  yield takeEvery('_SOLICITUDGARANTIA', function*({ payload }) {
    let response = payload;
    try {
      const result = yield call(BandInspeccion, response, 10);
      if (result.data.response.status.success === true) {
        let data = result.data.response.payload;
        yield put({
          type: 'SOLICITUDGARANTIA',
          data: data,
        });
      } else {
        error(result.data.response.status.error.messages);
      }
    } catch (error) {
      Notification('error', messages.bandejainspeccion.title, messagesEvent.errorservidor.error);
    }
  });
}
export function* consultarsolicitudinmueble() {
  yield takeEvery('GETINMUEBLEPOLIZA', function*({ payload }) {
    let response = payload;
    try {
      const result = yield call(BandInspeccion, response, 8);
      if (result.data.response.status.success === true) {
        let data = result.data.response.payload;
        yield put({
          type: 'GETINMUEBLEINSPECCION',
          data: data,
        });
        if (data.garantias.length === 0) {
          success(messages.bandejainspeccion.garantias);
        }
      } else {
        error(result.data.response.status.error.messages);
      }
    } catch (error) {
      Notification('error', messages.bandejainspeccion.title, messagesEvent.errorservidor.error);
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(buscarSolicitud),
    fork(agregarSolicitud),
    fork(actualizarSolicitud),
    fork(eliminarSolicitud),
    fork(consultarsolicitudpoliza),
    fork(consultarsolicitudinmueble),
    fork(consultarsolicitudgarantia),
  ]);
}
