import axios from 'axios';
import { APIBASE, APILOCAL } from './constants';
import { request } from './request';

const RolesGet = (data = {}, method = '') => {
    const result = request(data, method) 
    return axios({
        method: 'POST',
        url: `${APIBASE}/usuario`,
        data: result
    })
}

export {
    RolesGet
}