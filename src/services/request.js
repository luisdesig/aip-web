import { getTrace } from '../helpers/utility';
import moment from 'moment';

export function request(payload, method) {
    let trace = {
        serviceId: 'API-SEG',
        consumerId: 'WEBPRIV',
        moduleId: 'module id',
        channelCode: 'web',
        traceId: '125751027100110360156000000000000',
        timestamp: moment().format('YYYY-MM-DD  h:mm:ss a'),
        identity: {
            userId: getTrace(),
            deviceId: 'device id',
            host: 'host ip',
            accesoId: 1,
        },
    };
    const TRACE = Object.assign({},trace);
    TRACE.functionId = method
    const result = {
        'request': {
            'trace': TRACE,
            'payload': payload
        }
    }
    return result
}
export function request2(payload, method) {
    let trace = {
        serviceId: 'API-SEG',
        consumerId: 'WEBPRIV',
        moduleId: 'module id',
        channelCode: 'web',
        traceId: '125751027100110360156000000000000',
        timestamp: moment().format('YYYY-MM-DD  h:mm:ss a'),
        identity: {
            userId: getTrace(),
            deviceId: 'device id',
            host: 'host ip',
            accesoId: 1,
        },
    };
    const TRACE = Object.assign({},trace);
    TRACE.functionId = method
    const result = {
        'request': {
            'trace': TRACE,
            'payload': payload
        }
    }
    return result
}
