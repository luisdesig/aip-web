import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { Media } from '../../services/media.service';

export function* comboGrupoPregunta() {
    yield takeEvery('GETGRUPOPREGUNTA', function* ({ payload }) {
        const data = payload
        try {
            const res = yield call(Media, data, 7);
            const result = res.data.response;
            if (result.status.success === true) {
                yield put({
                    type: 'COMBOGRUPOPREGUNTA',
                    data: result.payload
                })
            } else {
                console.log('error')
            }
        } catch (error) {
            console.log(error)
        }

    })
}
export function* guardarMedia() {
    yield takeEvery('POSTMEDIA', function* ({ payload }) {
        const data = payload
        try {
            const res = yield call(Media, data, 3);
            const result = res.data.response;
            console.log(result);
            if (result.status.success === true) {

            } else {
                console.log('error')
            }
        } catch (error) {

        }
    })
}

export default function* rootSaga() {
    yield all([
        comboGrupoPregunta(),
        guardarMedia()
    ])
}