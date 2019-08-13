import {
	ClasRiesgos
} from '../../services/clasriesgo.service';

const ACTIONLISTGIRONEGOCIO = (data) => ({
	type: 'LISTGIROSNEGOCIOS',
	data: data
})

export const exportClasRiesgo = () => ({
	type: 'EXPORTCLASRIESGO'
})
export const STARTACTIONSEARCH = (data) => ({
	type: '_SEARCHCLASRIESGO',
	payload: data
})
export const STARTACTIONPOST = (data) => ({
	type: '_POSTCLASRIESGO',
	payload: data
})
export const STARTACTIONPUT = (id, data) => {
	data.ideriesgogironegocio = id;
	return ({
		type: '_UPDATECLASRIESGO',
		payload: data
	})
}
export const STARTACTIONDELETE = (id) => {
	const data = { 'ideriesgogironegocio': id }
	return ({
		type: '_DELETECLASRIESGO',
		payload: data
	})
}
export const STARTACTIONLISTGIRONEGOCIO = (data = {}) => {
	return (dispatch) => {
		ClasRiesgos(data, 7).then(
			res => {
				try {
					if (res.data.response.status.success === false) {
						dispatch(ACTIONLISTGIRONEGOCIO([]))
					} else {
						dispatch(ACTIONLISTGIRONEGOCIO(res.data.response.payload))
					}
				} catch (e) {
					console.log(e)
				}
			}
		)
	}
}

