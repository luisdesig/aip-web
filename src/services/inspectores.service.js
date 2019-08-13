import axios from 'axios';
import { APIBASE, APILOCAL } from './constants';
import { request } from './request';
import Reactotron from 'reactotron-react-js';

const Inspectores = (data = {}, method = '') => {
  Reactotron.log('APILOCAL', APILOCAL);
  const result = request(data, method);
  return axios({
    method: 'POST',
    url: `${APILOCAL}/inspector`,
    data: result,
  });
};

export { Inspectores };
