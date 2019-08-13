import axios from 'axios';
import { APIBASE } from './constants';
import { request } from './request';

const Corredores = (data = {}, method = '') => {
    const result = request(data, method);
    return axios({
        method: 'POST',
        url: `${APIBASE}/corredor`,
        data: result,
    })
}
export {
    Corredores
}