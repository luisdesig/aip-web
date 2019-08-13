import React from 'react';
import { Modal } from '../../../../../components/Modal/Modal';
import { messages } from '../../../../../util/messages';
import { showConfirm } from '../../../../../components/Modal/Utils';
import { successloading, error } from '../../../../../components/Messages/Messages';
import PagePanel from '../../../../../components/Page/PanelPage';
import {
    FieldContainer,
    Field,
    ColForm,
    ColFormLabel,
    RowForm,
    SelectForm,
    InputForm,
    InputNumberForm,
    RadioForm,
} from '../../../../../components/Util/util.style';

const RadioGroup = RadioForm.Group;
const Option = SelectForm.Option;
const { TextArea } = InputForm;

class FormMantGarantiaRecInforme extends React.Component {

    constructor(props) {
        super(props)
        if(props.params=='editar'){
            this.state = {
                idegrupogarantia: props.dataEdit ? props.dataEdit.idegrupogarantia : 'Seleccione',
                idesubgrupogarantia: props.dataEdit ? props.dataEdit.idesubgrupogarantia : 'Seleccione',
                idegarantiarec: props.dataEdit ? props.dataEdit.idegarantiarec : 'Seleccione',
                plazovencimiento: props.dataEdit ? props.dataEdit.plazovencimiento : 'Seleccione',
                indgarrec: props.dataEdit ? props.dataEdit.indgarrec : '',
                comentario: props.dataEdit ? props.dataEdit.comentario : '',
                disabledPlazo: props.dataEdit ? (props.dataEdit.indgarrec==112) : true,
                ERROR: [],
            }
        }else{
            this.state = {
                idegrupogarantia: 'Seleccione',
                idesubgrupogarantia: 'Seleccione',
                idegarantiarec: 'Seleccione',
                plazovencimiento:  'Seleccione',
                indgarrec:  '',
                comentario: '',
                disabledPlazo:  true,
                ERROR: [],
            }
        }
    }
    async componentDidMount(){
        if(this.props.dataEdit && this.props.params=='editar'){
            await this.props.ACTIONSUBGARANTIA(this.props.dataEdit.idegrupogarantia);
            await this.props.STARTACTIONSEARCH({
                                                idegrupogarantia: this.props.dataEdit.idegrupogarantia,
                                                idesubgrupogarantia: this.props.dataEdit.idesubgrupogarantia,
                                                dscgarantia: "",
                                                idegarantiarec: "",
                                                titulo: ""          
                                            });
        }
        if(this.state.idegrupogarantia=='Seleccione'){
            this.props.ACTIONSUBGARANTIA(null);
            this.props.STARTACTIONSEARCH({            
                idegrupogarantia: null,
                idesubgrupogarantia: null,
                dscgarantia: "",
                idegarantiarec: "",
                titulo: ""          
            });
        }
    }

    changeGarantia = (e,option) => {
        this.props.ACTIONSUBGARANTIA(e);
        this.setState({ idegrupogarantia: e, nombregrupo: option.props.children,idesubgrupogarantia: 'Seleccione', idegarantiarec:'Seleccione', comentario: ''});
        this.props.STARTACTIONSEARCH({            
            idegrupogarantia: null,
            idesubgrupogarantia: null,
            dscgarantia: "",
            idegarantiarec: "",
            titulo: ""          
        });
    }
    changeSubGarantia = async (e) => {        
        this.props.STARTACTIONSEARCH({            
            idegrupogarantia: this.state.idegrupogarantia,
            idesubgrupogarantia: e,
            dscgarantia: "",
            idegarantiarec: "",
            titulo: ""          
        });
        this.setState({ idesubgrupogarantia: e });
    }
    changeTituloGarantia = async (e,option) => {       
        this.setState({ idegarantiarec: e, titulo:option.props.children, comentario:option.props['data-desc']});
    }
    changeTipo = (e) => {
        let valor = parseInt(e.target.value);
        this.setState({ indgarrec: valor, disabledPlazo:(valor==112) });
        if(valor==112)
            this.setState({plazovencimiento: 'Seleccione' });      
    }

