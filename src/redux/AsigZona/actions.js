export const exportAsigZona = () => ({
	type: 'EXPORTASIGZONA'
})
export const STARTACTIONSEARCH = (data) => ({
	type: '_SEARCHASIGZONA',
	payload: data
})
export const STARTACTIONPOST = (data) => ({
	type: '_POSTASIGZONA',
	payload: data
})
export const STARTACTIONPUT = (id, data) => {
	data.ideriesgozona = id;
	return ({
		type: '_UPDATEASIGZONA',
		payload: data
	})
}
export const STARTACTIONDELETE = (id) => {
	const data = { 'ideriesgozona': id }
	return ({
		type: '_DELETEASIGZONA',
		payload: data
	})
}