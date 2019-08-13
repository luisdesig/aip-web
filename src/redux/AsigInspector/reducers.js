const initState = {
	asiginspectores: [],
	asiginspector: [],
	inspectores: [],
	asiginspectoresfree: [],
	asiginspectoreszona: [],
	asiginspectornextprioridad: 0,
	maxprioridad: 0,
	validarprioridad: false,
	prioridades: [],
	reload: false,
	loading: true
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case 'CARGANDOASIGINSPECTOR':
			return {
				...state,
				loading: true
			}
		case 'GETASIGINSPECTOR': {
			let inspector = action.data.inspector;
			let activo = action.data.activo;
			inspector.prioridad = action.data.prioridad;
			inspector.maxprioridad = action.data.maxprioridad;
			inspector.activo = activo;
			return {
				...state,
				inspectores: [inspector],
				maxprioridad: action.data.maxprioridad
			}
		}
		case 'SEARCHASIGINSPECTOR':
			return {
				...state,
				asiginspectores: action.data,
				reload: false,
				loading: false
			}
		case 'POSTASIGINSPECTOR':
			return {
				...state,
				reload: true,
				loading: true
			}
		case 'DELETEASIGINSPECTOR':
			return {
				...state,
				asiginspectores: state.asiginspectores.filter(({ ideprioridadinspector }) => ideprioridadinspector !== action.id)
			}
		case 'UPDATEASIGINSPECTOR':
			return {
				...state,
				reload: true
			}
		case 'INSPECTORES':
			return {
				...state,
				inspectores: action.data
			}
		case 'INSPECTORESFREE':
			return {
				...state,
				asiginspectoresfree: action.data
			}
		case 'INSPECTORESZONA':
			let newData = [];
			let newPrioridades = [];
			action.data.forEach(element => {
				let inspector = element.inspector;
				inspector.ideprioridadinspector = element.ideprioridadinspector;
				inspector.activo = element.activo;
				inspector.prioridad = element.prioridad;
				newData.push(inspector);
				newPrioridades.push(element.prioridad)
			});
			return {
				...state,
				inspectores: newData,
				prioridades: newPrioridades
			}
		case 'INSPECTORNEXTPRIORIDAD':
			return {
				...state,
				prioridades: [],
				asiginspectornextprioridad: action.data.nextPrioridad,
				maxprioridad: action.data.nextPrioridad
			}
		case 'CHANGEESTADOINSPECTOR':
			let replaceInspectores = [];
			let newInpectores = state.inspectores.map((inspector) => {
				if (inspector.ideinspector === action.data.ideinspector) {
					if (action.data.activo.idpactivo === 10) {
						action.data.prioridad = ''
					}
					return {
						...action.data
					}
				} else {
					return inspector
				}
			});
			let inspectoresactivos = newInpectores.filter(res => typeof (res.prioridad) === 'number').sort(function (a, b) { return a.prioridad - b.prioridad; });
			for (let i = 0, size = inspectoresactivos.length; i < size; i += 1) {
				replaceInspectores.push({
					ideinspector: inspectoresactivos[i].ideinspector,
					dni: inspectoresactivos[i].dni,
					nombres: inspectoresactivos[i].nombres,
					apepaterno: inspectoresactivos[i].apepaterno,
					apematerno: inspectoresactivos[i].apematerno,
					prioridad: state.asiginspectornextprioridad + i,
					activo: {
						idpactivo: 9, value1: "DESHABILITADO"
					}
				})
			}
			return {
				...state,
				prioridades: action.data.activo.idpactivo === 9 ?
					state.prioridades.concat(action.data.prioridad) :
					state.prioridades.filter(res => res !== action.data.prioridad),
				inspectores: newInpectores.map((inspector) => {
					let newprueba = replaceInspectores.find(res => res.ideinspector === inspector.ideinspector)
					if (!newprueba) {
						return inspector
					} else {
						return {
							...newprueba
						}
					}
				}),
				/*
			inspectores: state.inspectores.map((inspector) => {
				if (inspector.ideinspector === action.data.ideinspector) {
					if (action.data.activo.idpactivo === 10) {
						action.data.prioridad = ''
					}
					return {
						...action.data
					}
				} else {
					return inspector
				}
			}),*/
				maxprioridad: inspectoresactivos.length + 1,
			}
		case 'CHANGEESTADOINSPECTORGRUPAL':
			return {
				...state,
				prioridades: action.data.activo.idpactivo === 9 ?
					state.prioridades.concat(action.data.prioridad) :
					state.prioridades.filter(res => res !== action.data.prioridad),
				inspectores: state.inspectores.map((inspector) => {
					if (inspector.ideinspector === action.data.ideinspector) {
						if (action.data.activo.idpactivo === 10) {
							//action.data.prioridad = ''
						}
						return {
							...action.data
						}
					} else {
						return inspector
					}
				}),
				maxprioridad: action.data.prioridad,
			}
		case 'SELECTEDPRIORIDAD': {
			return {
				...state,
				inspectores: state.inspectores.map((inspector) => {
					if (inspector.ideinspector === action.id) {
						inspector.prioridad = action.prioridad
						return {
							...inspector
						}
					} else {
						return inspector
					}
				}),
				prioridades: state.prioridades.concat(action.prioridad)
			}
		}
		case 'INSPECTORASIGNAR': {
			return {
				...state,
				inspectores: state.inspectores.map((inspector) => {
					inspector.prioridad = '';
					inspector.activo.idpactivo = 10
					return {
						...inspector
					}
				})
			}
		}
		case 'VALIDARPRIORIDAD': {
			return {
				...state
			}
		}
		case 'ASIGNARZONA':
			return {
				...state,
				inspectores: action.data
			}
		case 'CLEANDATA':
			return {
				...state,
				asiginspectornextprioridad: 0,
				asiginspectoresfree: [],
				asiginspectoreszona: [],
				asiginspector: [],
				inspectores: [],
				maxprioridad: 0,
				prioridades: []
			}
		default:
			return state
	}
}

export default reducer;