    changeTitulo = (e) => {
        const titulo = e.target.value;
        if(titulo.match(/^[ ña-zA-Z]{0,24}$/)){
            this.setState({ titulo})
        }
    }
    changeDescription = (e) => {
        const comentario = e.target.value;
        this.setState({ comentario})
        
    }
    changeDiasVencimiento = (e) => {
        this.setState({ plazovencimiento: e });       
    }

    handleModalOff = () => {
        this.setState({ modalConfimation: false })
    }

    onSubmit = () => {
        const { dataEdit, STARTACTIONPUT, 
                STARTACTIONPOST, handleModalOff, params,
                crearGarantiaRecInformeAction,
                actualizarGarantiaRecInformeAction,
                eliminarGarantiaRecInformeAction } = this.props;
        
        if(params=='agregar'){
            if (this.state.comentario!='' && this.state.indgarrec && (this.state.plazovencimiento != 'Seleccione' || (this.state.indgarrec==112)) && this.state.idegarantiarec != 'Seleccione' ) {    
                let data = {
                    idegrupogarantia: this.state.idegrupogarantia,
                    idesubgrupogarantia: this.state.idesubgrupogarantia,
                    titulo: this.state.titulo,
                    nombregrupo: this.state.nombregrupo,
                    idegarantiarec: this.state.idegarantiarec,                       
                    chkactivo: 0,
                    comentario: this.state.comentario,
                    indgarrec: this.state.indgarrec,
                    plazovencimiento: this.state.plazovencimiento,
                    ideinformeinspeccion: this.props.informeInspeccion.ideinformeinspeccion
                }
                crearGarantiaRecInformeAction(data);
                handleModalOff();
            }else{
                error('Completar los Datos Obligatorios.');
            }
        }
        if(params=='editar'){
            if (this.state.comentario!='' && this.state.indgarrec!=null && (this.state.plazovencimiento != 'Seleccione' || (this.state.indgarrec==112))) {
                let data = {   
                    comentario: this.state.comentario,
                    indgarrec: this.state.indgarrec,
                    plazovencimiento: this.state.plazovencimiento,
                    idegarantiainforme: dataEdit.idegarantiainforme,
                    idegarantiainforme2: dataEdit.idegarantiainforme2
                }
                actualizarGarantiaRecInformeAction(data);
                handleModalOff();
            }else{
                error('Completar los Datos Obligatorios.');
            }
        }       
    }


