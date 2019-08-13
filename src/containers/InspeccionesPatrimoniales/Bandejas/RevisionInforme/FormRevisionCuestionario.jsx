import React from 'react';
import { Modal, ModalQ } from '../../../../components/Modal/Modal';
import { messages } from '../../../../util/messages';
import { showConfirm } from '../../../../components/Modal/Utils';
import { Validator } from '../../../../util/validator';
import PagePanel from '../../../../components/Page/PanelPage';
//import imgLogo from '../../../../images/1.jpg'
//import TableInmuebles from './TableInmueble';
import {
  FieldContainer,
  Field,
  ColForm,
  ColFormLabel,
  CheckboxForm,
  InputForm,
  InputNumberForm,
  RowForm,
  RowFormQ,
  TabsForm,
  SelectForm,
  RadioForm,
  DividerForm,
  LabelFormQ,
  SpanError,
} from '../../../../components/Util/util.style';
import { message, Card, Col, Row } from 'antd';
const { Meta } = Card;

const TextArea = InputForm.TextArea;
const TabPane = TabsForm.TabPane;
const Option = SelectForm.Option;
const RadioGroup = RadioForm.Group;
const CheckboxGroup = CheckboxForm.Group;

function CaseTitle(props) {
  return (
    <ColForm sm={24} lg={24}>
      <Field>
        <ColForm sm={24}>
          <DividerForm>{props.pregunta.dscpregunta}</DividerForm>
        </ColForm>
      </Field>
    </ColForm>
  );
}

function CaseRadioButton(props) {
  return (
    <ColForm sm={24} lg={12}>
      <Field>
        <LabelFormQ sm={14}>{props.pregunta.dscpregunta}</LabelFormQ>
        <ColForm sm={10}>
          <RadioGroup
            onChange={props.changeValues}
            value={
              props.pregunta.valorrespuesta.iderespuestavalor
                ? props.pregunta.valorrespuesta.iderespuestavalor
                : ''
            }
          >
            {props.pregunta.respuesta.map((item, index) => {
              return (
                <RadioForm
                  key={index}
                  value={item.iderespuesta}
                  onFocus={() => props.setPregunta(props.pregunta)}
                >
                  {item.dscrespuesta}
                </RadioForm>
              );
            })}
          </RadioGroup>
        </ColForm>
      </Field>
    </ColForm>
  );
}

function CaseTextArea(props) {
  return (
    <ColForm sm={24} lg={8}>
      <Field>
        <LabelFormQ sm={10}>{props.pregunta.dscpregunta}</LabelFormQ>
        <ColForm sm={14}>
          <TextArea
            onChange={props.changeValues}
            onFocus={() => props.setPregunta(props.pregunta)}
            value={props.pregunta.valorrespuesta.valor}
            rows={3}
          />
        </ColForm>
      </Field>
    </ColForm>
  );
}

function CaseInput(props) {
  return (
    <ColForm sm={24} lg={8}>
      <Field>
        <LabelFormQ sm={14}>{props.pregunta.dscpregunta}</LabelFormQ>
        <ColForm sm={10}>
          <input
            id={props.pregunta.idepregunta}
            onChange={props.changeValues}
            onFocus={() => props.setPregunta(props.pregunta)}
            value={props.pregunta.valorrespuesta.valor}
          />
        </ColForm>
      </Field>
    </ColForm>
  );
}

function CaseInputNumber(props) {
  return (
    <ColForm sm={24} lg={8}>
      <Field>
        <LabelFormQ sm={14}>{props.pregunta.dscpregunta}</LabelFormQ>
        <ColForm sm={10}>
          <InputNumberForm
            id={props.pregunta.idepregunta}
            onChange={props.changeValues}
            onFocus={() => props.setPregunta(props.pregunta)}
            value={props.pregunta.valorrespuesta.valor}
            max={100}
            min={0}
          />
        </ColForm>
      </Field>
    </ColForm>
  );
}

