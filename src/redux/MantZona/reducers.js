const initState = {
	zonasgeograficas: [],
	zonasgeograficasfree: [],
	zonageografica: {},
	combozonas: [
		{
			pais: { nombre: ''},
			departamento: { nombre: ''},
			provincia: { nombre: ''},
			distrito: { nombre: ''}
		}
	],
	reload: false,
	statusAdd : false,
	loading: true
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case 'CARGANDOZONAGEOGRAFICA':
			return {
				...state,
				loading: true
			}
		case 'SEARCHZONAGEOGRAFICA':
			return {
				...state,
				zonasgeograficas: action.data,
				reload: false,
				loading: false,
				zonasgeograficasfree: []
			}
		case 'ERROR_ADD_ZONA':
			return {
				...state,
				statusAdd: true
			}	
		case 'ZONASFREE':
			return {
				...state,
				zonasgeograficasfree: action.data
			}
		case 'POSTZONA':
			return {
				...state,
				reload: true,
				loading: true
			}
		case 'DELETEZONA':
			return {
				...state,
				zonasgeograficas: state.zonasgeograficas.filter(({ ideubigeozona }) => ideubigeozona !== action.id)
			}
		case 'UPDATEZONA':
			return {
				...state,
				zonasgeograficas: state.zonasgeograficas.map((zonageografica) => {
					if (zonageografica.ideubigeozona === action.id) {
						for (const item in zonageografica) {
							if (item === 'zona') {
								zonageografica[item] = action.data.idezona
							}
						}
						return {
							...zonageografica
						}
					} else {
						return zonageografica
					}
				})
			}
		case 'LISTZONAS':
			return {
				...state,
				combozonas: action.data
			}
		default:
			return state
	}
}

export default reducer;