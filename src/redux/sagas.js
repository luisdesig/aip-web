import { all } from 'redux-saga/effects';
import authSagas from './Auth/saga';
import inspectoresSagas from './MantInspector/saga';
import rolesSagas from './MantRoles/saga';
import zonasSagas from './MantZona/saga';
import corredoresSagas from './MantCorredor/saga';
import garantiaRecSagas from './MantGarantia/saga';
import polizaEstrategicaSagas from './MantPolizaEstrategica/saga';
import clasRiesgoSagas from './ClasRiesgo/saga';
import asigZonaSagas from './AsigZona/saga';
import asigInspectorSagas from './AsigInspector/saga';
import asigInspCSagas from './AsigInspC/saga';
import bandPolizaSagas from './BandPoliza/sagas';
import bandInspeccionSagas from './BandInspeccion/sagas';
import bandAsignacionSagas from './BandAsignacion/saga';
import scoringSagas from './Scoring/saga';
import mediaSagas from './Media/saga';

export default function* rootSaga(getState){
    yield all([
        authSagas(),
        rolesSagas(),
        inspectoresSagas(),
        corredoresSagas(),
        zonasSagas(),
        polizaEstrategicaSagas(),
        garantiaRecSagas(),
        clasRiesgoSagas(),
        asigZonaSagas(),
        asigInspectorSagas(),
        asigInspCSagas(),
        bandPolizaSagas(),
        scoringSagas(),
        mediaSagas(),
        bandInspeccionSagas(),
        bandAsignacionSagas()
    ])
}