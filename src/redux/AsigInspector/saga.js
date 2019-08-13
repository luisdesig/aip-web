import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { AsigInspector } from '../../services/asiginspector.service';
import { exportarExcel } from '../../helpers/export';
import { Notification } from '../../components/Notifications/Notifications';
import { messagesEvent, messages } from '../../util/messages';
//import { } from './actions';
export function* buscarAsignarInspector() {
    yield takeEvery('_SEARCHASIGINSPECTOR', function* ({ payload }) {
        yield put({
            type: 'CARGANDOASIGINSPECTOR',
        })
        let response = payload;
        try {
            const result = yield call(AsigInspector, response, 1);
            if (result.data.response.status.success === true) {
                let data = result.data.response.payload
                yield put({
                    type: 'SEARCHASIGINSPECTOR',
                    data: data
                })
                //Notification('success', messages.asiginspectores.title, data)
            } else {
                yield put({
                    type: 'SEARCHASIGINSPECTOR',
                    data: []
                })
                //Notification('error', messages.asiginspectores.title, data)
            }
        } catch (error) {
            Notification('error', messages.asiginspectores.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* obtenerAsignarInspector() {
    yield takeEvery('_GETASIGINSPECTOR', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigInspector, response, 2);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'GETASIGINSPECTOR',
                    data: res.payload
                })
                //Notification('success', messages.asiginspectorescorredor.title, res.payload)
            } else {
                Notification('error', messages.asiginspectores.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asiginspectores.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* agregarAsignarInspector() {
    yield takeEvery('_POSTASIGINSPECTOR', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigInspector, response, 3);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'POSTASIGINSPECTOR'
                })
                Notification('success', messages.asiginspectores.title, res.payload)
            } else {
                Notification('error', messages.asiginspectores.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asiginspectores.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* actualizarAsignarInspector() {
    yield takeEvery('_UPDATEASIGINSPECTOR', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigInspector, response, 4);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTASIGINSPECTOR'
                })
                Notification('success', messages.asiginspectores.title, res.payload)
            } else {
                Notification('error', messages.asiginspectores.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asiginspectores.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* eliminarAsignarInspector() {
    yield takeEvery('_DELETEASIGINSPECTOR', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigInspector, response, 5);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTASIGINSPECTOR'
                })
                Notification('success', messages.asiginspectores.title, res.payload)
            } else {
                Notification('error', messages.asiginspectores.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asiginspectores.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* listarInspectoresLibres() {
    yield takeEvery('_INSPECTORESFREE', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigInspector, response, 7);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'INSPECTORESFREE',
                    data: res.payload
                })
                //Notification('success', messages.bandejainspeccion.title, res.payload)
            } else {
                Notification('error', messages.asiginspectores.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asiginspectores.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* listarInspectoresPrioridad() {
    yield takeEvery('_INSPECTORES', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigInspector, response, 6);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'INSPECTORES',
                    data: res.payload
                })
                //Notification('success', messages.asiginspectorescorredor.title, res.payload)
            } else {
                Notification('error', messages.asiginspectores.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asiginspectores.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* listarInspectoresZona() {
    yield takeEvery('_INSPECTORESZONA', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigInspector, response, 9);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'INSPECTORESZONA',
                    data: res.payload
                })
                //Notification('success', messages.asiginspectorescorredor.title, res.payload)
            } else {
                Notification('error', messages.asiginspectores.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asiginspectores.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* obtenerPrioridad() {
    yield takeEvery('_INSPECTORNEXTPRIORIDAD', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigInspector, response, 8);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'INSPECTORNEXTPRIORIDAD',
                    data: res.payload
                })
                //Notification('success', messages.asiginspectorescorredor.title, res.payload)
            } else {
                Notification('error', messages.asiginspectores.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asiginspectores.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* actualizarGrupoAsignarInspector() {
    yield takeEvery('_UPDATEGRUPOASIGINSPECTOR', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigInspector, response, 10);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTASIGINSPECTOR'
                })
                Notification('success', messages.asiginspectores.title, res.payload)
            } else {
                Notification('error', messages.asiginspectores.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asiginspectores.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* exportAsigInspector() {
    yield takeEvery('EXPORTASIGINSPECTOR', function* () {
        try {
            const result = yield call(AsigInspector, {}, 11);
            if (result.data.response.status.success === true) {
                let data = result.data.response.payload;
                yield put({
                    type: 'POSTASIGINSPECTOR'
                })
                exportarExcel(data);
                Notification('success', messages.asiginspectores.title, messagesEvent.exportar.success)
            } else {
                Notification('error', messages.asiginspectores.title, messagesEvent.exportar.error)
            }
        } catch (error) {
            Notification('error', messages.asiginspectores.title, messagesEvent.exportar.error)
        }
    })
}
export default function* rootSaga() {
    yield all([
        fork(buscarAsignarInspector),
        fork(obtenerAsignarInspector),
        fork(agregarAsignarInspector),
        fork(actualizarAsignarInspector),
        fork(eliminarAsignarInspector),
        fork(listarInspectoresLibres),
        fork(listarInspectoresPrioridad),
        fork(obtenerPrioridad),
        fork(listarInspectoresZona),
        fork(actualizarGrupoAsignarInspector),
        fork(exportAsigInspector)
    ])
}