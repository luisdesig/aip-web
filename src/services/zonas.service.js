import axios from 'axios';
import { APIBASE,APILOCAL } from './constants';
import { request } from './request';

const Zonas = (data = {}, method = '') => {
    const result = request(data, method) 
    return axios({
        method: 'POST',
        url: `${APILOCAL}/zonageografica`,
        data: result
    })
}

export {
    Zonas
}