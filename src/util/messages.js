const messages = {
  confirmationTitle: '¿Está seguro que desea guardar este registro?',
  confirmationBody: '',
  confirmationDelete: '¿Está seguro que desea eliminar este registro?',
  confirmationInsert: '¿Está seguro que desea guardar este registro?',
  confirmationUpdate: '¿Está seguro que desea actualizar este registro?',
  errorconexiontitle: 'Error en la conexion',
  errorconexioncontent: 'Ingrese mas tarde por favor',
  roles: {
    title: 'Consulta de Roles de Usuario',
    agregar: 'Agregar Roles de Usuarios',
    actualizar: 'Actualizar Roles de Usuarios',
    validacion: 'Todos los campos son requeridos.',
  },
  corredor: {
    title: 'Consulta de Corredores',
    agregar: 'Agregar Corredor',
    actualizar: 'Actualizar Corredor',
    validacion: 'Todos los campos son requeridos.',
  },
  inspector: {
    title: 'Mantenimiento de Inspectores',
    agregar: 'Agregar Inspector',
    actualizar: 'Actualizar Inspector',
    validacion: 'Todos los campos son requeridos.',
    validacionsupervisor: 'El supervisor no puede ser igual al inspector.',
  },
  zonasgeograficas: {
    title: 'Mantenimiento de Zonas Geográficas',
    agregar: 'Agregar Zona Geográfica',
    actualizar: 'Actualizar Zona Geográfica',
    validacion: 'Necesitas registrar por lo menos una zona geográfica.',
    error_add_zone_geography: 'No se añadió Zona geográfica,el ubigueo ya se encuentra asociado.',
  },
  polizas: {
    title: 'Mantenimiento de Pólizas Estratégicas',
    agregar: 'Agregar Póliza Estratégica',
    actualizar: 'Actualizar Póliza Estratégica',
    validacion: 'Todos los campos son requeridos.',
  },
  garantias: {
    title: 'Mantenimiento de Garantías y Recomendaciones',
    searchprioridad: 'Buscando prioridad.',
    prioridad: 'Prioridad encontrada.',
    agregar: 'Agregar Garantía y Recomendaciones',
    actualizar: 'Actualizar Garantía y Recomendaciones',
    validaciongarantia: 'Todos los campos son requeridos.',
    validacionsubgarantia: 'Todos los campos son requeridos.',
    validaciontitulo: 'Todos los campos son requeridos.',
    noprioridad: 'Usted debe ingresar una prioridad.',
    validaciondscgarantia: 'Todos los campos son requeridos.',
    prioridad: 'Prioridad cargada.',
  },
  clasriesgo: {
    //title: 'Asignación de Clasificación de Riesgo por Giros de Negocio y Ocupación',
    title: 'Asignación de Clasificación de Riesgo por Giros de Negocio y Ocupación',
    agregar: 'Agregar Asignación',
    actualizar: 'Actualizar Asignación',
    validacion: 'Todos los campos son requeridos.',
    add_class_risk: 'Se asignó clasificación de riesgo',
    error_add_class_risk: 'No se asignó clasificación de riesgo',
  },
  asigzonas: {
    //title: 'Asignación de Zonas Geográficas por Clasificación de Riesgo, por Valor Declarado y Tipo de Inspector',
    title:
      'Asignación de Zonas Geográficas por Clasificación de Riesgo, por Valor Declarado y Tipo de Inspector',
    agregar: 'Agregar Asignación',
    actualizar: 'Actualizar Asignación',
    validacion: 'Todos los campos son requeridos.',
    validacionmonto: 'El monto mínimo no puede ser mayor al monto máximo.',
    error_amount_asigZone_geography:
      'Los montos ingresados deberán ser mayor a los montos de los rangos ya registrados para la zona seleccionada.',
    error_update_zone: 'Ya existe el riesgo de zona.',
  },
  asiginspectores: {
    //title: 'Asignación de Inspectores y Prioridad para atención de Reglas de Distribución de Zonas',
    title: 'Asignación de Inspectores y Prioridad para atención de Reglas de Distribución de Zonas',
    agregar: 'Agregar Asignación',
    actualizar: 'Actualizar Asignación',
    actualizargrupo: 'Actualizar en Grupo',
    asignarinspector: 'Datos de los inspectores pendientes de asignar',
    validacion: 'Usted debe seleccionar la zona y el inspector.',
    validationinspector: 'Usted debe seleccionar un inspector.',
    validationinspectorgrupo: 'La zona seleccionada debe tener al menos asignado un inspector.',
    validationprioridades: 'Las prioridades no pueden ser iguales.',
    validacionDni: 'DNI incorrecto',
  },
  asiginspectorescorredor: {
    title: 'Asignación de Inspectores a Corredores',
    agregar: 'Agregar Asignación',
    actualizar: 'Actualizar Asignación',
    actualizargrupo: 'Actualizar en Grupo',
    asignarcorredor: 'Datos de los corredores pendientes de asignar',
    validacion: 'Usted debe seleccionar el ingeniero y el corredor.',
    validationcorredor: 'Usted debe seleccionar un corredor.',
  },
  bandejapolizarenovar: {
    title: 'Bandeja de Listado de Direcciones de Pólizas por Renovar.',
    inmueblescargado: 'Los inmuebles se han cargado con exito',
    inmuebleserror: 'Se detectaron problemas al cargar los inmuebles.',
  },
  bandejarevisioninforme: {
    title: 'Revisión Integral del Informe',
  },
  bandejainspeccion: {
    title: 'Bandeja de Solicitudes de Inspección.',
    validacion: 'Todos los campos son requeridos.',
    poliza: 'Póliza encontrada.',
    inmueble: 'Inmueble cargado.',
    garantias: 'El inmueble no tiene garantías pasadas.',
  },
  bandejaasignacion: {
    title: 'Asignación de Inspector a Solicitud de Inspección',
    validacion: 'Todos los campos son requeridos.'
  },
  cuestionario: {
    messageTitle: '',
    messageBody: '',
  },
};

const messagesEvent = {
  exportar: {
    success: 'La exportación de datos se realizó correctamente.',
    error: 'La exportación de datos se ejecutó incorrectamente.',
  },
  importar: {
    success: 'La importación de datos se realizó correctamente.',
    error: 'La importación de datos se ejecutó incorrectamente.',
  },
  errorservidor: {
    success: '',
    error: 'Se detectaron problemas con el servidor.',
  },
};

export { messages, messagesEvent };
