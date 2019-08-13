import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { ClasRiesgos } from '../../services/clasriesgo.service';
import { exportarExcel } from '../../helpers/export';
import { Notification } from '../../components/Notifications/Notifications';
import { messagesEvent, messages } from '../../util/messages';
//import { } from './actions';
export function* buscarClasificacionRiesgo() {
    yield takeEvery('_SEARCHCLASRIESGO', function* ({ payload }) {
        yield put({
            type: 'CARGANDOCLASRIESGO',
        })
        let response = payload;
        try {
            const result = yield call(ClasRiesgos, response, 1);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'SEARCHCLASRIESGO',
                    data: res.payload
                })
                //Notification('success', messages.asiginspectores.title, data)
            } else {
                yield put({
                    type: 'SEARCHCLASRIESGO',
                    data: []
                })
                //Notification('error', messages.asiginspectores.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.clasriesgo.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* agregarClasificacionRiesgo() {
    yield takeEvery('_POSTCLASRIESGO', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(ClasRiesgos, response, 3);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'POSTCLASRIESGO'
                })
                Notification('success', messages.clasriesgo.title, res.payload)
            } else {
                Notification('error', messages.clasriesgo.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.clasriesgo.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* actualizarClasificacionRiesgo() {
    yield takeEvery('_UPDATECLASRIESGO', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(ClasRiesgos, response, 4);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTCLASRIESGO'
                })
                Notification('success', messages.clasriesgo.title, res.payload)
            } else {
                Notification('error', messages.clasriesgo.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.clasriesgo.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* eliminarClasificacionRiesgo() {
    yield takeEvery('_DELETECLASRIESGO', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(ClasRiesgos, response, 5);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTCLASRIESGO'
                })
                Notification('success', messages.clasriesgo.title, res.payload)
            } else {
                Notification('error', messages.clasriesgo.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.clasriesgo.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* exportClasRiesgo() {
    yield takeEvery('EXPORTCLASRIESGO', function* () {
        try {
            const result = yield call(ClasRiesgos, {}, 8);
            if (result.data.response.status.success === true) {
                let data = result.data.response.payload;
                yield put({
                    type: 'POSTCLASRIESGO'
                })
                exportarExcel(data);
                Notification('success', messages.clasriesgo.title, messagesEvent.exportar.success)
            } else {
                Notification('error', messages.clasriesgo.title, messagesEvent.exportar.error)
            }
        } catch (error) {
            Notification('error', messages.clasriesgo.title, messagesEvent.exportar.error)
        }
    })
}
export default function* rootSaga() {
    yield all([
        fork(buscarClasificacionRiesgo),
        fork(agregarClasificacionRiesgo),
        fork(actualizarClasificacionRiesgo),
        fork(eliminarClasificacionRiesgo),
        fork(exportClasRiesgo)
    ])
}