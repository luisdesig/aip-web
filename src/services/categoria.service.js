import { request } from './request';
import axios from 'axios';
import { APILOCAL, APIBASE, HTTP_METHOD } from './constants';

const CategoriaService = {
  all: async payload => {
    const data = request(payload, HTTP_METHOD.GET);
    const responseBody = await axios({
      method: 'POST',
      url: `${APIBASE}/categoria`,
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
  descargarInspeccion: async payload => {
    const data = request(payload, HTTP_METHOD.GET);
    const responseBody = await axios({
      method: 'POST',
      url: `${APIBASE}/obtReporte`,
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
};
export default CategoriaService;
