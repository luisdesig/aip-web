import {
	Inspectores
} from '../../services/inspectores.service';
import {
	IngenierosQaGet,
	EmpresaGet
} from '../../services/common.service';
const ACTIONGET = (data) => ({
	type: 'GETINSPECTOR',
	data: data
})
const ACTIONSEARCHINGENIERO = (data) => ({
	type: 'SEARCHINGENIERO',
	data: data
})
const ACTIONSEARCHSUPERVISOR = (data) => ({
	type: 'SEARCHSUPERVISOR',
	data: data
})
const ACTIONSEARCHEMPRESA = (data) => ({
	type: 'SEARCHEMPRESA',
	data: data
})
export const ACTIONCLEANINSPECTOR = () => ({
	type: 'CLEANINSPECTOR',
})
export const STARTACTIONSEARCH = (data) => ({
	type: '_SEARCHINSPECTOR',
	payload: data
})
export const STARTACTIONPOST = (data) => ({
	type: '_POSTINSPECTOR',
	payload: data
})
export const STARTACTIONPUT = (data) => ({
	type: '_UPDATEINSPECTOR',
	payload: data
})
export const STARTACTIONDELETE = (data) => ({
	type: '_DELETEINSPECTOR',
	payload: data
})

export const STARTACTIONGET = (data) => {
	return (dispatch) => {
		Inspectores(data, 1).then(res => {
			try {
				dispatch(ACTIONGET(res.data.response.payload))
			} catch (e) {
				console.log(e)
			}
		})
	}
}

export const STARTACTIONSEARCHSUPERVISOR = (data) => {
	return (dispatch) => {
		IngenierosQaGet(data, 8).then(
			res => {
				try {
					dispatch(ACTIONSEARCHSUPERVISOR(res.data.response.payload))
				} catch (e) {
					console.log(e)
				}
			}
		)
	}
}
export const STARTACTIONSEARCHINGENIERO = (data) => {
	return (dispatch) => {
		IngenierosQaGet(data, 8).then(
			res => {
				try {
					dispatch(ACTIONSEARCHINGENIERO(res.data.response.payload))
				} catch (e) {
					console.log(e)
				}
			}
		)
	}
}
export const STARTACTIONSEARCHEMPRESA = (data) => {
	return (dispatch) => {
		EmpresaGet(data, 7).then(
			res => {
				try {
					dispatch(ACTIONSEARCHEMPRESA(res.data.response.payload))
				} catch (e) {
					console.log(e)
				}
			}
		)
	}
}
