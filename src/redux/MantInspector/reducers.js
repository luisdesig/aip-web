const initState = {
  inspectores: [],
  inspector: {},
  supervisores: [],
  supervisor: [],
  ingenieros: [],
  ingeniero: [],
  empresas: [],
  empresa: [],
  reload: false,
  loading: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'GETINSPECTOR':
      return {
        ...state,
        inspectores: action.data,
      };
    case 'CARGANDOINSPECTOR':
      return {
        ...state,
        loading: true,
      };
    case 'SEARCHINSPECTOR':
      return {
        ...state,
        inspectores: action.data,
        reload: false,
        loading: false,
      };
    case 'SEARCHSUPERVISOR':
      let resSupervisor = [];
      action.data.map(supervisor => {
        resSupervisor.push(
          `${supervisor.nombres} ${supervisor.apepaterno} ${supervisor.apematerno}`,
        );
      });
      return {
        ...state,
        supervisores: action.data,
        supervisor: resSupervisor,
      };
    case 'SEARCHINGENIERO':
      let res = [];
      action.data.map(ingeniero => {
        res.push(`${ingeniero.nombres} ${ingeniero.apepaterno} ${ingeniero.apematerno}`);
      });
      return {
        ...state,
        ingenieros: action.data,
        ingeniero: res,
      };
    case 'SEARCHEMPRESA':
      let resempresa = [];
      action.data.map(empresa => {
        resempresa.push(empresa.nombres);
      });
      return {
        ...state,
        empresas: action.data,
        empresa: resempresa,
      };
    case 'POSTINSPECTOR':
      return {
        ...state,
        reload: true,
      };
    case 'DELETEINSPECTOR':
      return {
        ...state,
        reload: true,
        loading: true
      };
    case 'UPDATEINSPECTOR':
      return {
        ...state,
        reload: true,
      };
    case 'CLEANINSPECTOR':
      return {
        ...state,
        ingenieros: [],
        ingeniero: [],
        empresas: [],
        empresa: [],
        supervisor: [],
        supervisores: [],
      };
    default:
      return state;
  }
};

export default reducer;
