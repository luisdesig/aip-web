export const STARTACTIONSEARCH = data => ({
  type: '_SEARCHASIGINSPECTOR',
  payload: data
})
export const STARTACTIONGET = data => ({
  type: '_GETASIGINSPECTOR',
  payload: data
})
export const STARTACTIONPOST = data => ({
  type: '_POSTASIGINSPECTOR',
  payload: data
})
export const STARTACTIONPUT = data => ({
  type: '_UPDATEASIGINSPECTOR',
  payload: data
})
export const STARTACTIONPUTGRUPO = data => ({
  type: '_UPDATEGRUPOASIGINSPECTOR',
  payload: data
})
export const STARTACTIONDELETE = id => {
  const data = { ideprioridadinspector: id };
  return ({
    type: '_DELETEASIGINSPECTOR',
    payload: data
  })
}
export const STARTACTIONINSPECTOR = data => ({
  type: '_INSPECTORES',
  payload: data
})
export const STARTACTIONINSPECTORFREE = data => ({
  type: '_INSPECTORESFREE',
  payload: data
})
export const STARTACTIONINSPECTORNEXTPRIORIDAD = id => {
  const data = { idezona: id };
  return ({
    type: '_INSPECTORNEXTPRIORIDAD',
    payload: data
  })
}
export const STARTACTIONINSPECTORZONA = data => ({
  type: '_INSPECTORESZONA',
  payload: data
})
export const ACTIONSELECTEDPRIORIDAD = (id, prioridad) => ({
  type: 'SELECTEDPRIORIDAD',
  id,
  prioridad
})
export const ACTIONCHANGEESTADOINSPECTOR = (data) => ({
  type: 'CHANGEESTADOINSPECTOR',
  data: data
})
export const ACTIONCHANGEESTADOINSPECTORGRUPAL = (data) => ({
  type: 'CHANGEESTADOINSPECTORGRUPAL',
  data: data
})
export const ACTIONCLEANDATA = () => ({
  type: 'CLEANDATA',
});
export const ACTIONASIGNARZONA = data => ({
  type: 'ASIGNARZONA',
  data: data,
});
export const ACTIONVALIDARPRIORIDAD = prioridad => ({
  type: 'VALIDARPRIORIDAD',
  prioridad,
});
export const exportAsigInspector = () => ({
  type: 'EXPORTASIGINSPECTOR',
});
export const STARTACTIONINSPECTORASIGNAR = () => ({
  type: 'INSPECTORASIGNAR'
})