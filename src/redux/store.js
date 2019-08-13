import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import thunk from 'redux-thunk';

/** Reducers  */
import inspectoresReducers from './MantInspector/reducers';
import rolesReducers from './MantRoles/reducers';
import corredoresReducers from './MantCorredor/reducers';
import zonasReducers from './MantZona/reducers';
import polizasReducers from './MantPolizaEstrategica/reducers';
import garantiasReducers from './MantGarantia/reducers';
import clasRiesgosReducers from './ClasRiesgo/reducers';
import asigzonasReducers from './AsigZona/reducers';
import asiginspectoresReducers from './AsigInspector/reducers';
import asiginspectorescReducers from './AsigInspC/reducers';
import bandPolizasReducers from './BandPoliza/reducers';
import bandRevisionInformeReducers from './RevisionInforme/reducers';
import authReducers from './Auth/reducers';
import commonReducers from './Common/reducers';
import bandejainspeccionesReducers from './BandInspeccion/reducers';
import clientesReducers from './Clientes/reducers';
import bandejaasignacionesReducers from './BandAsignacion/reducers';
import categoriaReducers from './Categorias/reducers';
import cuestionarioReducers from './Cuestionario/reducers';
import mediaReducers from './Media/reducers';
import scoringReducers from './Scoring/reducers';
import cuestionarioTrabajadoReducers from './CuestionarioTrabajado/reducers';
import garantiaRecInformeReducers from './GarantiaRecomendacion/reducers';
import Reactotron from '../ReactotronConfig';

const sagaMidleware = createSagaMiddleware();

const midleware = [thunk, sagaMidleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    auth: authReducers,
    inspectores: inspectoresReducers,
    roles: rolesReducers,
    zonasgeograficas: zonasReducers,
    corredores: corredoresReducers,
    polizasestrategicas: polizasReducers,
    garantias: garantiasReducers,
    clasriesgos: clasRiesgosReducers,
    asigzonas: asigzonasReducers,
    asiginspectores: asiginspectoresReducers,
    asiginspectorescorredor: asiginspectorescReducers,
    bandpolizas: bandPolizasReducers,
    revisioninformes: bandRevisionInformeReducers,
    bandejainspecciones: bandejainspeccionesReducers,
    bandejaasignaciones: bandejaasignacionesReducers,
    clientes: clientesReducers,
    common: commonReducers,
    categorias: categoriaReducers,
    cuestionarios: cuestionarioReducers,
    medias: mediaReducers,
    scoring: scoringReducers,
    cuestionarioTrabajados: cuestionarioTrabajadoReducers,
    garantiaRecInforme: garantiaRecInformeReducers
  }),
  composeEnhancers(applyMiddleware(...midleware), Reactotron.createEnhancer()),
);
sagaMidleware.run(rootSaga);
export { store };
