import axios from 'axios';
import { APIBASE, APILOCAL } from './constants';
import { request } from './request';

const Clientes = (data = {}, method = '') => {
    const result = request(data, method);
    return axios({
        method: 'POST',
        url: `${APILOCAL}/cliente`,
        data: result
    })
}
export {
    Clientes
}