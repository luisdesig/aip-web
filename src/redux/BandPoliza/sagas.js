import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { BandPoliza  } from '../../services/bandpoliza.service';
import { Notification } from '../../components/Notifications/Notifications';
import { success, error } from '../../components/Messages/Messages';
import { messagesEvent, messages } from '../../util/messages';

export function* searchPolizas() {
    yield takeEvery('SEARCHPOLIZAS', function* ({ payload }) {
        yield put({
            type: 'CARGANDOPOLIZA',
        })
        let response = payload;
        try {
            const result = yield call(BandPoliza, response, 1);
            if (result.data.response.status.success === true) {
                let data = result.data.response.payload
                yield put({
                    type: 'SEARCHBANDPOLIZA',
                    data: data
                })
                //Notification('success', messages.asiginspectores.title, data)
            } else {
                yield put({
                    type: 'SEARCHBANDPOLIZA',
                    data: []
                })
                //Notification('error', messages.asiginspectores.title, data)
            }
        } catch (error) {
            Notification('error', messages.bandejapolizarenovar.title, messagesEvent.errorservidor.error)
        }
    })
}

export function* getInmubles() {
    yield takeEvery('GETINMUEBLES', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(BandPoliza, response, 2);
            if (result.data.response.status.success === true) {
                let data = result.data.response.payload
                yield put({
                    type: 'GETBANDPOLIZA',
                    data: data
                })
                success(messages.bandejapolizarenovar.inmueblescargado)
            } else {
                error(messages.bandejapolizarenovar.inmuebleserror)
            }
        } catch (error) {
            Notification('error', messages.bandejapolizarenovar.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* saveInmuebles() {
    yield takeEvery('POSTINMUEBLES', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(BandPoliza, response, 3);
            let res = result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'POSTBANDPOLIZA',
                })
                Notification('success', messages.bandejapolizarenovar.title, res.payload)
            } else {
                Notification('error', messages.bandejapolizarenovar.title, res.status.error.messages)
            }
        } catch (error) {
            Notification('error', messages.bandejapolizarenovar.title, messagesEvent.errorservidor.error)
        }
    })
}

export default function* rootSaga() {
    yield all([
        fork(searchPolizas),
        fork(getInmubles),
        fork(saveInmuebles)
    ])
}