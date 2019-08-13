export const ACTIONCHANGEESTADOCORREDOR = (data) => ({
	type: 'ESTADOCORREDOR',
	data:data
})
export const ACTIONASIGNARCORREDOR = (data) => ({
	type: 'ASIGNARCORREDOR',
	data: data
})
export const CLEANDATA = () => ({
	type: 'CLEANDATA'
})
export const exportAsigInspC = () => ({
	type: 'EXPORTASIGINSPC'
})
export const importAsigInspC = (data) => ({
	type: 'IMPORTASIGINSPC',
	data: data
})
export const STARTACTIONSEARCH = (data) => ({
	type: '_SEARCHASIGINSPC',
	payload: data
})
export const STARTACTIONGET = (data) => ({
	type: '_GETASIGINSPC',
	payload: data
})
export const STARTACTIONPOST = (data) => ({
	type: '_POSTASIGINSPC',
	payload: data
})
export const STARTACTIONPUT = (data) => ({
	type: '_UPDATEASIGINSPC',
	payload: data
})
export const STARTACTIONDELETE = (id) => {
	const data = { 'idecorredorinspector': id }
	return ({
		type: '_DELETEASIGINSPC',
		payload: data
	})
}
export const STARTACTIONCORREDORINSPECTORFREE = (data) => ({
	type: '_CORREDORINSPECTORFREE',
	payload: data
})
export const STARTACTIONCORREDORINSPECTOR = (data) => ({
	type: '_CORREDORINSPECTOR',
	payload: data
})
export const STARTACTIONPUTGRUPAL = (data) => ({
	type: '_UPDATEGRUPOASIGINSPC',
	payload: data
})