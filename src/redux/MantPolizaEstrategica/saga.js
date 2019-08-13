import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { PolizaEstrategica } from '../../services/polizaestrategica.service';
import { exportarExcel } from '../../helpers/export';
import { Notification } from '../../components/Notifications/Notifications';
import { messagesEvent, messages } from '../../util/messages';
import Reactotron from 'reactotron-react-js';
//import { } from './actions';
export function* buscarPolizaEstrategica() {
    yield takeEvery('_SEARCHPOLIZAESTRATEGICA', function* ({ payload }) {
        let response = payload;
        yield put({
            type: 'CARGANDOPOLIZAESTRATEGICA',
        })
        try {
            const result = yield call(PolizaEstrategica, response, 1);
            if (result.data.response.status.success === true) {
                let data = result.data.response.payload
                yield put({
                    type: 'SEARCHPOLIZAESTRATEGICA',
                    data: data
                })
                //Notification('success', messages.asiginspectores.title, data)
            } else {
                yield put({
                    type: 'SEARCHPOLIZAESTRATEGICA',
                    data: []
                })
                //Notification('error', messages.asiginspectores.title, data)
            }
        } catch (error) {
            Notification('error', messages.polizas.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* agregarPolizaEstrategica() {
    yield takeEvery('_POSTPOLIZAESTRATEGICA', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(PolizaEstrategica, response, 3);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTPOLIZAESTRATEGICA'
                })
                Notification('success', messages.polizas.title, res.payload)
            } else {
                Notification('error', messages.polizas.title, res.status.error.message)
            }
        } catch (error) {
            Notification('error', messages.polizas.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* actualizarPolizaEstrategica() {
    yield takeEvery('_PUTPOLIZAESTRATEGICA', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(PolizaEstrategica, response, 4);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTPOLIZAESTRATEGICA'
                })
                Notification('success', messages.polizas.title, res.payload)
            } else {
                Notification('error', messages.polizas.title, res.status.error.message)
            }
        } catch (error) {
            Notification('error', messages.polizas.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* eliminarPolizaEstrategica() {
    yield takeEvery('_DELETEPOLIZAESTRATEGICA', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(PolizaEstrategica, response, 5);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTPOLIZAESTRATEGICA'
                })
                Notification('success', messages.polizas.title, res.payload)
            } else {
                Notification('error', messages.polizas.title, res.status.error.message)
            }
        } catch (error) {
            Notification('error', messages.polizas.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* exportPolizaEstrategica() {
    yield takeEvery('EXPORTPOLIZAESTRATEGICA', function* () {
        try {
            const result = yield call(PolizaEstrategica, {}, 8);
            if (result.data.response.status.success === true) {
                let data = result.data.response.payload;
                yield put({
                    type: 'POSTPOLIZAESTRATEGICA'
                })
                exportarExcel(data);
                Notification('success', messages.polizas.title, messagesEvent.exportar.success);
            } else {
                Notification('error', messages.polizas.title, messagesEvent.exportar.error);
            }
        } catch (error) {
            Notification('error', messages.polizas.title, messagesEvent.errorservidor.error);
        }
    });
}
export function* importPolizaEstrategica() {
    yield takeEvery('IMPORTPOLIZAESTRATEGICA', function* ({ data }) {
        try {
            const result = yield call(PolizaEstrategica, data, 7);
            let res = result.data.response;
            if (res.payload === 'success') {
                yield put({
                    type: 'POSTPOLIZAESTRATEGICA'
                })
                Notification('success', messages.polizas.title, messagesEvent.importar.success);
            } else {
                Notification('error', messages.polizas.title, res.status.messages);
            }
        } catch (error) {
            Notification('error', `${messagesEvent.importar.error}: Asegúrese que los titulos sean CODPRODUCTO Y NUMPOLIZA.`);
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(buscarPolizaEstrategica),
        fork(agregarPolizaEstrategica),
        fork(actualizarPolizaEstrategica),
        fork(eliminarPolizaEstrategica),
        fork(exportPolizaEstrategica),
        fork(importPolizaEstrategica)
    ]);
}