    render() {
        let newprioridad = 0;
        const {
            idegrupogarantia, 
            idesubgrupogarantia, 
            indgarrec,
            titulo, 
            comentario,
            prioridad,
            statusprioridad,
            idegarantiarec,
            plazovencimiento,
            disabledPlazo
        } = this.state;

        const {
            gruposgarantias,
            garantias,
            subgruposgarantias,
            garantiaprioridad,
            dataEdit,
            modal,
            handleModalOff,
            params
        } = this.props;
        const disabledField = (dataEdit && (params=='editar'));
        const diasVencimientoLista = [15,30,45,60];
        if(statusprioridad){
            newprioridad = garantiaprioridad;
        }else{
            newprioridad = prioridad;
        }
        const formMantGarantia = (
                    <FieldContainer>
                        <RowForm gutter={16}>
                            <ColForm sm={24} lg={12}>
                                <Field>
                                    <ColFormLabel sm={10}>
                                        <label>Grupo de garantía</label>
                                    </ColFormLabel>
                                    <ColForm sm={14}>
                                        <SelectForm
                                            showSearch
                                            optionFilterProp='children'
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            onChange={(value,option) => this.changeGarantia(value,option)}
                                            value={idegrupogarantia}
                                            disabled={disabledField}
                                        >
                                            {
                                                gruposgarantias.map((item, index) => {
                                                    return (
                                                        <Option key={index} value={item.idegrupogarantia}>
                                                            {item.nombre}
                                                        </Option>
                                                    )
                                                })
                                            }
                                        </SelectForm>
                                    </ColForm>
                                </Field>
                            </ColForm>
                            <ColForm sm={24} lg={12}>
                                <Field>
                                    <ColFormLabel sm={8}>
                                        <label>Tipo</label>
                                    </ColFormLabel>
                                    <ColForm sm={16}>
                                        <RadioGroup                
                                            onChange={this.changeTipo}
                                            value={indgarrec.toString()}                                            
                                        > <RadioForm
                                            style={{float:'left'}}
                                            key={"rf-1"}
                                            value="112">                
                                            Recomendación
                                            </RadioForm>
                                            <RadioForm
                                            style={{float:'left'}}
                                            key={"rf-2"}
                                            value="111">                
                                            Garantía
                                            </RadioForm>                  
                                        </RadioGroup>             
                                    </ColForm>
                                </Field>
                            </ColForm>
                        </RowForm>                             
                        <RowForm gutter={16}>   
                            <ColForm sm={24} lg={12}>
                                <Field>
                                    <ColFormLabel sm={10}>
                                        <label>Sub-Grupo garantía</label>
                                    </ColFormLabel>
                                    <ColForm sm={14}>
                                        <SelectForm
                                            showSearch
                                            optionFilterProp='children'
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            onChange={this.changeSubGarantia}
                                            value={idesubgrupogarantia}
                                            disabled={disabledField}
                                        >
                                            {subgruposgarantias.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item.idesubgrupogarantia}>
                                                        {item.nombre}
                                                    </Option>
                                                )
                                            })}
                                        </SelectForm>
                                    </ColForm>
                                </Field>
                            </ColForm>
                            <ColForm sm={24} lg={12}>
                                <Field>
                                    <ColFormLabel sm={10}>
                                        <label>Días de vencimiento</label>
                                    </ColFormLabel>
                                    <ColForm sm={14}>
                                        <SelectForm
                                            showSearch
                                            optionFilterProp='children'
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            onChange={this.changeDiasVencimiento}
                                            value={plazovencimiento}
                                            disabled={disabledPlazo}
                                        >
                                            {diasVencimientoLista.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item}>
                                                        {item}
                                                    </Option>
                                                )
                                            })}
                                        </SelectForm>
                                    </ColForm>
                                </Field>
                            </ColForm>
                        </RowForm>
                        <RowForm gutter={16}>
                            <ColForm sm={24} lg={24}>
                                <Field>
                                    <ColFormLabel sm={10}>
                                        <label>Titulo garantía</label>
                                    </ColFormLabel>
                                    <ColForm sm={14}>
                                            <SelectForm
                                                    showSearch
                                                    optionFilterProp='children'
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    onChange={(value,option)=>this.changeTituloGarantia(value,option)}
                                                    value={idegarantiarec}
                                                    disabled={disabledField}
                                            >
                                                {garantias.map((item, index) => {
                                                    return (
                                                        <Option key={index} value={item.idegarantiarec} data-desc={item.dscgarantia}>
                                                            {item.titulo}
                                                        </Option>
                                                    )
                                                })}
                                            </SelectForm>
                                    </ColForm>
                                </Field>
                            </ColForm>
                            <ColForm sm={24} lg={24}>
                                <Field>
                                    <ColFormLabel sm={10}>
                                        <label>Descripción de la garantía</label>
                                    </ColFormLabel>
                                    <ColForm sm={14}>
                                        <TextArea 
                                            onChange={this.changeDescription}
                                            value={comentario}
                                            placeholder='Describa la garantía'
                                            rows={3}
                                        />
                                    </ColForm>
                                </Field>
                            </ColForm>
                        </RowForm>
                    </FieldContainer>
        )
        const mantGarantia = (
            <PagePanel titulo='Garantías y Recomendaciones' children={formMantGarantia}/>
        )
        return (
            <div>
                <Modal
                    title={dataEdit ? messages.garantias.actualizar : messages.garantias.agregar}
                    visible={modal}
                    centered={false}
                    children={mantGarantia}
                    onCancel={handleModalOff}
                    onOk={this.onSubmit}
                    messageTitle={messages.confirmationTitle}
                    messageBody={messages.confirmationBdy}
                    width={850}
                />
            </div>
        )
    }
}

export default FormMantGarantiaRecInforme;