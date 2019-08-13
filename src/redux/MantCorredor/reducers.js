const initState = {
	corredores: [],
	corredor: {},
	combocorredores: [],
	loading: true
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case 'CARGANDOCORREDOR':
			return {
				...state,
				loading: true
			}
		case 'SEARCHCORREDOR':
			return {
				...state,
				corredores: action.data,
				loading: false
			}
		case 'LISTCORREDORES':
			return {
				...state,
				combocorredores: action.data
			}
		default:
			return state
	}
}

export default reducer;