import React from 'react';
import Grupos from '../Grupos/Grupos';
import { Card, Row, Col, Skeleton } from 'antd';
import { Modal } from '../../../../../components/Modal/Modal';
import { showConfirm } from '../../../../../components/Modal/Utils';
import { Button } from 'antd';
import { ModalWrapper } from '../../../../../components/Modal/Modal.style';
import { successloading, error } from '../../../../../components/Messages/Messages';
import PagePanel from '../../../../../components/Page/PanelPage';
import FormMantGarantiaRecInforme from './FormMantGarantiaRecInforme';
import { consultarCuestionariosPorParametrosAction } from '../../../../../redux/Cuestionario/actions';
import {
  listarGarantiasRecInformeAction,
  crearGarantiaRecInformeAction,
  actualizarGarantiaRecInformeAction,
  eliminarGarantiaRecInformeAction,
  checkGarantiaRecInformeAction,
  unCheckGarantiaRecInformeAction
} from '../../../../../redux/GarantiaRecomendacion/actions';
import {
  ACTIONSUBGARANTIA
} from '../../../../../redux/Common/filters';
import {
  STARTACTIONSEARCH
} from '../../../../../redux/MantGarantia/actions';
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

class GarantiaRecInforme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalMantImagen: false,
      modalMantTexto: false,
      modalMantGarantiaRecInforme: false,

    };  
    this.handleEditGarantia = this.handleEditGarantia.bind(this); 
  }

  obtenerGruposGarantiaInforme(garantiaInforme){
    let gruposGarantia = [];
    var unique = {};
    if(garantiaInforme){
      (garantiaInforme.filter(obj=>obj.chkactivo==0 && obj.indeliminado!=1)).map((item,i)=>{
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
  /*componentDidMount() {    
    const {unCheckGarantiaRecInformeAction } = this.props;
    unCheckGarantiaRecInformeAction();
    listarGarantiasRecInformeAction({
      ideinformeinspeccion: informeInspeccion.ideinformeinspeccion
    });

  }*/
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.modalGarantiaRecomendacionVisible!==prevState.modalGarantiaRecomendacionVisible) {
      /*nextProps.listarGarantiasRecInformeAction({
        ideinformeinspeccion: nextProps.informeInspeccion.ideinformeinspeccion
      });*/
      nextProps.unCheckGarantiaRecInformeAction();
      return {modalGarantiaRecomendacionVisible:nextProps.modalGarantiaRecomendacionVisible, recordSelected:null};
    } else return null;
  }

  async handleActivar(record) {
    const {actualizarGarantiaRecInformeAction,listarGarantiasRecInformeAction,informeInspeccion } = this.props;
    await actualizarGarantiaRecInformeAction({
      idegarantiainforme: record.idegarantiainforme,
      idegarantiainforme2: record.idegarantiainforme2,
      chkactivo: (record.chkactivo?0:1)
    });
    /*await listarGarantiasRecInformeAction({
      ideinformeinspeccion: informeInspeccion.ideinformeinspeccion
    });*/
  }
  async handleEliminarImagen(record) {
    const {actualizarGarantiaRecInformeAction,listarGarantiasRecInformeAction,informeInspeccion } = this.props;
    await actualizarGarantiaRecInformeAction({
      idegarantiainforme: record.idegarantiainforme,
      idegarantiainforme2: record.idegarantiainforme2,
      imagen: '',
      nomimagen:''
    });
    /*await listarGarantiasRecInformeAction({
      ideinformeinspeccion: informeInspeccion.ideinformeinspeccion
    });*/
    this.handleRevisionImagenOff();
  }
  async handleActualizarTexto(record) {
    const {actualizarGarantiaRecInformeAction,listarGarantiasRecInformeAction,informeInspeccion } = this.props;
    await actualizarGarantiaRecInformeAction({
      idegarantiainforme: record.idegarantiainforme,
      idegarantiainforme2: record.idegarantiainforme2,
      texto: this.state.texto
    });
    /*await listarGarantiasRecInformeAction({
      ideinformeinspeccion: informeInspeccion.ideinformeinspeccion
    });*/
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
  handleEditGarantia(params){
    const {recordSelected } = this.state;
    if(!(((params=='editar' || params=='eliminar') && recordSelected) || params=='agregar')){
      error('Se debe seleccionar un registro');
    }else{
      this.setState({ garantiaEdit: recordSelected, modalMantGarantiaRecInforme: (params=='eliminar')?false:true, params: params });
        if(params=='eliminar'){
          showConfirm('Confirmar',
                      '¿Seguro que desea eliminar el registro?',
                      () => {this.props.eliminarGarantiaRecInformeAction({idegarantiainforme: recordSelected.idegarantiainforme
                                                                        ,idegarantiainforme2: recordSelected.idegarantiainforme2});
                            this.setState({recordSelected:null});
                          },
                      () => null
                   );          
            
        }
    }
  }
  handleModalOff = () => {
      this.setState({
          modalMantGarantiaRecInforme: false,
          modalDelete: false,
          garantiaEdit: undefined
      })
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
  onSelect = (record, selected, selectedRows) => {
    this.props.checkGarantiaRecInformeAction(record);
    if(selected === true){        
        this.setState({recordSelected:record});      
    }    
  }
  render() {
    const { garantiaRecInformeLista,
          garantias,
          gruposgarantias,
          subgruposgarantias,
          garantiaRecInforme } = this.props;
    const columns = [
      {
        title: 'Título',
        dataIndex: 'titulo',
        width: '83%',
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
    const { modalMantGarantiaRecInforme,garantiaEdit,params, modalMantTexto,modalMantImagen,recordImagen, recordTexto } = this.state;
    const {
            garantias,
            gruposgarantias,
            subgruposgarantias,
            ACTIONSUBGARANTIA,
            STARTACTIONSEARCH,
            crearGarantiaRecInformeAction,
            actualizarGarantiaRecInformeAction,
            eliminarGarantiaRecInformeAction,
            informeInspeccion,
            garantiaRecInforme
        } = this.props;
    const rowSelection = {
      onSelect: this.onSelect,
      type: 'radio',
      getCheckboxProps: record => ({
          checked: record.checked ? true : false
      })
  }
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
              rowSelection={rowSelection}
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
                              <Button className="cancelar" key="cancelGarantiaRecoInf" onClick={()=> this.handleRevisionImagenOff()}>
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
                                                            <label>Nombre de imagen</label>
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
                              <Button className="cancelar" key="cancelGarantiasInfo" onClick={()=> this.handleRevisionTextoOff()}>
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
                                                            <label>Texto de la Imagen</label>
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
        {modalMantGarantiaRecInforme ? <FormMantGarantiaRecInforme
                                      modal={modalMantGarantiaRecInforme}
                                      dataEdit={garantiaEdit}
                                      params={params}
                                      gruposgarantias={gruposgarantias}
                                      garantias={garantias}
                                      informeInspeccion={informeInspeccion}
                                      subgruposgarantias={subgruposgarantias}
                                      ACTIONSUBGARANTIA={ACTIONSUBGARANTIA}
                                      STARTACTIONSEARCH={STARTACTIONSEARCH}
                                      handleModalOff={this.handleModalOff}
                                      crearGarantiaRecInformeAction={crearGarantiaRecInformeAction}
                                      actualizarGarantiaRecInformeAction={actualizarGarantiaRecInformeAction}
                                      eliminarGarantiaRecInformeAction={eliminarGarantiaRecInformeAction}
                                      checkGarantiaRecInformeAction={checkGarantiaRecInformeAction}
                                  /> : ''
        } 
      </FieldContainer >
      
    );
  }
}

const mapPropsState = state => ({
  garantiaRecInformeLista: state.garantiaRecInforme.items,
  garantias: state.garantias.garantias,
  gruposgarantias: state.common.gruposgarantias,
  subgruposgarantias: state.common.subgruposgarantias,
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
    dispatch(eliminarGarantiaRecInformeAction(payload)),    
  checkGarantiaRecInformeAction: payload => 
    dispatch(checkGarantiaRecInformeAction(payload)),
  unCheckGarantiaRecInformeAction: () => 
    dispatch(unCheckGarantiaRecInformeAction()),
  ACTIONSUBGARANTIA: (id) => dispatch(ACTIONSUBGARANTIA(id)),
  STARTACTIONSEARCH: (data) => dispatch(STARTACTIONSEARCH(data)),
});

export default connect(
  mapPropsState,
  mapPropsDispatch,
  null,
  {forwardRef : true}
)(GarantiaRecInforme);
