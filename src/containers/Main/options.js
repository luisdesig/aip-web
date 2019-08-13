/*
import React from 'react';
import MantRoles from '../../containers/InspeccionesPatrimoniales/Mantenimientos/MantRoles/MantRoles' ;
import MantInspector  from '../../containers/InspeccionesPatrimoniales/Mantenimientos/MantInspector/MantInspector';
import MantCorredor from '../../containers/InspeccionesPatrimoniales/Mantenimientos/MantCorredor/MantCorredor';
import MantZona from '../../containers/InspeccionesPatrimoniales/Mantenimientos/MantZona/MantZona';
import MantPoliza from "../../containers/InspeccionesPatrimoniales/Mantenimientos/MantPolizaEstrategica/MantPolizaEstrategica";
import MantGarantia from "../../containers/InspeccionesPatrimoniales/Mantenimientos/MantGarantia/MantGarantia";

import ClasRiesgo from "../../containers/InspeccionesPatrimoniales/Asignaciones/ClasRiesgo/ClasRiesgo";
import AsigZona from '../../containers/InspeccionesPatrimoniales/Asignaciones/AsigZona/AsigZona';
import AsigInspector from '../../containers/InspeccionesPatrimoniales/Asignaciones/AsigInspector/AsigInspector';
import AsigInspC from "../../containers/InspeccionesPatrimoniales/Asignaciones/AsigInspC/AsigInspC";

import BandPolizas from "../../containers/InspeccionesPatrimoniales/Bandejas/BandPolizas/BandPolizas";
import RevisionInforme from "../../containers/InspeccionesPatrimoniales/Bandejas/RevisionInforme/RevisionInforme";
import BandInspeccion from "../../containers/InspeccionesPatrimoniales/Bandejas/BandInspeccion/BandInspeccion";
import BandAsignacion from "../../containers/InspeccionesPatrimoniales/Bandejas/BandAsignacion/BandAsignacion";


export default class MenuData {
    static data = [
          {
            "padre": {
              "nombre": "Mantenimientos",
              "hijos": [
                {
                  "nombre": "Consulta de Roles de Usuario",
                  "tab": "Cons. Roles",
                  "url": "/mntInspector.js",
                  "icono": "img/mntico.ico",
                  "orden": 1,
                  "index": 1,
                  "component": <MantRoles/>
                },
                {
                  "nombre": "Mantenimiento de Inspectores",
                  "tab": "Mant. Insp.",
                  "url": "/mntInspector.js",
                  "icono": "img/mntico.ico",
                  "orden": 2,
                  "index": 2,
                  "component": <MantInspector/>
                },
                {
                  "nombre": "Consulta de Corredores",
                  "tab":"Cons. Corred.",
                  "url": "/mntZona.js",
                  "icono": "img/mntico.ico",
                  "orden": 3,
                  "index":3,
                  "component": <MantCorredor/>
                },
                {
                  "nombre": "Mantenimiento de Zonas Geográficas",
                  "tab":"Mant. Zona G.",
                  "url": "/mntCorredor.js",
                  "icono": "img/mntico.ico",
                  "orden": 4,
                  "index":4,
                  "component": <MantZona/>
                },
                {
                  "nombre": "Mantenimiento de Pólizas Estratégicas",
                  "tab":"Mant. Pol. Estra.",
                  "url": "/mntZona.js",
                  "icono": "img/mntico.ico",
                  "orden": 5,
                  "index":5,
                  "component": <MantPoliza/>
                },
                {
                  "nombre": "Mantenimiento de Garantías y Recomendaciones",
                  "tab":"Mant. Garant.",
                  "url": "/mntCorredor.js",
                  "icono": "img/mntico.ico",
                  "orden": 6,
                  "index":6,
                  "component": <MantGarantia/>
                }
              ]
            }
          },
          {
            "padre": {
              "nombre": "Asignaciones",
              "hijos": [
                {
                  "nombre": "Clasificación de Riesgo por Giros de Negocio",
                  "tab":"Clas. Riesgo",
                  "url": "/asgInspector.js",
                  "icono": "img/mntico.ico",
                  "orden": 1,
                  "index":7,
                  "component": <ClasRiesgo/>
                },
                {
                  "nombre": "Asignación de Zona por Clasificación de Riesgo",
                  "tab":"Asig. Zona",
                  "url": "/asgZona.js",
                  "icono": "img/mntico.ico",
                  "orden": 2,
                  "index":8,
                  "component": <AsigZona/>
                },
                {
                  "nombre": "Asignación de Inspector y Prioridad por Distribución de Zona",
                  "tab":"Asig. Insp. por Zona",
                  "url": "/asgInspector.js",
                  "icono": "img/mntico.ico",
                  "orden": 3,
                  "index":9,
                  "component": <AsigInspector/>
                },
                {
                  "nombre": "Asignación de Inspectores a Corredores",
                  "tab":"Asig. Insp. a Corred.",
                  "url": "/asgZona.js",
                  "icono": "img/mntico.ico",
                  "orden": 4,
                  "index":10,
                  "component": <AsigInspC/>
                }
              ]
            }
          },
          {
            "padre": {
              "nombre": "Bandejas",
              "hijos": [
                {
                  "nombre": "Pólizas por Renovar",
                  "tab":"Pól. Renovar",
                  "url": "/bdjSolicitud.js",
                  "icono": "img/mntico.ico",
                  "orden": 1,
                  "index":11,
                  "component":<BandPolizas/>
                },
                {
                  "nombre": "Solicitudes de Inspección",
                  "tab":"Sol. Insp.",
                  "url": "/bdjSolicitud.js",
                  "icono": "img/mntico.ico",
                  "orden": 2,
                  "index":12,
                  "component": <BandInspeccion/>
                },
                {
                  "nombre": "Asignaciones",
                  "tab":"Asignaciones",
                  "url": "/bdjSolicitud.js",
                  "icono": "img/mntico.ico",
                  "orden": 3,
                  "index":13,
                  "component": <BandAsignacion/>
                },
                {
                  "nombre": "Revisión Integral del Informe",
                  "tab":"Rev. Integral",
                  "url": "/bdjSolicitud.js",
                  "icono": "img/mntico.ico",
                  "orden": 4,
                  "index":14,
                  "component":<RevisionInforme/>
                }
              ]
            }
          }
        ]
}
*/