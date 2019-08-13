import {
	ParametricasGet,
	ZonaGet,
	RiesgosGet,
	UbigeoZonaGet,
	UbigeoZonaFreeGet,
	GruposGarantiaGet,
	GirosOcupacion,
	IngenierosQaGet
} from '../../services/common.service';
import { METHODS } from '../../services/constants';

const ACTIONGETZONA = (data) => ({
	type: 'GETZONA',
	data: data
})
const ACTIONGETZONAOCUPADA = (data) => ({
	type: 'GETZONAOCUPADA',
	data: data
})
const ACTIONGETRIESGOS = (data) => ({
	type: 'GETRIESGOS',
	data: data
})

const ACTIONGETPARAMETRICA = (data) => ({
	type: 'GETPARAMETRICAS',
	data: data
})
const ACTIONGETUBIGEOZONA = (data) => ({
	type: 'GETUBIGEOZONA',
	data: data
})
const ACTIONGETGRUPOSGARANTIA = (data) => ({
	type: 'GRUPOSGARANTIA',
	data: data
})
const ACTIONGETGIROSOCUPACION = (data) => ({
	type: 'GIROSOCUPACION',
	data: data
})
const ACTIONGETINGENIEROQA = (data) => ({
	type: 'INGENIEROQA',
	data: data
})
const ACTIONMESSAGEERROR = (info) => ({
	type: 'NOTCONECTIONSERVER',
	info: info
})

export const STARTACTIONZONA = () => {
	return (dispatch) => {
		RiesgosGet({}, METHODS.listarriesgo).then( res => {
			try{
				if(res.data.response.payload === null){
					dispatch(ACTIONGETRIESGOS([]))
				}else{
					dispatch(ACTIONGETRIESGOS(res.data.response.payload)) 
				}
			}catch(e){
				console.log(e)
			}
		})
	}
}

export const STARTACTIONRIESGOS = () => {
	return (dispatch) => {	
		ZonaGet({}, METHODS.listarzonas).then( res => {
			try{
				if(res.data.response.payload === null){
					dispatch(ACTIONGETZONA([]))
				}else{
					dispatch(ACTIONGETZONA(res.data.response.payload))
				}
			}catch(e){
				console.log(e)
			}
		})
	}
}

export const STARTACTIONZONASOCUPADAS = () => {
	return (dispatch) => {	
		ZonaGet({},7).then( res => {
			try{
				if(res.data.response.payload === null){
					dispatch(ACTIONGETZONAOCUPADA([]))
				}else{
					dispatch(ACTIONGETZONAOCUPADA(res.data.response.payload))
				}
			}catch(e){
				console.log(e)
			}
		})
	}
}

export const STARTACTIONGETPARAMETRICAS = () => {
	return (dispatch) => {
		ParametricasGet({}, METHODS.listarparametros).then( res => {
			try{
				if(res.data.response.payload === null){
					dispatch(ACTIONGETPARAMETRICA([]))
				}else{
					dispatch(ACTIONGETPARAMETRICA(res.data.response.payload))
				}
			}catch(e){
				console.log(e)
			}
		})
	}
}

export const STARTACTIONGETUBIGEOZONA = () => {
	return (dispatch) => {
		UbigeoZonaGet({}, METHODS.listarubigeo).then( res => {
			try{
				if(res.data.response.payload === null){
					dispatch(ACTIONGETUBIGEOZONA([]))
				}else{
					dispatch(ACTIONGETUBIGEOZONA(res.data.response.payload))
				}
			}catch(e){
				console.log(e)
			}
		})
	}
}

export const STARTACTIONGETUBIGEOZONAFREE = () => {
	return (dispatch) => {
		UbigeoZonaFreeGet({}, METHODS.listarubigeofree).then( res => {
			try{
				if(res.data.response.payload === null){
					dispatch(ACTIONGETUBIGEOZONA([]))
				}else{
					dispatch(ACTIONGETUBIGEOZONA(res.data.response.payload))
				}
			}catch(e){
				console.log(e)
			}
		})
	}
}

export const STARTACTIONGETGRUPOSGARANTIA = () => {
	return (dispatch) => {
		GruposGarantiaGet({},METHODS.listargarantias).then( res => {
			try{
				if(res.data.response.payload === null){
					dispatch(ACTIONGETGRUPOSGARANTIA([]))
				}else{
					dispatch(ACTIONGETGRUPOSGARANTIA(res.data.response.payload))
				}
			}catch(e){
				console.log(e)
			}
		})
	}
}

export const STARTACTIONGETGIROSNEGOCIOS = () => {
	return (dispatch) => {
		GirosOcupacion({}, METHODS.listargironegocioocupacion).then( res => {
			try{
				if(res.data.response.payload === null){
					dispatch(ACTIONGETGIROSOCUPACION([]))
				}else{
					dispatch(ACTIONGETGIROSOCUPACION(res.data.response.payload))
				}
			}catch(e){
				console.log(e)
			}
		})
	}
}

export const STARTACTIONGETINGENIEROQA = () => {
	return (dispatch) => {
		IngenierosQaGet({}, METHODS.listaringenieroqa).then( res => {
			try{
				if(res.data.response.payload === null){
					dispatch(ACTIONGETINGENIEROQA([]))
				}else{
					dispatch(ACTIONGETINGENIEROQA(res.data.response.payload))
				}
			}catch(e){
				console.log(e)
			}
		})
	}
}

