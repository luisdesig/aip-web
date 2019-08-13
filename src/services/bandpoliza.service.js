import axios from 'axios';
import { APIBASE, APILOCAL } from './constants';
import { request } from './request';

const BandPoliza = (data = {}, method = '') => {
  const result = request(data, method);
  return axios({
    method: 'POST',
    url: `${APILOCAL}/poliza-renovar`,
    data: result,
  });
};

export { BandPoliza };
