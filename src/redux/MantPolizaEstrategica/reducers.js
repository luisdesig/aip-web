const initState = {
    polizasestrategicas: [],
    polizaestrategica: {},
    reload: false,
    loading: true
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'CARGANDOPOLIZAESTRATEGICA':
            return {
                ...state,
                loading: true
            }
        case 'SEARCHPOLIZAESTRATEGICA':
            return {
                ...state,
                polizasestrategicas: action.data,
                reload: false,
                loading: false
            }
        case 'POSTPOLIZAESTRATEGICA':
            return {
                ...state,
                reload: true,
                loading: true
            }
        case 'DELETEPOLIZAESTRATEGICA':
            return {
                ...state,
                polizasestrategicas: state.polizasestrategicas.filter(({ idepolizaestrategica }) => idepolizaestrategica !== action.id)
            }
        case 'UPDATEPOLIZAESTRATEGICA':
            return {
                ...state,
                polizasestrategicas: state.polizasestrategicas.map((polizaestrategica) => {
                    if (polizaestrategica.idepolizaestrategica === action.id) {
                        for(const item in polizaestrategica){
							if(item === 'activo'){
                                polizaestrategica[item]['idpactivo'] = action.data.idpactivo;
                                if(action.data.idpactivo === 9){
                                    polizaestrategica[item]['value1'] = 'HABILITADO';
                                }else{
                                    polizaestrategica[item]['value1'] = 'DESHABILITADO';
                                }
							}
						}
                        return {
                            ...polizaestrategica
                        }
                    } else {
                        return polizaestrategica
                    }
                })
            }
        default:
            return state
    }
}

export default reducer;