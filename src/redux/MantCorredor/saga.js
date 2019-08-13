import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { Corredores } from '../../services/corredor.service';
import { Notification } from '../../components/Notifications/Notifications';
import { messagesEvent, messages } from '../../util/messages';
//import { } from './actions';
export function* buscarCorredores() {
    yield takeEvery('_SEARCHCORREDOR', function* ({ payload }) {
        let response = payload;
        yield put({
            type: 'CARGANDOCORREDOR',
        })
        try {
            const result = yield call(Corredores, response, 1);
            let res =  result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'SEARCHCORREDOR',
                    data: res.payload
                })
                //Notification('success', messages.asiginspectores.title, data)
            } else {
                yield put({
                    type: 'SEARCHCORREDOR',
                    data: []
                })
                //Notification('error', messages.asiginspectores.title, data)
            }
        } catch (error) {
            Notification('error', messages.polizas.title, messagesEvent.errorservidor.error)
        }
    })
}
export function* listarCorredores() {
    yield takeEvery('_LISTCORREDORES', function* ({ payload }) {
        let response = payload;
        try {
            const result = yield call(Corredores, response, 6);
            let res =  result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'LISTCORREDORES',
                    data: res.payload
                })
                //Notification('success', messages.asiginspectores.title, data)
            } else {
                yield put({
                    type: 'LISTCORREDORES',
                    data: []
                })
                //Notification('error', messages.asiginspectores.title, data)
            }
        } catch (error) {
            Notification('error', messages.polizas.title, messagesEvent.errorservidor.error)
        }
    })
}
export default function* rootSaga() {
    yield all([
        fork(buscarCorredores),
        fork(listarCorredores)
    ]);
}
