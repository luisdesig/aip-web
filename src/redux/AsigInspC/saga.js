import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { AsigInspC } from '../../services/asiginspc.service';
import { exportarExcel } from '../../helpers/export';
import { Notification } from '../../components/Notifications/Notifications';
import { messagesEvent, messages } from '../../util/messages';
//import { } from './actions';
export function* buscarCorredorInspector() {
    yield takeEvery('_SEARCHASIGINSPC', function* ({ payload }) {
        yield put({
            type: 'CARGANDOASIGINSPC',
        })
        let response = payload;
        try {
            const result = yield call(AsigInspC, response, 1);
            if (result.data.response.status.success === true) {
                let data = result.data.response.payload
                yield put({
                    type: 'SEARCHASIGINSPC',
                    data: data
                })
                //Notification('success', messages.asiginspectores.title, data)
            } else {
                yield put({
                    type: 'SEARCHASIGINSPC',
                    data: []
                })
                //Notification('error', messages.asiginspectores.title, data)
            }
        } catch (error) {
            Notification('error', messages.asiginspectorescorredor.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* obtenerCorredorInspector() {
    yield takeEvery('_GETASIGINSPC', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigInspC, response, 2);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'GETASIGINSPC',
                    data: res.payload
                })
                //Notification('success', messages.asiginspectorescorredor.title, res.payload)
            } else {
                Notification('error', messages.asiginspectorescorredor.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asiginspectorescorredor.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* agregarCorredorInspector() {
    yield takeEvery('_POSTASIGINSPC', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigInspC, response, 3);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'POSTASIGINSPC'
                })
                Notification('success', messages.asiginspectorescorredor.title, res.payload)
            } else {
                Notification('error', messages.asiginspectorescorredor.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asiginspectorescorredor.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* actualizarCorredorInspector() {
    yield takeEvery('_UPDATEASIGINSPC', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigInspC, response, 4);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTASIGINSPC'
                })
                Notification('success', messages.asiginspectorescorredor.title, res.payload)
            } else {
                Notification('error', messages.asiginspectorescorredor.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asiginspectorescorredor.title, messagesEvent.errorservidor.error)
        }
    })
}

export function* eliminarCorredorInspector() {
    yield takeEvery('_DELETEASIGINSPC', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigInspC, response, 5);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTASIGINSPC'
                })
                Notification('success', messages.asiginspectorescorredor.title, res.payload)
            } else {
                Notification('error', messages.asiginspectorescorredor.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asiginspectorescorredor.title, messagesEvent.errorservidor.error)
        }
    })
}

export function* listarCorredoresLibres() {
    yield takeEvery('_CORREDORINSPECTORFREE', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigInspC, response, 7);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'CORREDORINSPECTORFREE',
                    data: res.payload
                })
                //Notification('success', messages.bandejainspeccion.title, res.payload)
            } else {
                Notification('error', messages.asiginspectorescorredor.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asiginspectorescorredor.title, messagesEvent.errorservidor.error)
        }
    })
}

export function* listarInspectoresCorredor() {
    yield takeEvery('_CORREDORINSPECTOR', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigInspC, response, 8);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'CORREDORINSPECTOR',
                    data: res.payload
                })
                //Notification('success', messages.asiginspectorescorredor.title, res.payload)
            } else {
                Notification('error', messages.asiginspectorescorredor.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asiginspectorescorredor.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* actualizarGrupoCorredorInspector() {
    yield takeEvery('_UPDATEGRUPOASIGINSPC', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(AsigInspC, response, 9);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'UPDATEASIGINSPC'
                })
                Notification('success', messages.asiginspectorescorredor.title, res.payload)
            } else {
                Notification('error', messages.asiginspectorescorredor.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.asiginspectorescorredor.title, messagesEvent.errorservidor.error)
        }
    })
}

export function* importAsigInspC() {
    yield takeEvery('IMPORTASIGINSPC', function* ({ data }) {
        try {
            const result = yield call(AsigInspC, data, 10);
            let res = result.data.response;
            if (res.status.success === true) {
                yield put({
                    type: 'POSTASIGINSPC'
                })
                Notification('success',messages.asiginspectorescorredor.title,res.payload)
            } else {
                Notification('error', messages.asiginspectorescorredor.title,
                    `${messagesEvent.importar.error}: Asegúrese que los titulos sean 'Id del Inspector' Y 'Id del Corredor'.`)
            }
        } catch (error) {
            Notification('error', messagesEvent.errorservidor.error)
        }
    })
}
export function* exportAsigInspC() {
    yield takeEvery('EXPORTASIGINSPC', function* () {
        try {
            const result = yield call(AsigInspC, {}, 11);
            if (result.data.response.status.success === true) {
                let data = result.data.response.payload;
                yield put({
                    type: 'POSTASIGINSPC'
                })
                exportarExcel(data);
                Notification('success', messages.asiginspectorescorredor.title, messagesEvent.exportar.success)
            } else {
                Notification('error', messages.asiginspectorescorredor.title, messagesEvent.exportar.error)
            }
        } catch (error) {
            Notification('error', messages.asiginspectorescorredor.title, messagesEvent.errorservidor)
        }
    })
}
export default function* rootSaga() {
    yield all([
        fork(buscarCorredorInspector),
        fork(obtenerCorredorInspector),
        fork(agregarCorredorInspector),
        fork(actualizarCorredorInspector),
        fork(eliminarCorredorInspector),
        fork(listarCorredoresLibres),
        fork(listarInspectoresCorredor),
        fork(actualizarGrupoCorredorInspector),
        fork(exportAsigInspC),
        fork(importAsigInspC)
    ])
}