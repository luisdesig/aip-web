import axios from 'axios';
import { APIBASE, APILOCAL } from './constants';
import { request } from './request';

const Garantias = (data = {}, method = '') => {
    const result = request(data, method) 
    return axios({
        method: 'POST',
        url: `${APILOCAL}/garantia-rec`,
        data: result
    })
}

export {
    Garantias
}