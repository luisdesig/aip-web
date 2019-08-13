import axios from 'axios';
import { APIBASE, APILOCAL } from './constants';
import { request } from './request';

const BandInspeccion = (data = {}, method = '') => {
    const result = request(data,method);
    return axios({
        method: 'POST',
        url: `${APILOCAL}/bandeja-inspeccion`,
        data: result
    })
}

export {
    BandInspeccion,
}