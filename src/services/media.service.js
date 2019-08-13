import axios from 'axios';
import { APIBASE, APILOCAL } from './constants';
import { request } from './request';

const Media = (data = {}, method = '') => {
    const result = request(data, method)
    return axios({
        method: 'POST',
        url: `${APIBASE}/media`,
        data: result
    })
}

export {
    Media
}