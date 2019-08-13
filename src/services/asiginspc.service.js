import axios from 'axios';
import { APIBASE, APILOCAL } from './constants';
import { request } from './request';

const AsigInspC = (data = {}, method = '') => {
    const result = request(data, method)
    return axios({
        method: 'POST',
        url: `${APILOCAL}/corredor-inspector`,
        data: result
    })
}

export {
    AsigInspC
}