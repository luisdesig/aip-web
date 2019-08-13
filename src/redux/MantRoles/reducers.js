const initState = {
    usuariosroles : [],
    loading: true
}

const reducers = (state = initState, action) => {
    switch (action.type) {
        case 'CARGANDOROLES':
            return {
                ...state,
                loading: true
            }
        case 'SEARCHROLES':
            return {
                ...state,
                usuariosroles: action.data,
                loading: false
            }
        default:
            return state
    }
}

export default reducers;