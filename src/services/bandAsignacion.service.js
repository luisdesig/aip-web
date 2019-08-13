import axios from 'axios';
import { APIBASE, APILOCAL } from './constants';
import { request } from './request';
import { getToken } from '../helpers/utility';

const BandAsignacion = (data = {}, method = '') => {
  const result = request(data, method);

  return axios({
    method: 'POST',
    headers: { Authorization: getToken() },
    url: `${APILOCAL}/bandeja-asignacion`,
    data: result,
  });
};

export { BandAsignacion };
