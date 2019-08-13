const initState = {
  cargando: false,
  creando: false,
  actualizando: false,
  items: [],
  error: null,
};
const crearGarantiaInforme = (items,record)=>{
  record.tipooperacion = 'I';
  record.idegarantiainforme2 = (items.filter(item=>item.idegarantiainforme2)).length+1;
  items.push(record);
  return items;
}
const actualizarGarantiaInforme = (items,record)=>{
  record.tipooperacion='A';
  items= items.map((obj,i)=>{
          if((obj.idegarantiainforme==record.idegarantiainforme && obj.idegarantiainforme) || (obj.idegarantiainforme2==record.idegarantiainforme2 && obj.idegarantiainforme2)){
              if((!obj.tipooperacion) || obj.tipooperacion=='A'){
                    obj = {...obj,...record};
              }else     
              if(obj.tipooperacion=='I'){
                  record.tipooperacion = 'I';
                  obj = {...obj,...record};
              }
          }
        return obj;
      });
  return items;
}
const eliminarGarantiaInforme = (items,record) => {
  let indice ;
  record.tipooperacion='E';
  record.indeliminado=1;
  items = items.map((obj,i)=>{
          if((obj.idegarantiainforme==record.idegarantiainforme && obj.idegarantiainforme) || (obj.idegarantiainforme2==record.idegarantiainforme2 && obj.idegarantiainforme2)){
              if((!obj.tipooperacion) || obj.tipooperacion=='A'){
                    obj = {...obj,...record};
              } else     
              if(obj.tipooperacion=='I'){ 
                  indice = i;
              }
          }
        return obj;
      });
  if (indice!=undefined)
    items.splice(indice, 1);  
  return items;
}
const checkGarantiaInforme = (items,record) => {  
  items = items.map((obj,i)=>{
          if((obj.idegarantiainforme==record.idegarantiainforme && obj.idegarantiainforme) || (obj.idegarantiainforme2==record.idegarantiainforme2 && obj.idegarantiainforme2)){
             obj.checked=true;
          }else{
            obj.checked=false;
          }
        return obj;
      });  
  return items;
}
const unCheckGarantiaInforme = (items) => {  
  items = items.map((obj,i)=>{          
            obj.checked=false;          
        return obj;
      });  
  return items;
}

const reducer = (state = initState, action) => {
  const { type, error, items, record } = action;
  switch (type) {
    case 'LISTAR_GARANTIAREC_INFORME_PENDIENTE':
      return {
        ...state,
        cargando: true,
        error: null,
        items: [],
      };
    case 'LISTAR_GARANTIAREC_INFORME_ERROR':
      return {
        ...state,
        cargando: false,
        error,
        items: [],
      };
    case 'LISTAR_GARANTIAREC_INFORME_SATISFACTORIO':
      return {
        ...state,
        cargando: false,
        error: null,
        items: [...items],
      };
    case 'CREAR_GARANTIAREC_INFORME_PENDIENTE':
      return {
        ...state,
        creando: true,
        error: null,
      };
    case 'CREAR_GARANTIAREC_INFORME_ERROR':
      return {
        ...state,
        creando: false,
        error,
      };
    case 'CREAR_GARANTIAREC_INFORME_SATISFACTORIO':      
      return {
        ...state,
        creando: false,
        error: null,
        items: crearGarantiaInforme(state.items,record)
        // items: state.items.filter(item ),
      };
    case 'ACTUALIZAR_GARANTIAREC_INFORME_PENDIENTE':
      return {
        ...state,
        actualizando: true,
        error: null,
      };
    case 'ACTUALIZAR_GARANTIAREC_INFORME_ERROR':
      return {
        ...state,
        actualizando: false,
        error,
      };
    case 'ACTUALIZAR_GARANTIAREC_INFORME_SATISFACTORIO':
      return {
        ...state,
        actualizando: false,
        error: null,
        items: actualizarGarantiaInforme(state.items,record)
      };
    
    case 'ELIMINAR_GARANTIAREC_INFORME_PENDIENTE':
      return {
        ...state,
        eliminando: true,
        error: null,
      };
    case 'ELIMINAR_GARANTIAREC_INFORME_ERROR':
      return {
        ...state,
        eliminando: false,
        error,
      };
    case 'ELIMINAR_GARANTIAREC_INFORME_SATISFACTORIO':
      return {
        ...state,
        eliminando: false,
        error: null,
        items: eliminarGarantiaInforme(state.items,record)
      };

    case 'PROCLOTE_GARANTIAREC_INFORME_PENDIENTE':
      return {
        ...state,
        enprocesolote: true,
        error: null,
      };
    case 'PROCLOTE_GARANTIAREC_INFORME_ERROR':
      return {
        ...state,
        enprocesolote: false,
        error,
      };
    case 'PROCLOTE_GARANTIAREC_INFORME_SATISFACTORIO':
      return {
        ...state,
        enprocesolote: false,
        error: null,
        // items: state.items.filter(item ),
      };
    case 'CHECK_GARANTIAREC_INFORME':
      return {
        ...state,
        items: checkGarantiaInforme(state.items,record)
      };
    case 'UNCHECK_GARANTIAREC_INFORME':
      return {
        ...state,
        items: unCheckGarantiaInforme(state.items)
      };
    default:
      return state;
  }  
};
export default reducer;
