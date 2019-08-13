import axios from 'axios';
import { APIBASE, APILOCAL } from './constants';
import { request } from './request';

const AsigInspector = (data = {}, method = '') => {
  const result = request(data, method);
  return axios({
    method: 'POST',
    url: `${APILOCAL}/prioridad-inspector`,
    data: result
  })
}

export {
  AsigInspector
}