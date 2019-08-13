import { request } from './request';
import axios from 'axios';
import { APIBASE } from './constants';
import { APILOCAL, MyTypesToExternalTypesMap, Controls } from './constants';
import Reactotron from 'reactotron-react-js';
import _ from 'lodash';

const HTTP_METHOD_CONSULTAR_POR_PARAMETROS = 8;
const HTTP_METHOD_GUARDAR = 7;

const CuestionarioService = {
  all: async payload => {
    const data = request(payload, HTTP_METHOD_CONSULTAR_POR_PARAMETROS);
    const responseBody = await axios({
      method: 'POST',
      url: `${APIBASE}/cuestionario`,
      data,
    });
    if (!responseBody || !responseBody.data || !responseBody.data.response) {
      return [];
    }
    if (!responseBody.data.response.status.success) {
      return [];
    }
    return responseBody.data.response.payload || [];
  },
  save: async ({ inspectionId, answers }) => {
    const payload = {
      ideInformeInspeccion: inspectionId,
      grupos: _.chain(answers || [])
        .groupBy('groupId')
        .map((sections, strGroupId) => {
          return {
            ideGrupo: Number.parseInt(strGroupId, 0),
            secciones: _.chain(sections || [])
              .groupBy('sectionId')
              .map((questions, strSectionId) => {
                return {
                  ideSeccion: Number.parseInt(strSectionId, 0),
                  preguntas: questions.map(question => {
                    let value = null;
                    if (question.isAgrouper) {
                      if (
                        question.type === Controls.ExclusiveList ||
                        question.type === Controls.List
                      ) {
                        value = question.value.map(questionIndex => {
                          return {
                            indice: questionIndex.index,
                            preguntas: questionIndex.answers.map(questionValue => {
                              const tipoExterno = MyTypesToExternalTypesMap.find(
                                value => value.key === questionValue.type,
                              );
                              const tipo = tipoExterno ? tipoExterno.value : null;
                              return {
                                idePregunta: questionValue.questionId,
                                esAgrupador: questionValue.isAgrouper,
                                tipo,
                                ideTipoControl: questionValue.controlId,
                                valorIngeniero: questionValue.value,
                              };
                            }),
                          };
                        });
                      } else {
                        value = question.value.map(questionValue => {
                          const tipoExterno = MyTypesToExternalTypesMap.find(
                            value => value.key === questionValue.type,
                          );
                          const tipo = tipoExterno ? tipoExterno.value : null;
                          return {
                            idePregunta: questionValue.questionId,
                            esAgrupador: questionValue.isAgrouper,
                            tipo,
                            ideTipoControl: questionValue.controlId,
                            valorIngeniero: questionValue.value,
                          };
                        });
                      }
                    } else {
                      value = question.value;
                    }

                    const tipoExterno = MyTypesToExternalTypesMap.find(
                      value => value.key === question.type,
                    );
                    const tipo = tipoExterno ? tipoExterno.value : null;
                    return {
                      idePregunta: question.isAgrouper ? null : question.questionId,
                      esAgrupador: question.isAgrouper,
                      tipo,
                      ideTipoControl: question.isAgrouper ? null : question.controlId,
                      valorIngeniero: value,
                    };
                  }),
                };
              }),
          };
        }),
    };

    const data = request(payload, HTTP_METHOD_GUARDAR);
    const responseBody = await axios({
      method: 'POST',
      url: `${APILOCAL}/cuestionario`,
      data,
    });
    if (!responseBody || !responseBody.data || !responseBody.data.response) {
      return false;
    }
    if (!responseBody.data.response.status.success) {
      return false;
    }
    return true;
  },
};
export default CuestionarioService;
