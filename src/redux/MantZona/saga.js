import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { Zonas } from '../../services/zonas.service';
import { Notification } from '../../components/Notifications/Notifications';
import { success, error } from '../../components/Messages/Messages';
import { messagesEvent,messages } from '../../util/messages';
//import { } from './actions';
export function* buscarZonasGeograficas() {
    yield takeEvery('_SEARCHZONAGEOGRAFICA', function* ({ payload }) {
        yield put({
            type: 'CARGANDOZONAGEOGRAFICA',
        })
        let response = payload;
        try {
            const result = yield call(Zonas, response, 1);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'SEARCHZONAGEOGRAFICA',
                    data: res.payload
                })
                //Notification('success', messages.zonasgeograficas.title, data)
            } else {
                yield put({
                    type: 'SEARCHZONAGEOGRAFICA',
                    data: []
                })
                //Notification('error', messages.zonasgeograficas.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.zonasgeograficas.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* agregarZonasGeograficas() {
    yield takeEvery('_POSTZONA', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(Zonas, response, 3);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'POSTZONA'
                })
                Notification('success', messages.zonasgeograficas.title, res.payload)
            } else {
                Notification('error', messages.zonasgeograficas.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.garantzonasgeograficasias.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* actualizarZonasGeograficas() {
    yield takeEvery('_UPDATEZONA', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(Zonas, response, 4);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTZONA'
                })
                Notification('success', messages.zonasgeograficas.title, res.payload)
            } else {
                Notification('error', messages.zonasgeograficas.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.zonasgeograficas.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* eliminarZonasGeograficas() {
    yield takeEvery('_DELETEZONA', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(Zonas, response, 5);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTZONA'
                })
                Notification('success', messages.zonasgeograficas.title, res.payload)
            } else {
                Notification('error', messages.zonasgeograficas.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.zonasgeograficas.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* freeZonasGeograficas() {
    yield takeEvery('_ZONASFREE', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(Zonas, response, 8);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'ZONASFREE',
                    data: res.payload
                })
                //success(messages.garantias.prioridad)
            } else {
                error(res.status.error.message)
            }
        } catch (error) {
            Notification('error', messages.zonasgeograficas.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* listZonasGeograficas() {
    yield takeEvery('_LISTZONAS', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(Zonas, response, 9);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'LISTZONAS',
                    data: res.payload
                })
                //success(messages.garantias.prioridad)
            } else {
                error(res.status.error.message)
            }
        } catch (error) {
            Notification('error', messages.zonasgeograficas.title, messagesEvent.errorservidor.error)
        }
    })
}
export default function* rootSaga() {
    yield all([
        fork(buscarZonasGeograficas),
        fork(agregarZonasGeograficas),
        fork(actualizarZonasGeograficas),
        fork(eliminarZonasGeograficas),
        fork(freeZonasGeograficas),
        fork(listZonasGeograficas)
    ])
}