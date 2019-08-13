import axios from 'axios';
import { APILOCAL, APIBASE } from './constants';
import { request } from './request';

const CONSULTAR_METHOD = 1;
const CANCELAR_METHOD = 2;
const REPROGRAMAR_METHOD = 3;
const RECHAZAR_METHOD = 4;
const FINALIZAR_METHOD = 5;
const OBT_INFORME = 6;

const RevisionInforme = {
  consultar: async data => {
    const result = request(data, CONSULTAR_METHOD);
    return await axios({
      method: 'POST',
      url: `${APIBASE}/revision-informe`,
      data: result,
    });
  },
  cancelar: async data => {
    const result = request(data, CANCELAR_METHOD);
    return await axios({
      method: 'POST',
      url: `${APIBASE}/revision-informe`,
      data: result,
    });
  },
  reprogramar: async data => {
    const result = request(data, REPROGRAMAR_METHOD);
    return await axios({
      method: 'POST',
      url: `${APIBASE}/revision-informe`,
      data: result,
    });
  },
  rechazar: async data => {
    const result = request(data, RECHAZAR_METHOD);
    return await axios({
      method: 'POST',
      url: `${APIBASE}/revision-informe`,
      data: result,
    });
  },
  finalizar: async data => {
    const result = request(data, FINALIZAR_METHOD);
    return await axios({
      method: 'POST',
      url: `${APIBASE}/revision-informe`,
      data: result,
    });
  },
  obtInforme: async data => {
    const result = request(data, OBT_INFORME);
    return await axios({
      method: 'POST',
      url: `${APIBASE}/obtReporte`,
      data: result,
    });
  },
};

export default RevisionInforme;
