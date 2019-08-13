import axios from 'axios';
import { APIBASE, APILOCAL } from './constants';
import { request2, request } from './request';

const ParametricasGet = (data = {}, method = '') => {
  const result = request2(data, method);
  return axios({
    method: 'POST',
    url: `${APIBASE}/parametros`,
    data: result,
  });
};

const ZonaGet = (data = {}, method = '') => {
    const result = request(data, method);
    return axios({
        method: 'POST',
        url: `${APIBASE}/zona`,
        data: result
    })
}


const RiesgosGet = (data = {}, method = '') => {
  const result = request2(data, method);
  return axios({
    method: 'POST',
    url: `${APIBASE}/riesgo`,
    data: result,
  });
};

const UbigeoZonaGet = (data = {},method = '') => {
    const result = request2(data, method);
    return axios({
        method: 'POST',
        url: `${APILOCAL}/ubigeo`,
        data: result
    })
}


const UbigeoZonaFreeGet = (data = {}, method) => {
  const result = request2(data, method);
  return axios({
    method: 'POST',
    url: `${APIBASE}/zonageografica`,
    data: result,
  });
};

const MaestrasGet = (data = {}, method = '') => {
  const result = request2(data, method);
  return axios({
    method: 'POST',
    url: `${APIBASE}/zonageografica`,
    data: result,
  });
};

const SupervisorGet = (data = {}, method = '') => {
  const result = request2(data, method);
  return axios({
    method: 'POST',
    url: `${APIBASE}/zonageografica`,
    data: result,
  });
};

const SupervisorEmpresaGet = (data = {}, method = '') => {
  const result = request2(data, method);
  return axios({
    method: 'POST',
    url: `${APIBASE}/zonageografica`,
    data: result,
  });
};

const GruposGarantiaGet = (data = {}, method = '') => {
  const result = request2(data, method);
  return axios({
    method: 'POST',
    url: `${APIBASE}/garantia`,
    data: result,
  });
};

const GirosOcupacion = (data = {}, method = '') => {
  const result = request2(data, method);
  return axios({
    method: 'POST',
    url: `${APILOCAL}/giro-ocupacion`,
    data: result,
  });
};

const IngenierosQaGet = (data={}, method= '') =>{
    const result = request2(data, method)
    return axios({
        method: 'POST',
        url: `${APIBASE}/ingenieroqa`,
        data: result
    })
}
const EmpresaGet = (data={}, method= '') =>{
    const result = request(data, method)
    return axios({
        method: 'POST',
        url: `${APIBASE}/supervisor-empresa`,
        data: result
    })
}

export {
  MaestrasGet,
  SupervisorGet,
  SupervisorEmpresaGet,
  ParametricasGet,
  ZonaGet,
  RiesgosGet,
  UbigeoZonaGet,
  UbigeoZonaFreeGet,
  GruposGarantiaGet,
  GirosOcupacion,
  IngenierosQaGet,
  EmpresaGet,
};