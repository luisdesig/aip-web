export const ACTIONREGISTERGARANTIA = (data) => ({
	type: 'REGISTERGARANTIA',
	data: data
})
export const ACTIONDELETEGARANTIA = (id) => ({
	type: 'DELETEGARANTIA',
	id: id
})
export const ACTIONCLEANINSPECCION = () => ({
    type: 'CLEANINSPECCION'
})
export const ACTIONCLEANENDOSO = () => ({
    type: 'ACTIONCLEANENDOSO'
})
export const ACTIONCHANGEVALUES = (key, value) => ({
	type: 'CHANGEVALUESINSPECCION',
	key,value
})
export const ACTIONVALUESINMUEBLE = (id) => ({
	type: 'VALUESINMUEBLE',
	id
})
export const ACTIONCHANGEVALORDECLARADO = (data) => ({
	type: 'CHANGEVALORDECLARADO',
	data
})
export const STARTACTIONSEARCH = (data) => ({
	type: 'SEARCHSOLICITUD',
	payload: data
})
export const STARTACTIONPOST = (data) => ({
	type: 'POSTSOLICITUD',
	payload: data
})
export const STARTACTIONPUT = (data) => ({
	type: 'UPDATESOLICITUD',
	payload: data
})
export const STARTACTIONDELETE = (data) => ({
	type: 'DELETESOLICITUD',
	payload: data
})
export const STARTACTIONSOLICITUDPOLIZA = (data) => ({
	type: 'GETSOLICITUDPOLIZA',
	payload: data
})
export const STARTACTIONINMUEBLEINSPECCION = (data) => ({
	type: 'GETINMUEBLEPOLIZA',
	payload: data
})
export const STARTACTIONSOLICITUDGARANTIA = (data) => ({
	type: '_SOLICITUDGARANTIA',
	payload: data
})

