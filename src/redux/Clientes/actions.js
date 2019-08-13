import {
	Clientes
} from '../../services/clientes.service';

const ACTIONLIST = (data) => ({
	type: 'LISTCLIENTES',
	data: data
})

export const CLEANCOMBOCLIENTES = () => ({
	type: 'CLIENTESCLEAN'
})

export const STARTACTIONLISTCLIENTES = (data) => {
	return (dispatch) => {
		Clientes(data,6).then(
			res => {
				try {
					if (res.data.response.status.success === true) {
						dispatch(ACTIONLIST(res.data.response.payload))
					} else {
						dispatch(ACTIONLIST([]))
					}
				} catch (e) {
					console.log(e)
				}
			}
		)
	}
}
