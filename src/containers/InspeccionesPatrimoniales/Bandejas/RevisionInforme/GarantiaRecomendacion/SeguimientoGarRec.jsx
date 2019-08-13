import React from 'react';
import Grupos from '../Grupos/Grupos';
import { Card, Row, Col, Skeleton } from 'antd';
import { Modal } from '../../../../../components/Modal/Modal';
import { Button } from 'antd';
import { ModalWrapper } from '../../../../../components/Modal/Modal.style';
import PagePanel from '../../../../../components/Page/PanelPage';
import { consultarCuestionariosPorParametrosAction } from '../../../../../redux/Cuestionario/actions';
import {
  listarGarantiasRecInformeAction,
  crearGarantiaRecInformeAction,
  actualizarGarantiaRecInformeAction,
  eliminarGarantiaRecInformeAction
} from '../../../../../redux/GarantiaRecomendacion/actions';
import { connect } from 'react-redux';

import { IconWrapper, ButtonForm } from '../../../../../components/Util/util.style';
import { showDeleteConfirm } from '../../../../../components/Modal/Utils';

import {
  FieldContainer,
  Field,
  ColForm,
  ColFormLabel,
  RowForm,
  SelectForm,
  InputForm,
  RadioForm,
  InputNumberForm,
} from '../../../../../components/Util/util.style';
import Table from '../../../../../components/Table/Table';
const { TextArea } = InputForm;
const { Meta } = Card;
const RadioGroup = RadioForm.Group;

