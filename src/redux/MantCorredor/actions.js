import {
	Corredores
} from '../../services/corredor.service';
/*
const ACTIONSEARCH = (data) => ({
	type: 'SEARCHCORREDOR',
	data: data
})

const ACTIONLIST = (data) => ({
	type: 'LISTCORREDORES',
	data: data
})
*/
export const STARTACTIONSEARCH = (data) => ({
	type: '_SEARCHCORREDOR',
	payload: data
})
export const STARTACTIONLIST = (data) => ({
	type: '_LISTCORREDORES',
	payload: data
})
/*
export const STARTACTIONSEARCH = (data) => {
	return (dispatch) => {
		Corredores(data, 1).then(
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
export const STARTACTIONLIST = (data) => {
	return (dispatch) => {
		Corredores(data,6).then(
			res => {
				try {
					if (res.data.response.status.success === false) {
						dispatch(ACTIONLIST([]))
					} else {
						dispatch(ACTIONLIST(res.data.response.payload))
					}
				} catch (e) {
					console.log(e)
				}
			}
		)
	}
}
*/