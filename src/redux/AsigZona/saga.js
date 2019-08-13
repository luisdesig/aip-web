import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { AsigZona } from '../../services/asigzona.service';
import { exportarExcel } from '../../helpers/export';
import { Notification } from '../../components/Notifications/Notifications';
import { messagesEvent, messages } from '../../util/messages';
//import { } from './actions';
export function* buscarAsignarZona() {
    yield takeEvery('_SEARCHASIGZONA', function* ({ payload }) {
        yield put({
            type: 'CARGANDOASIGZONA',
        })
        let response = payload;
        try {
            const result = yield call(AsigZona, response, 1);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'SEARCHASIGZONA',
                    data: res.payload
                })
                //Notification('success', messages.asiginspectores.title, data)
            } else {
                yield put({
                    type: 'SEARCHASIGZONA',
                    data: []
                })
                //Notification('error', messages.asiginspectores.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asigzonas.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* agregarAsignarZona() {
    yield takeEvery('_POSTASIGZONA', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigZona, response, 3);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'POSTASIGZONA'
                })
                Notification('success', messages.asigzonas.title, res.payload)
            } else {
                Notification('error', messages.asigzonas.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asigzonas.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* actualizarAsignarZona() {
    yield takeEvery('_UPDATEASIGZONA', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigZona, response, 4);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTASIGZONA'
                })
                Notification('success', messages.asigzonas.title, res.payload)
            } else {
                Notification('error', messages.asigzonas.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asigzonas.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* eliminarAsignarZona() {
    yield takeEvery('_DELETEASIGZONA', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigZona, response, 5);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTASIGZONA'
                })
                Notification('success', messages.asigzonas.title, res.payload)
            } else {
                Notification('error', messages.asigzonas.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asigzonas.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* exportAsigZona() {
    yield takeEvery('EXPORTASIGZONA', function* () {
        try {
            const result = yield call(AsigZona, {}, 8);
            if (result.data.response.status.success === true) {
                let data = result.data.response.payload;
                yield put({
                    type: 'POSTASIGZONA'
                })
                exportarExcel(data);
                Notification('success', messages.asigzonas.title, messagesEvent.exportar.success)
            } else {
                Notification('error', messages.asigzonas.title, messagesEvent.exportar.error)
            }
        } catch (error) {
            Notification('error', messages.asigzonas.title, messagesEvent.exportar.error)
        }
    })
}

export default function* rootSaga() {
    yield all([
        fork(buscarAsignarZona),
        fork(agregarAsignarZona),
        fork(actualizarAsignarZona),
        fork(eliminarAsignarZona),
        fork(exportAsigZona)
    ])
}