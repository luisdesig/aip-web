import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { Scoring, ScoringAIP } from '../../services/scoring.service';

export function* getScoring() {
    yield takeEvery('GETSCORING', function* ({ data }) {
        const dataScoring = data
        try {
            const resAIP = yield call(ScoringAIP, dataScoring, 2);
            const data = resAIP.data.response.payload;
            yield put({
                type: 'CARGANDO',
                loading: true,
                
            })
            try {
                const res = yield call(Scoring, data)
                if (res.data.length > 0) {
                    yield put({
                        type: 'DATASCORING',
                        data: res.data,
                        loading: false
                    })
                } else {
                    yield put({
                        type: 'CARGADO',
                        loading: false
                    })
                }
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }

    })
}

export default function* rootSaga() {
    yield all([
        getScoring()
    ])
}