class SeguimientoGarRec extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalMantImagen: false,
      modalMantTexto: false
    };   
  }

  obtenerGruposGarantiaInforme(garantiaInforme){
    let gruposGarantia = [];
    var unique = {};
    if(garantiaInforme){
      garantiaInforme.filter(obj=>obj.indeliminado!=1).map((item,i)=>{
          if(typeof(unique[item.idegrupogarantia])=== "undefined"){
            let grupo = {idegrupogarantia:item.idegrupogarantia,nombregrupo:item.nombregrupo,lista:[{...item,order:1}]};
            gruposGarantia.push(grupo);
            unique[item.idegrupogarantia]=0;
          }else{
            gruposGarantia.map((grupo,index)=>{
              if(grupo.idegrupogarantia==item.idegrupogarantia){
                grupo.lista.push({...item,order:grupo.lista.filter(obj=>obj.indgarrec==item.indgarrec).length+1});
              }
            });  
          }
      });
    }
    return gruposGarantia.sort((a,b)=>{
                                      if ( a.nombregrupo < b.nombregrupo )
                                          return -1;
                                      if ( a.nombregrupo > b.nombregrupo )
                                          return 1;
                                      return 0;
                                      });
  }
  componentDidMount() {
    /*const {informeInspeccion,listarGarantiasRecInformeAction } = this.props;
    listarGarantiasRecInformeAction({
      ideinformeinspeccion: informeInspeccion.ideinformeinspeccion
    });*/
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.modalSeguimientoGarRecVisible!==prevState.modalSeguimientoGarRecVisible) {
      /*nextProps.listarGarantiasRecInformeAction({
        ideinformeinspeccion: nextProps.informeInspeccion.ideinformeinspeccion
      });*/
      return {modalSeguimientoGarRecVisible:nextProps.modalSeguimientoGarRecVisible};
    } else return null;
  }

  async handleActivar(record) {
    const {actualizarGarantiaRecInformeAction,listarGarantiasRecInformeAction,informeInspeccion } = this.props;
    await actualizarGarantiaRecInformeAction({
      idegarantiainforme: record.idegarantiainforme,
      idegarantiainforme2: record.idegarantiainforme2,
      chkactivo: (record.chkactivo?0:1)
    });
  }
  async handleEliminarImagen(record) {
    const {actualizarGarantiaRecInformeAction,listarGarantiasRecInformeAction,informeInspeccion } = this.props;
    await actualizarGarantiaRecInformeAction({
      idegarantiainforme: record.idegarantiainforme,
      idegarantiainforme2: record.idegarantiainforme2,
      imagen: '',
      nomimagen:''
    });
    this.handleRevisionImagenOff();
  }
  async handleActualizarTexto(record) {
    const {actualizarGarantiaRecInformeAction,listarGarantiasRecInformeAction,informeInspeccion } = this.props;
    await actualizarGarantiaRecInformeAction({
      idegarantiainforme: record.idegarantiainforme,
      idegarantiainforme2: record.idegarantiainforme2,
      texto: this.state.texto
    });
    this.handleRevisionTextoOff();
  }
  changeTexto(e){
    this.setState({ texto:e.target.value});
  }

  handleRevisionImagen(record) {
    this.setState({ modalMantImagen: true, recordImagen:record});
  }
  handleRevisionTexto(record) {
    this.setState({ modalMantTexto: true, recordTexto:record, texto:record.texto});
  }
  handleRevisionImagenOff(record) {
    this.setState({ modalMantImagen: false });
  }
  handleRevisionTextoOff(record) {
    this.setState({ modalMantTexto: false });
  }
  /*static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.categoria.ideCategoria !== prevState.ideCategoria) {
      nextProps.consultarCuestionariosPorParametrosAction({
        idecategoria: nextProps.categoria.ideCategoria,
        ideinformeinspeccion: nextProps.informeInspeccion.ideinformeinspeccion,
      });
      return { ideCategoria: nextProps.categoria.ideCategoria };
    } else return null;
  }*/

  // RN038
  updateQuestion = response => {
    const { guardarRespuestaAction, informeInspeccion } = this.props;
    const respuesta = { inspectionId: informeInspeccion.ideinformeinspeccion, ...response };
    guardarRespuestaAction(respuesta);
  };

  render() {
    const { garantiaRecInformeLista, garantiaRecInforme } = this.props;
    const columns = [
      {
        title: 'Título',
        dataIndex: 'titulo',
        width: '70%',
        sorter: (a, b) => {
          if (a.titulo < b.titulo) return -1;
          if (a.titulo > b.titulo) return 1;
          return 0;
        },
        render: (text, record) => { 
          let tipo ;
          switch (record.indgarrec) {
            case 111: 
                tipo='G';
            break;
            case 112:
                tipo='R';
            break;
          }
          return tipo+record.order + '-' +text;
        }
      },
      {
        title: 'Activo',
        dataIndex: 'chkactivo',
        width: '16%',
        render: (text, record) => {
          return (
            <div className="icons-acciones">
              <RadioGroup                
                onChange={() => this.handleActivar(record)}
                defaultValue={text+""}
              > <RadioForm
                  key={record.idegarantiainforme+"-1"}
                  value="1">                
                  SI
                </RadioForm>
                <RadioForm
                  key={record.idegarantiainforme+"-2"}
                  value="0">                
                  NO
                </RadioForm>                  
              </RadioGroup>
            </div>
          );
        }
      },
      {
        title: 'Imagen',
        dataIndex: 'imagen',
        width: '7%',
        render: (text, record) => {          
          return (          
              <div className="icons-acciones">
                {text && 
                  <IconWrapper
                  type="file-image"
                  theme="filled"
                  className="snippets"
                  onClick={() => this.handleRevisionImagen(record)}
                  />
                }
              </div>                       
          );
        }
      },
      {
        title: 'Texto',
        dataIndex: 'texto',
        width: '7%',
        render: (text, record) => {          
          return (          
              <div className="icons-acciones">
                {(text) && 
                  <IconWrapper
                  type="file-text"
                  theme="filled"
                  className="snippets"
                  onClick={() => this.handleRevisionTexto(record)}
                  />
                }
                {(!text) && 
                  <IconWrapper
                  type="file-add"
                  theme="filled"
                  className="snippets"
                  onClick={() => this.handleRevisionTexto(record)}
                  />
                }
              </div>                       
          );
        }
      }
    ];
    var grupos = this.obtenerGruposGarantiaInforme(garantiaRecInformeLista);
    console.log("GRUPOSSS",grupos);
    //if (!Array.isArray(grupos) || grupos.length === 0) {
    if(garantiaRecInforme.cargando){
      return (
        <div>
          {[{}, {}].map(() => {
            return (
              <Row gutter={16} key={1}>
                {[{}, {}].map(() => {
                  return (
                    <Col style={{ marginBottom: 5 }} key={2} span={12}>
                      <Card key={1} style={{}} loading={true}>
                        <Skeleton loading={true} active paragraph title>
                          <Meta title={''} description={''} />
                        </Skeleton>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </div>
      );
    }
    return this.renderLista(grupos,columns);
  }

  renderLista(grupos,columns) {
    const { modalMantTexto,modalMantImagen,recordImagen, recordTexto } = this.state;
    return (
      <FieldContainer>
        {grupos.map((item,i)=>
            <div>
            <Table
              title={item.nombregrupo}
              rowKey="idegarantiainforme"
              columns={columns}
              scroll={{ x: '100%' }}
              dataSource={item.lista}
            />
            <br/>
            </div>
          )
        }
        {(!Array.isArray(grupos) || grupos.length === 0) && 
          <Row gutter={16} key={1}>            
                <Col style={{ marginBottom: 5 }} key={2} span={12}>
                  <Card key={1} style={{}}>
                    No hay Registros
                  </Card>
                </Col>             
          </Row>
        }   
        {
        modalMantImagen ?  <ModalWrapper
                            title="Imagen"
                            visible={true}                            
                            centered={true}
                            onCancel={()=> this.handleRevisionImagenOff()}
                            footer={[
                              <Button className="cancelar" key="cancelSeguimiento" onClick={()=> this.handleRevisionImagenOff()}>
                                Cancelar
                              </Button>,
                              <Button
                                className="aceptar"
                                key="submit"
                                type="primary"
                                style={{ display: 'inline' }}
                                onClick={()=> this.handleEliminarImagen(recordImagen)}
                              >
                                Eliminar
                              </Button>,
                            ]}
                          >
                            <FieldContainer>                                
                                <RowForm gutter={16}>
                                      <ColForm sm={24} lg={24}>
                                                    <Field>
                                                        <ColFormLabel sm={8}>
                                                            <label>Nombre de de la imagen</label>
                                                        </ColFormLabel>
                                                        <ColForm sm={16}>
                                                            <input                                                    
                                                                value={recordImagen.nomimagen}
                                                                placeholder='Titulo'
                                                            />
                                                        </ColForm>
                                                    </Field>
                                      </ColForm>
                                      <ColForm sm={24} lg={24}>
                                                      <img
                                                        style={{ "max-width": 420 }}
                                                        alt={recordImagen.nomimagen ? recordImagen.nomimagen : ''}                                           
                                                        src={recordImagen.imagen ? 'data:image/png;base64,' + recordImagen.imagen : null}                                            
                                                      />
                                      </ColForm>                                    
                                </RowForm>
                            </FieldContainer>
                          </ModalWrapper> : ''
        } 
        {
        modalMantTexto ?  <ModalWrapper
                            title="Texto"
                            visible={true}                            
                            centered={true}
                            onCancel={()=> this.handleRevisionTextoOff()}
                            footer={[
                            <Button className="cancelar" key="cancelRevision" onClick={()=> this.handleRevisionTextoOff()}>
                                Cancelar
                            </Button>,
                            <Button
                              className="aceptar"
                              key="submit"
                              type="primary"
                              style={{ display: 'inline' }}
                              onClick={async ()=> {await this.changeTexto({target:{value:''}});
                                            this.handleActualizarTexto(recordTexto)}}
                            >
                              Eliminar
                            </Button>,
                              <Button
                                className="aceptar"
                                key="submit"
                                type="primary"
                                style={{ display: 'inline' }}
                                onClick={()=> this.handleActualizarTexto(recordTexto)}
                              >
                                Guardar
                              </Button>,
                            ]}
                          >
                            <FieldContainer>                                
                                <RowForm gutter={16}>
                                      <ColForm sm={24} lg={24}>
                                                    <Field>
                                                        <ColFormLabel sm={8}>
                                                            <label>Texto de la garantía</label>
                                                        </ColFormLabel>
                                                        <ColForm sm={16}>
                                                            <TextArea 
                                                                onChange={(e)=>this.changeTexto(e)}
                                                                value={this.state.texto}
                                                                defaultValue={recordTexto.texto}
                                                                placeholder='Ingrese un Texto'
                                                                rows={3}
                                                            />
                                                        </ColForm>
                                                    </Field>
                                      </ColForm>                                   
                                </RowForm>
                            </FieldContainer>
                          </ModalWrapper> : ''
        }   
      </FieldContainer >
      
    );
  }
}

const mapPropsState = state => ({
  garantiaRecInformeLista: state.garantiaRecInforme.items,
  garantiaRecInforme: state.garantiaRecInforme
});

const mapPropsDispatch = dispatch => ({
  listarGarantiasRecInformeAction: payload =>
    dispatch(listarGarantiasRecInformeAction(payload)),
  crearGarantiaRecInformeAction: payload =>
    dispatch(crearGarantiaRecInformeAction(payload)),
  actualizarGarantiaRecInformeAction: payload => 
    dispatch(actualizarGarantiaRecInformeAction(payload)),
  eliminarGarantiaRecInformeAction: payload => 
    dispatch(eliminarGarantiaRecInformeAction(payload))
});

export default connect(
  mapPropsState,
  mapPropsDispatch,
)(SeguimientoGarRec);
