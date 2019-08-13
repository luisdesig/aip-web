const initState = {
	garantias: [],
	garantia: {},
	garantiaprioridad: 0,
	inmueblegarantias: [],
	reload: false,
	loading: true
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case 'CARGANDOGARANTIA':
			return {
				...state,
				loading: true
			}
		case 'GETGARANTIA':
			return {
				...state,
				garantias: action.data
			}
		case 'GETSUBGARANTIA':
			return {
				...state,
				inmueblegarantias: action.data
			}
		case 'SEARCHGARANTIA':
			return {
				...state,
				garantias: action.data,
				reload: false,
				loading: false
			}
		case 'GARANTIAPRIORIDAD':
			return {
				...state,
				garantiaprioridad: action.data.nextPrioridad
			}
		case 'POSTGARANTIA':
			return {
				...state,
				reload: true,
				loading: true
			}
		case 'DELETEGARANTIA':
			return {
				...state,
				garantias: state.garantias.filter(({ idegarantiarec }) => idegarantiarec !== action.id)
			}
		case 'UPDATEGARANTIA':
			return {
				...state,
				reload: true
			}
		case 'CLEANINMUEBLES':
			return {
				...state,
				inmueblegarantias: []
			}
		case 'CLEANGARANTAISREC':
			return {
				...state,
				garantiaprioridad: 0
			}
		default:
			return state
	}
}

export default reducer;