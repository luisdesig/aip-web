const initState = {
	clasriesgos: [],
	clasriesgo: {},
	combogirosnegocios: [{
		gironegocio: { nombre: ''},
		ocupacion: {nombre: ''}
	}],
	reload: false,
	loading: true
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case 'CARGANDOCLASRIESGO':
			return {
				...state,
				loading: true
			}
		case 'SEARCHCLASRIESGO':
			return {
				...state,
				clasriesgos: action.data,
				reload: false,
				loading: false
			}
		case 'POSTCLASRIESGO':
			return {
				...state,
				reload: true,
				loading: false
			}
		case 'DELETECLASRIESGO':
			return {
				...state,
				clasriesgos: state.clasriesgos.filter(({ ideriesgogironegocio }) => ideriesgogironegocio !== action.id)
			}
		case 'UPDATECLASRIESGO':
			return {
				...state,
				reload: true
			}
		case 'LISTGIROSNEGOCIOS':
			return {
				...state,
				combogirosnegocios: action.data
			}
		default:
			return state
	}
}

export default reducer;