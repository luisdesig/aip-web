const initState = {
	asiginspectorescorredor: [],
	asiginspectorcorredor: [],
	corredoresinspector: [],
	corredoresinspectores: [],
	corredoresinspectorfree: [],
	reload: false,
	loading: true
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case 'CARGANDOASIGINSPC':
			return {
				...state,
				loading: true
			}
		case 'GETASIGINSPC': {
			let corredor = action.data.corredor;
			let activo = action.data.activo;
			corredor.activo = activo
			return {
				...state,
				corredoresinspectorfree: [corredor]
			}
		}
		case 'SEARCHASIGINSPC':
			return {
				...state,
				asiginspectorescorredor: action.data,
				reload: false,
				loading: false
			}
		case 'POSTASIGINSPC':
			return {
				...state,
				reload: true,
				loading: true
			}
		case 'DELETEASIGINSPC':
			return {
				...state,
				asiginspectorescorredor: state.asiginspectorescorredor.filter(({ idecorredorinspector }) => idecorredorinspector !== action.id)
			}
		case 'UPDATEASIGINSPC':
			return {
				...state,
				reload: true
			}
		case 'CORREDORINSPECTOR':
			return {
				...state,
				corredoresinspectorfree: action.data
			}
		case 'ASIGNARCORREDOR':
			return {
				...state,
				corredoresinspectorfree: action.data
			}
		case 'CORREDORINSPECTORFREE':
			return {
				...state,
				corredoresinspectorfree: action.data
			}
		case 'ESTADOCORREDOR':
			return {
				...state,
				corredoresinspectorfree: state.corredoresinspectorfree.map((corredor) => {
					if (corredor.idecorredor === action.data.idecorredor) {
						return {
							...action.data
						}
					} else {
						return corredor
					}
				})
			}
		case 'CLEANDATA': {
			return {
				...state,
				corredoresinspectorfree: []
			}
		}
		default:
			return state
	}
}

export default reducer;