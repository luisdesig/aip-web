/*
const ACTIONPOST = (data) => ({
	type: 'POSTPOLIZAESTRATEGICA',
	data: data
})
const ACTIONDELETE = (id) => ({
	type: 'DELETEPOLIZAESTRATEGICA',
	id: id
})
const ACTIONPUT = (id,data) => ({
	type: 'UPDATEPOLIZAESTRATEGICA',
	id: id,
	data: data
})
const ACTIONSEARCH = (data) => ({
	type: 'SEARCHPOLIZAESTRATEGICA',
	data: data
})
*/
export const exportPolizaEstrategica = () => ({
	type: 'EXPORTPOLIZAESTRATEGICA'
})
export const importPolizaEstrategica = (data) => ({
	type: 'IMPORTPOLIZAESTRATEGICA',
	data
})
export const STARTACTIONSEARCH = (data) => ({
	type: '_SEARCHPOLIZAESTRATEGICA',
	payload: data
})
export const STARTACTIONPOST = (data) => ({
	type: '_POSTPOLIZAESTRATEGICA',
	payload: data
})
export const STARTACTIONPUT = (id,data) => {
	data.idepolizaestrategica = id;
	return ({
		type: '_PUTPOLIZAESTRATEGICA',
		payload: data
	})
}
export const STARTACTIONDELETE = (id) => {
	let data = { 'idepolizaestrategica': id }
	return ({
		type: '_DELETEPOLIZAESTRATEGICA',
		payload: data
	})
}
/*
export const STARTACTIONSEARCH = (data) => {
	return (dispatch) => {
		PolizaEstrategica(data,1).then(
			res => {
				try{
					if(res.data.response.status.success === false){
						dispatch(ACTIONSEARCH([]))
					}else{
						dispatch(ACTIONSEARCH(res.data.response.payload))
					}
				}catch(e){
					console.log(e)
				}
			}
		)
	}
}
export const STARTACTIONPOST = (data) => {
	return (dispatch) => {
		PolizaEstrategica(data,3).then( res => {
			try {
				dispatch(ACTIONPOST())
			} catch (e) {
				console.log(e)
			}
		})
	}
}
export const STARTACTIONPUT = (id,data) => {
	data.idepolizaestrategica = id;
	return (dispatch) => {
		PolizaEstrategica(data,4).then(
			res => {
				try{
					dispatch(ACTIONPUT(id, data))
				}catch(e){
					console.log(e)
				}
			}
		)
	}
}
export const STARTACTIONDELETE = (id) => {
	let data = { 'idepolizaestrategica': id }
	return (dispatch) => {
		PolizaEstrategica(data, 5).then(
			res => {
				try{
					dispatch(ACTIONDELETE(id))
				}catch(e){
					console.log(e)
				}
			}
		)
	}
}

*/
