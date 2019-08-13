const initState = {
    scoring: [],
    cargando: false
}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'CARGANDO': 
            return {
                ...state,
                cargando: action.loading
            }
        case 'CARGADO':
            return {
                ...state,
                cargando: action.loading
            }
        case 'DATASCORING':
            return {
                ...state,
                scoring: action.data,
                cargando: action.loading 
            }
        case 'CLEANSCORING':
            return {
                ...state,
                scoring: []
            }
        default:
            return state
    }
}
export default reducer;