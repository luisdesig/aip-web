import {
	Media
} from '../../services/media.service';

const ACTIONGETMEDIA = (data) => ({
	type: 'GETMEDIA',
	data: data
})
export const getGrupoPregunta = (payload) => ({
	type: 'GETGRUPOPREGUNTA',
	payload: payload
})
export const addComentario = (payload) => ({
	type: 'ADDCOMENTARIO',
	payload: payload
})
export const deleteComentario = (id) => ({
	type: 'DELETECOMENTARIO',
	id: id
})
export const updateComentario = (payload) => ({
	type: 'UPDATECOMENTARIO',
	payload: payload
})
export const deleteImage = (id) => ({
	type: 'DELETEIMAGE',
	id: id
})
export const STARTACTIONPOSTMEDIA = (payload) =>({
	type: 'POSTMEDIA',
	payload: payload
})
export const STARTACTIONGETMEDIA = (data) => {
	console.log(data)
	return (dispatch) => {
		Media(data, 1).then(
			res => {
				console.log(res)
				try {
					if (res.data.response.status.success === false) {
						dispatch(ACTIONGETMEDIA({imagenes: [], comentarios: []}))
					} else {
						dispatch(ACTIONGETMEDIA(res.data.response.payload))
					}
				} catch (e) {
					console.log(e)
				}
			}
		)
	}
}
