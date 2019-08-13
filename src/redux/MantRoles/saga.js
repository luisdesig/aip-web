import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { RolesGet } from '../../services/roles.service';
import { Notification } from '../../components/Notifications/Notifications';
import { messagesEvent, messages } from '../../util/messages';
//import { } from './actions';
export function* buscarRoles() {
    yield takeEvery('_SEARCHROLES', function* ({ payload }) {
        let response = payload;
        yield put({
            type: 'CARGANDOROLES',
        })
        try {
            const result = yield call(RolesGet, response, 7);
            let res =  result.data.response
            if (res.status.success === true) {
                yield put({
                    type: 'SEARCHROLES',
                    data: res.payload
                })
                //Notification('success', messages.asiginspectores.title, data)
            } else {
                yield put({
                    type: 'SEARCHROLES',
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
        fork(buscarRoles)
    ]);
}
