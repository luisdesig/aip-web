const initState = {
	asigzonas: [],
	asigzona:{},
	reload: false,
	loading: true
}

const reducer = ( state = initState, action) => {
	switch(action.type){
		case 'CARGANDOASIGZONA':
			return {
				...state,
				loading: true
			}
		case 'SEARCHASIGZONA':
			return {
				...state,
				asigzonas: action.data,
				reload: false,
				loading: false
			}
		case 'POSTASIGZONA':
			return {
				...state,
				reload: true,
				loading: true
			}
		case 'DELETEASIGZONA':
			return {
				...state,
				asigzonas: state.asigzonas.filter(({ideriesgozona})=> ideriesgozona !== action.id)
			}
		case 'UPDATEASIGZONA':
			return {
				...state,
				reload: true
			}
		default:
			return state
	}
}

export default reducer;