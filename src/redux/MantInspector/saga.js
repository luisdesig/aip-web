import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { Inspectores } from '../../services/inspectores.service';
import { Notification } from '../../components/Notifications/Notifications';
import { messagesEvent, messages } from '../../util/messages';
//import { } from './actions';
export function* buscarInspectores() {
    yield takeEvery('_SEARCHINSPECTOR', function* ({ payload }) {
        let response = payload;
        yield put({
            type: 'CARGANDOINSPECTOR',
        })
        try {
            const result = yield call(Inspectores, response, 1);
            if (result.data.response.status.success === true) {
                let data = result.data.response.payload
                yield put({
                    type: 'SEARCHINSPECTOR',
                    data: data
                })
                //Notification('success', messages.asiginspectores.title, data)
            } else {
                yield put({
                    type: 'SEARCHINSPECTOR',
                    data: []
                })
                //Notification('error', messages.asiginspectores.title, data)
            }
        } catch (error) {
            Notification('error', messages.inspector.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* agregarInspectores() {
    yield takeEvery('_POSTINSPECTOR', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(Inspectores, response, 3);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTINSPECTOR'
                })
                Notification('success', messages.inspector.title, res.payload)
            } else {
                Notification('error', messages.inspector.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.inspector.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* actualizarInspectores() {
    yield takeEvery('_UPDATEINSPECTOR', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(Inspectores, response, 4);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTINSPECTOR'
                })
                Notification('success', messages.inspector.title, res.payload)
            } else {
                Notification('error', messages.inspector.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.inspector.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* eliminarInspectores() {
    yield takeEvery('_DELETEINSPECTOR', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(Inspectores, response, 5);
            let res = result.data.response
            if (result.data.response.status.success === true) {
                yield put({
                    type: 'POSTINSPECTOR'
                })
                Notification('success', messages.inspector.title, res.payload)
            } else {
                Notification('error', messages.inspector.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.inspector.title, messagesEvent.errorservidor.error)
        }
    })
}

export default function* rootSaga() {
    yield all([
        fork(buscarInspectores),
        fork(agregarInspectores),
        fork(actualizarInspectores),
        fork(eliminarInspectores)
    ]);
}