function CaseCombo(props) {
  //console.log(props)
  return (
    <ColForm sm={24} lg={8}>
      <Field>
        <LabelFormQ sm={14}>{props.pregunta.dscpregunta}</LabelFormQ>
        <ColForm sm={10}>
          <SelectForm
            onChange={props.changeValues}
            onFocus={() => props.setPregunta(props.pregunta)}
            value={
              props.pregunta.valorrespuesta.iderespuestavalor
                ? props.pregunta.valorrespuesta.iderespuestavalor
                : ''
            }
          >
            {props.pregunta.respuesta.map((item, index) => {
              return (
                <Option key={index} id={index} value={item.iderespuesta}>
                  {item.dscrespuesta}
                </Option>
              );
            })}
          </SelectForm>
        </ColForm>
      </Field>
    </ColForm>
  );
}

function CaseCheckbox(props) {
  return (
    <ColForm sm={24} lg={8}>
      <Field>
        <RowFormQ>
          <LabelFormQ sm={10}>{props.pregunta.dscpregunta}</LabelFormQ>
        </RowFormQ>

        <CheckboxGroup
          onChange={props.changeValues}
          onFocus={() => props.setPregunta(props.pregunta)}
          value={props.pregunta.valorrespuesta.valor ? props.pregunta.valorrespuesta.valor : []}
        >
          {props.pregunta.respuesta.map((item, index) => {
            return (
              <RowFormQ>
                <CheckboxForm key={index} value={item.iderespuesta}>
                  {item.dscrespuesta}
                </CheckboxForm>
              </RowFormQ>
            );
          })}
        </CheckboxGroup>
      </Field>
    </ColForm>
  );
}

function CaseCheckboxTitulo(props) {
  return (
    <ColForm sm={24} lg={8}>
      <Field>
        {/* <LabelFormQ sm={10} >{props.pregunta.dscpregunta}</LabelFormQ> */}
        <ColForm sm={14}>
          <CheckboxGroup
            onChange={props.changeValues}
            onFocus={() => props.setPregunta(props.pregunta)}
            value={props.pregunta.valorrespuesta.valor ? props.pregunta.valorrespuesta.valor : []}
          >
            <CheckboxForm key={props.pregunta.idepregunta} value={props.pregunta.dscpregunta}>
              {props.pregunta.dscpregunta}
            </CheckboxForm>
          </CheckboxGroup>
        </ColForm>
      </Field>
    </ColForm>
  );
}

