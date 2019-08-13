const initState = {
  supervisores: [],
  supervisoresEmpresa: [],
  sedes: [],
  riesgos: [],
  zonasgeograficascurrent: [],
  paises: [],
  departamentos: [],
  provincias: [],
  distritos: [],
  parametricas: [],
  ubigeozonas: [],
  zonas: [],
  zonasocupadas: [],
  hasgruposgarantias: [],
  gruposgarantias: [],
  subgruposgarantias: [],
  tiposgironegocios: [],
  estadosgiro: [],
  estados: [],
  girosocupaciones: [],
  girosnegocios: [],
  ocupaciones: [],
  tiposinspectoresasg: [],
  ingenierosqas: [],
  garantiascurrent: [],
  motivosinspeccion: [],
  estadosinspeccion: [],
  paramentricas: [],
  errorserver: false,
  estadousuario: []
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'GETMAESTRAS':
      return {
        ...state,
        supervisores: action.data,
        supervisoresEmpresa: action.data,
        sedes: action.data,
        riesgos: action.data,
      };
    case 'GETPARAMETRICAS':
      return {
        ...state,
        paramentricas: action.data === undefined ? [] : action.data,
        tiposgironegocios:
          action.data.IDPTIPOGIRONEGOCIO === undefined ? [] : action.data.IDPTIPOGIRONEGOCIO,
        estadosgiro: action.data.IDPESTASIGNACION === undefined ? [] : action.data.IDPESTASIGNACION,
        estados: action.data.IDPACTIVO === undefined ? [] : action.data.IDPACTIVO,
        tiposinspectoresasg:
          action.data.IDPTIPOINSPECTORASG === undefined ? [] : action.data.IDPTIPOINSPECTORASG,
        motivosinspeccion:
          action.data.IDPMOTIVOINSPECCION === undefined ? [] : action.data.IDPMOTIVOINSPECCION,
        estadosinspeccion:
          action.data.IDPESTINSPECCION === undefined ? [] : action.data.IDPESTINSPECCION,
        estadosinspector:
          action.data.IDPTIPOINSPECTOR === undefined ? [] : action.data.IDPTIPOINSPECTOR, 
        sedes: action.data.IDPSEDE,
        estadousuario: action.data.IDPESTADOUSUARIO === undefined ? [] : action.data.IDPESTADOUSUARIO
      };
    case 'GETZONA':
      return {
        ...state,
        zonas: action.data.zonas,
      };
    case 'GETZONAOCUPADA':
      return {
        ...state,
        zonasocupadas: action.data.zonas,
      };
    case 'GETRIESGOS':
      return {
        ...state,
        riesgos: action.data,
      };
    case 'GETUBIGEOZONA':
      return {
        ...state,
        ubigeozonas: action.data,
        paises: action.data.paises,
        departamentos: [],
        provincias: [],
        distritos: [],
      };
    case 'DEPARTAMENTO':
      return {
        ...state,
        departamentos: state.ubigeozonas.departamentos.filter(
          ({ idepais }) => idepais === action.id,
        ),
        provincias: [],
        distritos: [],
      };
    case 'PROVINCIA':
      var provincia = state.departamentos.find(res => res.ideubigeo === action.id);
      return {
        ...state,
        provincias: state.ubigeozonas.provincias.filter(
          ({ ubigeoDep }) => ubigeoDep === provincia.ubigeo,
        ),
        distritos: [],
      };
    case 'DISTRITO':
      var distrito = state.provincias.find(res => res.ideubigeo === action.id);
      return {
        ...state,
        distritos: state.ubigeozonas.distritos.filter(
          ({ ubigeoPro }) => ubigeoPro === distrito.ubigeo,
        ),
      };
    case 'REGISTERZONA':
      var newData = {};
      var ideubigeozona = state.zonasgeograficascurrent.length + 1;
      newData.ideubigeozona = ideubigeozona;
      var ideubigeo = action.data.ideubigeo;
      newData.ideubigeo = ideubigeo;
      var zona = state.zonas.find(res => res.idezona === action.data.idezona);
      newData.zona = zona;
      var pais = state.paises.find(res => res.idepais === action.data.idepais);
      newData.pais = pais;
      var departamento = state.departamentos.find(
        res => res.ideubigeo === action.data.idedepartamento,
      );
      newData.departamento = departamento;
      if (action.data.idedepartamento === 'Todos') {
        newData.departamento = { nombre: 'Todos' };
        newData.provincia = { nombre: 'Todos' };
        newData.distrito = { nombre: 'Todos' };
      } else {
        if (action.data.ideprovincia === 'Todos') {
          newData.provincia = { nombre: 'Todos' };
          newData.distrito = { nombre: 'Todos' };
        } else {
          let provincia = state.provincias.find(res => res.ideubigeo === action.data.ideprovincia);
          newData.provincia = provincia;
          if (action.data.idedistrito === 'Todos') {
            newData.distrito = { nombre: 'Todos' };
          } else {
            let distrito = state.distritos.find(res => res.ideubigeo === action.data.idedistrito);
            newData.distrito = distrito;
          }
        }
      }
      return {
        ...state,
        zonasgeograficascurrent: state.zonasgeograficascurrent.concat(newData),
      };
    case 'DELETECURRENTZONA':
      return {
        ...state,
        zonasgeograficascurrent: state.zonasgeograficascurrent.filter(
          ({ ideubigeozona }) => ideubigeozona !== action.id,
        ),
      };
    case 'CLEANZONAS':
      return {
        ...state,
        zonasgeograficascurrent: [],
      };
    case 'CLEANSEARCHZONAS':
      return {
        ...state,
        departamentos: [],
        provincias: [],
        distritos: [],
      };
    case 'GRUPOSGARANTIA':
      return {
        ...state,
        hasgruposgarantias: action.data,
        gruposgarantias: action.data.garantias,
      };
    case 'SUBGARANTIA':
      return {
        ...state,
        subgruposgarantias: state.hasgruposgarantias.subgarantias.filter(
          ({ idegrupogarantia }) => idegrupogarantia === action.id,
        ),
      };
    case 'GIROSOCUPACION':
      return {
        ...state,
        girosocupaciones: action.data,
        girosnegocios: action.data.giros,
        ocupaciones: action.data.ocupaciones,
      };
    case 'OCUPACION':
      return {
        ...state,
        ocupaciones: state.girosocupaciones.ocupaciones.filter(
          ({ idegironegocio }) => idegironegocio === action.id,
        ),
      };
    case 'INGENIEROQA':
      return {
        ...state,
        ingenierosqas: action.data,
      };
    case 'SEARCHINGENIEROQA':
      return {
        ...state,
      };
    case 'NOTCONECTIONSERVER':
      return {
        ...state,
        errorserver: true,
      };
    case 'CLEANGARANTIAS':
      return {
        ...state,
        subgruposgarantias: [],
      };
    default:
      return state;
  }
};

export default reducer;
