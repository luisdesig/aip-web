import {
	Garantias
} from '../../services/garantia.service';
const ACTIONGETSUBGARANTIA = (data) => ({
	type: 'GETSUBGARANTIA',
	data
})
export const ACTIONCLEANINMUEBLES = () => ({
	type: 'CLEANINMUEBLES'
})
export const ACTIONCLENGARANTIASREC= () => ({
	type: 'CLEANGARANTAISREC'
})
export const STARTACTIONSEARCH = (data) => ({
	type: '_SEARCHGARANTIA',
	payload: data
})
export const STARTACTIONPOST = (data) => ({
	type: '_POSTGARANTIA',
	payload: data
})
export const STARTACTIONPUT = (id, data) => {
	data.idegarantiarec = id;
	return ({
		type: '_UPDATEGARANTIA',
		payload: data
	})
}
export const STARTACTIONDELETE = (id) => {
	const data = { 'idegarantiarec': id }
	return ({
		type: '_DELETEGARANTIA',
		payload: data
	})
}
export const STARTACTIONGARANTIAPRIORIDAD = (id) => {
	const data = { idesubgrupogarantia: id };
	return ({
		type: '_GARANTIAPRIORIDAD',
		payload: data
	})
}
export const STARTACTIONGETSUBGARANTIA = (data) => {
	return (dispatch) => {
		Garantias(data, 8).then(
			res => {
				try {
					if (res.data.response.status.success === false) {
						dispatch(ACTIONGETSUBGARANTIA([]))
					} else {
						dispatch(ACTIONGETSUBGARANTIA(res.data.response.payload))
					}
				} catch (e) {
					console.log(e)
				}
			}
		)
	}
}
