import axios from 'axios';
import { APIBASE, APILOCAL } from './constants';
import { request } from './request';

const ClasRiesgos = (data = {}, method = '') => {
    const result = request(data,method);
    return axios({
        method: 'POST',
        url: `${APILOCAL}/clasificacion-riesgo`,
        data: result
    })
}

export {
    ClasRiesgos
}