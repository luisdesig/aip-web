import {
	Zonas
} from '../../services/zonas.service';
import { message } from 'antd';
import { messages } from '../../util/messages';

const types = {
	ERROR_ADD_ZONA: 'ERROR_ADD_ZONA'
}
/*
const ACTIONPOST = () => ({
	type: 'POSTZONA'
})
const ACTIONDELETE = (id) => ({
	type: 'DELETEZONA',
	id: id
})
const ACTIONPUT = (id, data) => ({
	type: 'UPDATEZONA',
	id: id,
	data: data
})
const ACTIONSEARCH = (data) => ({
	type: 'SEARCHZONAGEOGRAFICA',
	data: data
})
const ACTIONZONASFREE = (data) => ({
	type: 'ZONASFREE',
	data: data
})
const ACTIONLISTZONAS = (data) => ({
	type: 'LISTZONAS',
	data: data
})

const ACTION_ERROR_ADD_ZONA = () => ({
	type: types.ERROR_ADD_ZONA,
})
*/
export const STARTACTIONSEARCH = (data) => ({
	type: '_SEARCHZONAGEOGRAFICA',
	payload: data
})
export const STARTACTIONPOST = (data) => ({
	type: '_POSTZONA',
	payload: data
})
export const STARTACTIONPUT = (id, data) => {
	let newData = {};
	newData.ideubigeozona = id;
	newData.idezona = data.idezona.idezona;
	newData.ubigeos = data.ubigeos;
	return ({
		type: '_UPDATEZONA',
		payload: newData
	})
}
export const STARTACTIONDELETE = (id) => {
	const data = { ideubigeozona: id }
	return ({
		type: '_DELETEZONA',
		payload: data
	})
}
export const STARTACTIONZONASFREE = (data) => ({
	type: '_ZONASFREE',
	payload: data
})
export const STARTACTIONLISTZONAS = (data) => ({
	type: '_LISTZONAS',
	payload: data
})
/*
export const STARTACTIONSEARCH = (data) => {
	return (dispatch) => {
		Zonas(data, 1).then(
			res => {
				try {
					if (res.data.response.status.success === false) {
						dispatch(ACTIONSEARCH([]))
					} else {
						dispatch(ACTIONSEARCH(res.data.response.payload))
					}
				} catch (e) {
					console.log(e)
				}
			}
		)
	}
}
export const STARTACTIONPOST = (data) => {
	return async (dispatch) => {
		let zonas = await Zonas(data, 3);
		if (zonas.data.response.status.success) {
			dispatch(ACTIONPOST())
		} else {
			message.error(messages.zonasgeograficas.error_add_zone_geography)
		}
	}
}
export const STARTACTIONPUT = (id, data) => {
	let newData = {};
	newData.ideubigeozona = id;
	newData.idezona = data.idezona.idezona;
	newData.ubigeos = data.ubigeos;
	return (dispatch) => {
		Zonas(newData, 4).then(
			res => {
				try {
					dispatch(ACTIONPOST())
				} catch (e) {
					console.log(e)
				}
			}
		)
	}
}
export const STARTACTIONDELETE = (id) => {
	const data = { ideubigeozona: id }
	return (dispatch) => {
		Zonas(data, 5).then(
			res => {
				try {
					dispatch(ACTIONDELETE(id))
				} catch (e) {
					console.log(e)
				}
			}
		)
	}
}
export const STARTACTIONZONASFREE = (data) => {
	return (dispatch) => {
		Zonas({}, 8).then(res => {
			try {
				dispatch(ACTIONZONASFREE(res.data.response.payload))
			} catch (e) {
				console.log(e)
			}
		})
	}
}
export const STARTACTIONLISTZONAS = (data) => {
	return (dispatch) => {
		Zonas(data, 9).then(
			res => {
				try {
					if (res.data.response.status.success === false) {
						dispatch(ACTIONLISTZONAS([]))
					} else {
						dispatch(ACTIONLISTZONAS(res.data.response.payload))
					}
				} catch (e) {
					console.log(e)
				}
			}
		)
	}
}
*/
