export const ACTIONSELECTPAIS = (id)=> ({
	type: 'PAIS',
	id: id
})

export const ACTIONSELECTDEPARTAMENTO = (id) => ({
	type: 'DEPARTAMENTO',
	id: id
})

export const ACTIONSELECTPROVINCIA = (id) => ({
    type: 'PROVINCIA',
    id: id
})

export const ACTIONSELECTDISTRITO = (id) => ({
    type: 'DISTRITO',
    id: id
})

export const ACTIONREGISTERZONA = (data)=> ({
	type: 'REGISTERZONA',
	data: data
})

export const ACTIONDELETECURRENTZONA = (id)=> ({
	type: 'DELETECURRENTZONA',
	id: id
})

export const ACTIONCLEANZONAS = () => ({
	type: 'CLEANZONAS'
})

export const ACTIONSUBGARANTIA = (id) => ({
	type: 'SUBGARANTIA',
	id: id
})
export const ACTIONOCUPACION = (id) => ({
	type: 'OCUPACION',
	id: id
})
export const SEARCHINGENIEROQA = (text) => ({
	type: 'SEARCHINGENIEROQA',
	text: text
})
export const ACTIONCLEANSEARCHZONAS = () => ({
	type: 'CLEANSEARCHZONAS'
})
export const ACTIONCLEANSUBGARANTIA = () => ({
	type: 'CLEANGARANTIAS'
})