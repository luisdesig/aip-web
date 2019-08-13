const initState = {
	clientes: [],
	comboclientes: []
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case 'LISTCLIENTES':
			let comboclientes = [];
			action.data.map(cliente => {
				comboclientes.push(cliente.nomcliente)
			})
			return {
				...state,
				clientes: action.data,
				comboclientes: comboclientes
			}
		case 'CLIENTESCLEAN':
			return {
				...state,
				comboclientes: []
			}
		default:
			return state
	}
}

export default reducer;