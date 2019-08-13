import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import { messages } from '../../../../util/messages';
import { showConfirm } from '../../../../components/Modal/Utils';
import { successloading, error } from '../../../../components/Messages/Messages';
import PagePanel from '../../../../components/Page/PanelPage';
import {
    FieldContainer,
    Field,
    ColForm,
    ColFormLabel,
    RowForm,
    SelectForm,
    InputForm,
    InputNumberForm,
} from '../../../../components/Util/util.style';


const Option = SelectForm.Option;
const { TextArea } = InputForm;

class FormMantGarantia extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            idegrupogarantia: props.dataEdit ? props.dataEdit.grupogarantia.idegrupogarantia : 'Seleccione',
            idesubgrupogarantia: props.dataEdit ? props.dataEdit.subgrupogarantia.idesubgrupogarantia : 'Seleccione',
            titulo: props.dataEdit ? props.dataEdit.titulo : '',
            dscgarantia: props.dataEdit ? props.dataEdit.dscgarantia : '',
            prioridad: props.dataEdit ? props.dataEdit.prioridad : 0,
            statusprioridad: props.dataEdit ? false : true,
            ERROR: [],
        }
    }
    async componentDidMount() {
        if (this.props.dataEdit) {
            await this.props.ACTIONSUBGARANTIA(this.props.dataEdit.grupogarantia.idegrupogarantia)
            await this.props.STARTACTIONGARANTIAPRIORIDAD(this.props.dataEdit.subgrupogarantia.idesubgrupogarantia);
        }
    }
    changeGarantia = (e) => {
        this.props.ACTIONSUBGARANTIA(e)
        this.setState({ idegrupogarantia: e,
            idesubgrupogarantia:'Seleccione', newprioridad:1})
    }
    changeSubGarantia = async (e) => {
        this.props.STARTACTIONGARANTIAPRIORIDAD(e);
       // successloading(messages.garantias.searchprioridad, messages.garantias.prioridad);
        this.setState({ idesubgrupogarantia: e })
    }
    changePrioridad = (e) => {
        const { dataEdit, garantiaprioridad } = this.props;
        if (dataEdit) {
            if (e <= garantiaprioridad - 1) {
                this.setState({ prioridad: e, statusprioridad: false })
            } else {
                error(`La maxima prioridad es: ${garantiaprioridad - 1}`)
            }
        } else {
            this.setState({ prioridad: e, statusprioridad: false })
        }
    }
    changeTitulo = (e) => {
        const titulo = e.target.value;
        this.setState({ titulo })
    }
    changeDescription = (e) => {
        const dscgarantia = e.target.value;
        this.setState({ dscgarantia })
    }
    handleModalOff = () => {
        this.setState({ modalConfimation: false })
    }
    onSubmit = () => {
        const { dataEdit, garantiaprioridad, STARTACTIONPUT, STARTACTIONPOST, handleModalOff } = this.props;
        let data = {
            idegrupogarantia: this.state.idegrupogarantia,
            idesubgrupogarantia: this.state.idesubgrupogarantia,
            prioridad: this.state.statusprioridad ? garantiaprioridad : this.state.prioridad,
            titulo: this.state.titulo.trim(),
            dscgarantia: this.state.dscgarantia,
            idpactivo: 9
        }

        if (data.idegrupogarantia !== 'Seleccione' && data.idesubgrupogarantia !== 'Seleccione' &&
            data.titulo !== '' && data.prioridad !== null && data.prioridad !== 0 && data.dscgarantia !== '') {
            if (dataEdit) {
                showConfirm(messages.garantias.title,
                    messages.confirmationUpdate,
                    () => STARTACTIONPUT(dataEdit.idegarantiarec, data),
                    () => handleModalOff()
                );
            } else {
                showConfirm(messages.garantias.title,
                    messages.confirmationInsert,
                    () => STARTACTIONPOST(data),
                    () => handleModalOff()
                );
            }
        } else {
            /*if(data.prioridad === 0){
                error(messages.garantias.noprioridad)
            }else{
                error(messages.garantias.validacion)
            }*/
            if (data.idegrupogarantia === 'Seleccione') {
                error(messages.garantias.validaciongarantia);
                return false;
            }

            if (data.idesubgrupogarantia === 'Seleccione') {
                error(messages.garantias.validacionsubgarantia);
                return false;
            }

            if (data.titulo === '') {
                error(messages.garantias.validaciontitulo);
                return false;
            }

            if (data.prioridad === 0 || data.prioridad === null) {
                error(messages.garantias.noprioridad);
                return false;
            }

            if (data.dscgarantia === '') {
                error(messages.garantias.validaciondscgarantia);
                return false;
            }
        }
    }


    render() {
        let newprioridad = 1;
        const {
            idegrupogarantia,
            idesubgrupogarantia,
            titulo,
            dscgarantia,
            prioridad,
            statusprioridad
        } = this.state;

        const {
            gruposgarantias,
            subgruposgarantias,
            garantiaprioridad,
            dataEdit,
            modal,
            handleModalOff,
        } = this.props;
        if (statusprioridad) {
            newprioridad = garantiaprioridad;
        } else {
            newprioridad = prioridad;
        }
        const formMantGarantia = (
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={24} lg={24}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Grupo de Garantía:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeGarantia}
                                    value={idegrupogarantia}
                                    disabled={dataEdit ? true : false}
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
                    <ColForm sm={24} lg={24}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Sub-Grupo de Garantía:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeSubGarantia}
                                    value={idesubgrupogarantia}
                                    disabled={dataEdit ? true : false}
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
                </RowForm>
                <RowForm gutter={16}>
                    <ColForm sm={24} lg={24}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Titulo de Garantía:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeTitulo}
                                    value={titulo}
                                    placeholder='Titulo'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={24}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Prioridad:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <InputNumberForm
                                    min={1}
                                    onChange={this.changePrioridad}
                                    value={newprioridad}
                                    placeholder='Prioridad'
                                    disabled={dataEdit ? false : true}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={24}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Descripción de Garantía:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <TextArea
                                    onChange={this.changeDescription}
                                    value={dscgarantia}
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
            <PagePanel titulo='Datos de la garantía' children={formMantGarantia} />
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
                />
            </div>
        )
    }
}

export default FormMantGarantia;