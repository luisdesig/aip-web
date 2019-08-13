import { request } from './request';
import axios from 'axios';
import { APIBASE } from './constants';
import { APILOCAL, MyTypesToExternalTypesMap, Controls } from './constants';
import Reactotron from 'reactotron-react-js';
import _ from 'lodash';

const HTTP_METHOD_LISTAR_GARANTIAREC_INFORME = 15;
const HTTP_METHOD_CREAR_GARANTIAREC_INFORME  = 16;
const HTTP_METHOD_ACTUALIZAR_GARANTIAREC_INFORME  = 17;
const HTTP_METHOD_ELIMINAR_GARANTIAREC_INFORME  = 18;
const HTTP_METHOD_PROCLOTE_GARANTIAREC_INFORME  = 19;

const GarantiaRecInformeService = {
  all: async payload => {
    console.log("entro ALLL");
    const data = request(payload, HTTP_METHOD_LISTAR_GARANTIAREC_INFORME);
    const responseBody = await axios({
      method: 'POST',
      url: `${APIBASE}/garantia-rec`,
      data,
    });
    if (!responseBody || !responseBody.data || !responseBody.data.response) {
      return [];
    }
    if (!responseBody.data.response.status.success) {
      return [];
    }
    return responseBody.data.response.payload || [];
  },
  /*crear: async (payload) => {    
    //Reactotron.log(`JSON.stringify(payload): ${JSON.stringify(payload)}`);
    const data = request(payload, HTTP_METHOD_CREAR_GARANTIAREC_INFORME);
    const responseBody = await axios({
      method: 'POST',
      url: `${APIBASE}/garantia-rec`,
      data,
    });
    if (!responseBody || !responseBody.data || !responseBody.data.response) {
      return false;
    }
    if (!responseBody.data.response.status.success) {
      return false;
    }
    return true;
  },
  actualizar: async (payload) => {    
    //Reactotron.log(`JSON.stringify(payload): ${JSON.stringify(payload)}`);
    const data = request(payload, HTTP_METHOD_ACTUALIZAR_GARANTIAREC_INFORME);
    const responseBody = await axios({
      method: 'POST',
      url: `${APIBASE}/garantia-rec`,
      data,
    });
    if (!responseBody || !responseBody.data || !responseBody.data.response) {
      return false;
    }
    if (!responseBody.data.response.status.success) {
      return false;
    }
    return true;
  },
  eliminar: async (payload) => {    
    //Reactotron.log(`JSON.stringify(payload): ${JSON.stringify(payload)}`);
    const data = request(payload, HTTP_METHOD_ELIMINAR_GARANTIAREC_INFORME);
    const responseBody = await axios({
      method: 'POST',
      url: `${APIBASE}/garantia-rec`,
      data,
    });
    if (!responseBody || !responseBody.data || !responseBody.data.response) {
      return false;
    }
    if (!responseBody.data.response.status.success) {
      return false;
    }
    return true;
    return {...payload, tipooperacion:'E'};
  },*/
  procesarLote: async (payload) => {    
    //Reactotron.log(`JSON.stringify(payload): ${JSON.stringify(payload)}`);
    const array = payload.filter(item=>item.tipooperacion);
    const data = request(array, HTTP_METHOD_PROCLOTE_GARANTIAREC_INFORME);
    const responseBody = await axios({
      method: 'POST',
      url: `${APIBASE}/garantia-rec`,
      data,
    });
    if (!responseBody || !responseBody.data || !responseBody.data.response) {
      return false;
    }
    if (!responseBody.data.response.status.success) {
      return false;
    }
    return true;
  }
};
export default GarantiaRecInformeService;