class FormRevisionCuestionario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideinformeinspeccion: '',
      idecuestionario: '',
      idx: 0,
      tituloModal: '',
      preguntaQ: {},
      idxPreguntasQ: undefined,
      ERROR: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    //console.log(this.props.dataEdit);
  }

  componentDidMount() {
    const { STARTACTIONGET, dataEdit } = this.props;
    STARTACTIONGET({
      ideinformeinspeccion: dataEdit.ideinformeinspeccion,
      idecuestionario: dataEdit.idecuestionario,
    });
  }

  onChange = () => {};
  onSelect = () => {};

  changeValues = e => {
    console.log('----------');
    //console.log(e.target[e.target.selectedIndex].id );
    console.log(e.target);
    this.props.ACTIONCHANGEVALUESCUESTIONARIO({
      pregunta: this.state.preguntaQ,
      respuesta: e.target.value,
    });
  };
  changeValuesInputNumber = e => {
    console.log('----------');
    //console.log(e.target[e.target.selectedIndex].id );
    console.log(e);
    this.props.ACTIONCHANGEVALUESCUESTIONARIO({
      pregunta: this.state.preguntaQ,
      respuesta: e,
    });
  };
  changeValuesCombo = e => {
    console.log('----------');
    //console.log(e.target[e.target.selectedIndex].id );
    //console.log(event.target );
    this.props.ACTIONCHANGEVALUESCUESTIONARIO({
      pregunta: this.state.preguntaQ,
      respuesta: e,
    });
  };
  changeValuesCheck = e => {
    console.log('-----changeValuesCheck-----');
    //console.log(e.target[e.target.selectedIndex].id );
    console.log(e);
    this.props.ACTIONCHANGEVALUESCUESTIONARIO({
      pregunta: this.state.preguntaQ,
      respuesta: e,
    });
  };

  setPregunta = pregunta => {
    console.log('---IDE PREGUNTA-------');
    console.log(pregunta);
    this.setState({
      preguntaQ: pregunta,
    });
    //this.props.ACTIONCHANGEVALUESCUESTIONARIO(e)
  };

  openCategoria = (idx, cuestionariocnf) => {
    this.setState({
      idx: idx,
      tituloModal: cuestionariocnf.dsccuestionariocnf,
    });
    this.props.handleModal();
  };

  onSubmit = () => {
    let data = {
      ideinformeinspeccion: this.state.ideinformeinspeccion,
      idecuestionario: this.state.idecuestionario,
    };
    const validator = Validator(data);
    this.setState({ ERROR: validator });
    data.idpactivo = this.state.idpactivo;
    /* if (data.codproducto !== '' && data.numpoliza !== '') {
      if (this.props.dataEdit) {
        showConfirm('Mantenimiento de poliza estratégica',
          '¿Esta seguro que desea actualizar este registro?',
          () => this.props.STARTACTIONPUT(
            this.props.dataEdit.idepolizaestrategica,
            { idpactivo: data.idpactivo }),
          () => this.props.handleModalOff()
        );
      } else {
        showConfirm('Mantenimiento de poliza estratégica',
          '¿Esta seguro que desea agregar este registro?',
          () => this.props.STARTACTIONPOST(data),
          () => this.props.handleModalOff()
        );
      }
    } else {
      message.error('Todo los campos son requeridos')
    } */
  };

  render() {
    const {
      dataEdit,
      handleModal,
      handleModalOff,
      handleModalAll,
      modalCategoriaVisible,
      modalCuestionarioVisible,
      revisioninformes,
    } = this.props;
    let cuestionario = revisioninformes.revisioncuestionario.cuestionario;
    /* console.log('--------------render form------');
    console.log('modalCategoriaVisible -->' + this.modalCategoriaVisible);
    console.log('modalCuestionarioVisible -->' + this.modalCuestionarioVisible); */

    const cuCategoria = (
      <div>
        <FieldContainer>
          <RowFormQ gutter={16}>
            {cuestionario.map((cuestionariocnf, index) => {
              let imagen = 'data:image/png;base64,' + cuestionariocnf.imagen;
              return (
                <ColForm span={4} key={index}>
                  <Card
                    hoverable
                    key={index}
                    style={{ width: 150 }}
                    cover={
                      <img
                        alt={cuestionariocnf.dsccuestionariocnf}
                        src={imagen}
                        onClick={() => this.openCategoria(index, cuestionariocnf)}
                      />
                    }
                  >
                    <Meta title={cuestionariocnf.dsccuestionariocnf} />
                  </Card>
                </ColForm>
              );
            })}
          </RowFormQ>
        </FieldContainer>
      </div>
    );

    const modalCategorias = (
      <div>
        <FieldContainer>
          <TabsForm>
            {cuestionario[this.state.idx].grupopregunta.map((grupo, index) => {
              return (
                <TabPane tab={grupo.dscgrupopregunta} key={index} value={grupo.dscgrupopregunta}>
                  <FieldContainer key={index}>
                    {grupo.seccion.map((seccion, index) => {
                      return (
                        <div key={index}>
                          <PagePanel titulo={seccion.idpvisible === 1 ? seccion.dscseccion : ''}>
                            <FieldContainer>
                              <RowFormQ gutter={16}>
                                {seccion.agrupador.map((agrupador, index) => {
                                  return (
                                    <div key={index}>
                                      {agrupador.dscagrupador === 'SIMPLE' ? (
                                        agrupador.pregunta.map((pregunta, index) => {
                                          return (
                                            <div key={index}>
                                              {pregunta.idptipopregunta === 'NO_APLICA' ? (
                                                pregunta.dsccontrol === 'SESION1' ? (
                                                  <CaseInput
                                                    pregunta={pregunta}
                                                    changeValues={this.changeValues}
                                                    setPregunta={() => this.setPregunta(pregunta)}
                                                  />
                                                ) : pregunta.dsccontrol === 'GPS' ? (
                                                  <CaseInput
                                                    pregunta={pregunta}
                                                    changeValues={this.changeValues}
                                                    setPregunta={() => this.setPregunta(pregunta)}
                                                  />
                                                ) : pregunta.dsccontrol === 'COMBO' ? (
                                                  <CaseCombo
                                                    pregunta={pregunta}
                                                    changeValues={this.changeValuesCombo}
                                                    setPregunta={() => this.setPregunta(pregunta)}
                                                  />
                                                ) : pregunta.dsccontrol === 'TEXT_AREA' ? (
                                                  <CaseTextArea
                                                    pregunta={pregunta}
                                                    changeValues={this.changeValues}
                                                    setPregunta={() => this.setPregunta(pregunta)}
                                                  />
                                                ) : pregunta.dsccontrol === 'TITULO' ? (
                                                  <CaseTitle pregunta={pregunta} />
                                                ) : pregunta.dsccontrol === 'CHECKBOX' ? (
                                                  <CaseCheckbox
                                                    pregunta={pregunta}
                                                    changeValues={this.changeValuesCheck}
                                                    setPregunta={() => this.setPregunta(pregunta)}
                                                  />
                                                ) : pregunta.dsccontrol === 'CHECKBOX_TITULO' ? (
                                                  <CaseCheckbox
                                                    pregunta={pregunta}
                                                    changeValues={this.changeValuesCheck}
                                                    setPregunta={() => this.setPregunta(pregunta)}
                                                  />
                                                ) : pregunta.dsccontrol === 'CHECKBOX_INPUT' ? (
                                                  <CaseCheckbox
                                                    pregunta={pregunta}
                                                    changeValues={this.changeValuesCheck}
                                                    setPregunta={() => this.setPregunta(pregunta)}
                                                  />
                                                ) : pregunta.dsccontrol === 'RADIO_BUTTON' ? (
                                                  <CaseRadioButton
                                                    pregunta={pregunta}
                                                    changeValues={this.changeValues}
                                                    setPregunta={() => this.setPregunta(pregunta)}
                                                  />
                                                ) : (
                                                  <div />
                                                )
                                              ) : pregunta.idptipopregunta === 'TEXTO' ? (
                                                pregunta.dsccontrol === 'INPUT' ? (
                                                  <CaseInput
                                                    pregunta={pregunta}
                                                    changeValues={this.changeValues}
                                                    setPregunta={() => this.setPregunta(pregunta)}
                                                  />
                                                ) : (
                                                  <div />
                                                )
                                              ) : pregunta.idptipopregunta === 'ENTERO' ? (
                                                pregunta.dsccontrol === 'INPUT' ? (
                                                  <CaseInputNumber
                                                    pregunta={pregunta}
                                                    changeValues={this.changeValuesInputNumber}
                                                    setPregunta={() => this.setPregunta(pregunta)}
                                                  />
                                                ) : (
                                                  <div />
                                                )
                                              ) : pregunta.idptipopregunta === 'DECIMAL_2' ? (
                                                pregunta.dsccontrol === 'INPUT' ? (
                                                  <CaseInputNumber
                                                    pregunta={pregunta}
                                                    changeValues={this.changeValuesInputNumber}
                                                    setPregunta={() => this.setPregunta(pregunta)}
                                                  />
                                                ) : (
                                                  <div />
                                                )
                                              ) : (
                                                <div />
                                              )}
                                            </div>
                                          );
                                        })
                                      ) : agrupador.dscagrupador === 'PORCENTAJE_100' ? (
                                        <div>
                                          {agrupador.pregunta.map((pregunta, index) => {
                                            return (
                                              <div key={index}>
                                                {pregunta.idptipopregunta === 'TEXTO' ? (
                                                  pregunta.dsccontrol === 'INPUT' ? (
                                                    <CaseInput
                                                      pregunta={pregunta}
                                                      changeValues={this.changeValues}
                                                      setPregunta={() => this.setPregunta(pregunta)}
                                                    />
                                                  ) : (
                                                    <div />
                                                  )
                                                ) : pregunta.idptipopregunta === 'ENTERO' ? (
                                                  pregunta.dsccontrol === 'INPUT' ? (
                                                    <CaseInputNumber
                                                      pregunta={pregunta}
                                                      changeValues={this.changeValuesInputNumber}
                                                      setPregunta={() => this.setPregunta(pregunta)}
                                                    />
                                                  ) : (
                                                    <div />
                                                  )
                                                ) : pregunta.idptipopregunta === 'DECIMAL_2' ? (
                                                  pregunta.dsccontrol === 'INPUT' ? (
                                                    <CaseInputNumber
                                                      pregunta={pregunta}
                                                      changeValues={this.changeValuesInputNumber}
                                                      setPregunta={() => this.setPregunta(pregunta)}
                                                    />
                                                  ) : (
                                                    <div />
                                                  )
                                                ) : (
                                                  <div />
                                                )}
                                              </div>
                                            );
                                          })}

                                          <SpanError>
                                            {agrupador.porcentaje100 !== 100
                                              ? 'Error la suma es diferente de 100 ->' +
                                                agrupador.porcentaje100
                                              : ''}
                                          </SpanError>
                                        </div>
                                      ) : agrupador.dscagrupador === 'GRILLA' ? (
                                        <ColForm sm={24} lg={24}>
                                          {' '}
                                          <RowFormQ>
                                            {agrupador.pregunta.map((pregunta, index) => {
                                              return (
                                                <div>
                                                  {pregunta.idptipopregunta === 'NO_APLICA' ? (
                                                    pregunta.dsccontrol === 'COMBO' ? (
                                                      <CaseCombo
                                                        pregunta={pregunta}
                                                        changeValues={this.changeValuesCombo}
                                                        setPregunta={() =>
                                                          this.setPregunta(pregunta)
                                                        }
                                                      />
                                                    ) : (
                                                      <div />
                                                    )
                                                  ) : pregunta.idptipopregunta === 'TEXTO' ? (
                                                    pregunta.dsccontrol === 'INPUT' ? (
                                                      <CaseInput
                                                        pregunta={pregunta}
                                                        changeValues={this.changeValues}
                                                        setPregunta={() =>
                                                          this.setPregunta(pregunta)
                                                        }
                                                      />
                                                    ) : (
                                                      <div />
                                                    )
                                                  ) : pregunta.idptipopregunta === 'ENTERO' ? (
                                                    pregunta.dsccontrol === 'INPUT' ? (
                                                      <CaseInputNumber
                                                        pregunta={pregunta}
                                                        changeValues={this.changeValuesInputNumber}
                                                        setPregunta={() =>
                                                          this.setPregunta(pregunta)
                                                        }
                                                      />
                                                    ) : (
                                                      <div />
                                                    )
                                                  ) : pregunta.idptipopregunta === 'DECIMAL_2' ? (
                                                    pregunta.dsccontrol === 'INPUT' ? (
                                                      <CaseInputNumber
                                                        pregunta={pregunta}
                                                        changeValues={this.changeValuesInputNumber}
                                                        setPregunta={() =>
                                                          this.setPregunta(pregunta)
                                                        }
                                                      />
                                                    ) : (
                                                      <div />
                                                    )
                                                  ) : (
                                                    <div />
                                                  )}
                                                </div>
                                              );
                                            })}
                                          </RowFormQ>{' '}
                                        </ColForm>
                                      ) : (
                                        <div />
                                      )}
                                    </div>
                                  );
                                })}
                              </RowFormQ>
                            </FieldContainer>
                          </PagePanel>
                          <br />
                        </div>
                      );
                    })}
                  </FieldContainer>
                </TabPane>
              );
            })}
          </TabsForm>
        </FieldContainer>
      </div>
    );

    const mantRevisionCuestionario = (
      <div>
        <TabsForm>
          <TabPane tab="Categoria" key="1" children={cuCategoria} />
          <TabPane tab="Media" key="2" />
          <TabPane tab="Garantías y recomendaciones" key="3" />
          <TabPane tab="Scoring" key="4" />
          <TabPane tab="Centro de monitoreo" key="5" />
        </TabsForm>
      </div>
    );
    return (
      <div>
        <Modal
          className={'modal_cuestionario'}
          coverScreen={true}
          title={'Revision de cuestionario'}
          visible={modalCuestionarioVisible}
          width="80%"
          centered={false}
          children={mantRevisionCuestionario}
          onCancel={handleModalAll}
          onOk={this.onSubmit}
          messageTitle={messages.confirmationTitle}
          messageBody={messages.confirmationBdy}
        />
        <ModalQ
          className={'modal_categoria'}
          coverScreen={true}
          title={this.state.tituloModal}
          visible={modalCategoriaVisible}
          width="80%"
          centered={false}
          children={modalCategorias}
          onCancel={handleModalOff}
          //onOk={this.onSubmit}
          messageTitle={messages.confirmationTitle}
          messageBody={messages.confirmationBdy}
        />
      </div>
    );
  }
}

export default FormRevisionCuestionario;
