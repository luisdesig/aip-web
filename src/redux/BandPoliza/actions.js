export const ACTIONREGISTERGARANTIA = data => ({
  type: 'REGISTERGARANTIAPOLIZA',
  data: data,
});
export const ACTIONDELETEGARANTIA = id => ({
  type: 'DELETEGARANTIAPOLIZA',
  id: id,
});
export const ACTIONCHANGEESTADO = data => ({
  type: 'CHANGEESTADO',
  data: data,
});
export const ACTIONCLEAN = () => ({
  type: 'CLEANDATA',
});
export const STARTACTIONSEARCH = (data) => ({
  type: 'SEARCHPOLIZAS',
  payload: data
})

export const STARTACTIONGET = (data) => ({
  type: 'GETINMUEBLES',
  payload: data
})

export const STARTACTIONPOST = (data) => ({
  type: 'POSTINMUEBLES',
  payload: data
})
