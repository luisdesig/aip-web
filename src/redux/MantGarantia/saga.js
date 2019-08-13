import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { Garantias } from '../../services/garantia.service';
import { Notification } from '../../components/Notifications/Notifications';
import { success, error } from '../../components/Messages/Messages';
import { messagesEvent,messages } from '../../util/messages';
//import { } from './actions';
export function* buscarGarantiaRecomendacion() {
    yield takeEvery('_SEARCHGARANTIA', function* ({ payload }) {
        yield put({
            type: 'CARGANDOGARANTIA',
        })
        let response = payload;
        try {
            const result = yield call(Garantias, response, 1);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'SEARCHGARANTIA',
                    data: res.payload
                })
                //Notification('success', messages.asiginspectores.title, data)
            } else {
                yield put({
                    type: 'SEARCHGARANTIA',
                    data: []
                })
                //Notification('error', messages.asiginspectores.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.garantias.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* agregarGarantiaRecomendacion() {
    yield takeEvery('_POSTGARANTIA', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(Garantias, response, 3);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'POSTGARANTIA'
                })
                Notification('success', messages.garantias.title, res.payload)
            } else {
                Notification('error', messages.garantias.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.garantias.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* actualizarGarantiaRecomendacion() {
    yield takeEvery('_UPDATEGARANTIA', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(Garantias, response, 4);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTGARANTIA'
                })
                Notification('success', messages.garantias.title, res.payload)
            } else {
                Notification('error', messages.garantias.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.garantias.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* eliminarGarantiaRecomendacion() {
    yield takeEvery('_DELETEGARANTIA', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(Garantias, response, 5);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTGARANTIA'
                })
                Notification('success', messages.garantias.title, res.payload)
            } else {
                Notification('error', messages.garantias.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.garantias.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* prioridadGarantiaRecomendacion() {
    yield takeEvery('_GARANTIAPRIORIDAD', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(Garantias, response, 7);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'GARANTIAPRIORIDAD',
                    data: res.payload
                })
                //success(messages.garantias.prioridad)
            } else {
                error(res.status.error.message)
            }
        } catch (error) {
            Notification('error', messages.garantias.title, messagesEvent.errorservidor.error)
        }
    })
}
export default function* rootSaga() {
    yield all([
        fork(buscarGarantiaRecomendacion),
        fork(agregarGarantiaRecomendacion),
        fork(actualizarGarantiaRecomendacion),
        fork(eliminarGarantiaRecomendacion),
        fork(prioridadGarantiaRecomendacion)
    ])
}