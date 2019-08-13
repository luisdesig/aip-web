const initState = {
	medias: {},
	comentarios: [],
	imagenes: [],
	combogrupopregunta: [],
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case 'GETMEDIA':
			return {
				...state,
				medias: action.data,
				comentarios: action.data.comentarios,
				imagenes: action.data.imagenes
			}
		case 'COMBOGRUPOPREGUNTA':
			return {
				...state,
				combogrupopregunta: action.data
			}
		case 'ADDCOMENTARIO':
			return {
				...state,
				comentarios: state.comentarios.concat(action.payload)
			}
		case 'DELETECOMENTARIO':
			//idemediafototxt
			return {
				...state,
				comentarios: state.comentarios.map(res => {
					if (res.idemediafototxt === action.id) {
						res.indeliminado = 1
						res.editado = true
						return res
					} else {
						return {
							...res
						}
					}
				})
			}
		case 'UPDATECOMENTARIO':
			return {
				...state,
				comentarios: state.comentarios.map(res => {
					if (res.idemediafototxt === action.payload.idemediafototxt) {
						let data = action.payload;
						data.editado = true 
						return data
					} else {
						return {
							...res
						}
					}
				})
			}
		case 'DELETEIMAGE':
			//idemediafototxt
			return {
				...state,
				imagenes: state.imagenes.map(res => {
					if (res.idemediafototxt === action.id) {
						res.indeliminado = 1;
						res.editado = true
						return res
					} else {
						return {
							...res
						}
					}
				})
			}
		default:
			return state
	}
}

export default reducer;