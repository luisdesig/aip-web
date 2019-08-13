import axios from 'axios';
import { APIBASE, APILOCAL } from './constants';
import { request } from './request';

const AsigZona = (data = {}, method = '') => {
    const result = request(data, method);
    return axios({
        method: 'POST',
        url: `${APILOCAL}/riesgo-zona`,
        data: result
    })
}

export {
    AsigZona
}