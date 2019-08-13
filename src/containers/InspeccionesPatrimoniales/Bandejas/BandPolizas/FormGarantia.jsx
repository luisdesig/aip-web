import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import { messages } from '../../../../util/messages';
import { showConfirm } from '../../../../components/Modal/Utils';
import PagePanel from '../../../../components/Page/PanelPage';
import {
    FieldContainer,
    Field,
    ColForm,
    ColFormLabel,
    RowForm,
    SelectForm,
    InputForm,
} from '../../../../components/Util/util.style';
import { message } from 'antd';
import { TIPOGARANTIA } from '../../../../services/constants';

const Option = SelectForm.Option;
const { TextArea } = InputForm;
const IDPESTSOLICITUDGARANTIA_GARANTIA = 100;
const IDPESTSOLICITUDGARANTIA_RECOMENDACION = 101;
const INDELIMINADO = 0;

class FormGarantia extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            idegrupogarantia: 'Seleccione',
            idesubgrupogarantia: 'Seleccione',
            tiempo: 'Seleccione',
            titulo: 'Seleccione',
            dscgarantia: '',
            garantia: {},
            idpestsolicitudgarantia: 100
        }
    }

    changeGarantia = (e) => {
        this.props.ACTIONSUBGARANTIA(e);
        this.props.ACTIONCLEANINMUEBLES()
        this.setState({
            idegrupogarantia: e,
            idesubgrupogarantia: 'Seleccione',
            tiempo: 'Seleccione',
            titulo: 'Seleccione',
            dscgarantia: ''
        })
    }
    changeTipoGarantia = (e) => {
        this.setState({ idpestsolicitudgarantia: e, tiempo: 'Seleccione' })
    }
    changeSubGarantia = async (e) => {
        this.props.STARTACTIONGETSUBGARANTIA({ "idesubgrupogarantia": e })
        this.setState({
            idesubgrupogarantia: e,
            tiempo: 'Seleccione',
            titulo: 'Seleccione',
            dscgarantia: ''
        })
    }
    changeDias = (e) => {
        this.setState({ tiempo: e })
    }
    changeTitulo = (e) => {
        let garantiarec = this.props.inmueblegarantias.find(res => res.idegarantiarec === e);
        this.setState({
            titulo: e,
            dscgarantia: garantiarec.dscgarantia,
            idegarantiarec: garantiarec.idegarantiarec,
            garantia: garantiarec
        });

    }
    changeDescription = (e) => {
        const dscgarantia = e.target.value;
        this.setState({ dscgarantia })
    }
    onSubmit = () => {
        const data = this.state.garantia;
        data.tiempo = this.state.tiempo;
        data.descripcion = this.state.dscgarantia;
        data.idpestsolicitudgarantia = this.state.idpestsolicitudgarantia;
        data.tipo = this.state.idpestsolicitudgarantia === IDPESTSOLICITUDGARANTIA_GARANTIA ? 'Garantía' : 'Recomendación'
        data.indeliminado = INDELIMINADO
        if (this.props.params !== 'inspeccion') {
            if (this.state.titulo !== 'Seleccione' && data.tiempo !== 'Seleccione') {
                showConfirm('Garantía',
                    '¿Esta seguro que desea agregar esta garantía?',
                    () => this.props.addGarantia(data),
                    () => this.props.handleModalOff()
                );
            } else {
                message.error('Todo los campos son requeridos')
            }
        } else {
            if (this.state.titulo !== 'Seleccione') {
                if (data.idpestsolicitudgarantia === IDPESTSOLICITUDGARANTIA_GARANTIA) {
                    if (data.tiempo !== 'Seleccione') {
                        showConfirm('Garantía - Recomendación',
                            '¿Esta seguro que desea agregar esta Garantía - Recomendación?',
                            () => this.props.addGarantia(data),
                            () => this.props.handleModalOff()
                        );
                    } else {
                        message.error('Todo los campos son requeridos')
                    }
                } else {
                    showConfirm('Garantía - Recomendación',
                        '¿Esta seguro que desea agregar esta Garantía - Recomendación?',
                        () => this.props.addGarantia(data),
                        () => this.props.handleModalOff()
                    );
                }

            } else {
                message.error('Todo los campos son requeridos')
            }
        }
    }


    render() {
        const {
            idegrupogarantia,
            idesubgrupogarantia,
            tiempo,
            titulo,
            dscgarantia,
            idpestsolicitudgarantia
        } = this.state;
        const {
            modal,
            gruposgarantias,
            subgruposgarantias,
            inmueblegarantias,
            handleModalOff,
            params
        } = this.props;
        let dias = [];
        for (let i = 1; i <= 24; i++) {
            dias.push((i * 15).toString())
        }
        const formMantPoliza = (
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={24} lg={12} style={{ padding: 1 }}>
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
                            <ColFormLabel sm={10}>
                                <label>Tipo:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeTipoGarantia}
                                    value={idpestsolicitudgarantia}
                                    disabled={params !== 'inspeccion' ? true : false}
                                >
                                    {
                                        TIPOGARANTIA.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.idpestsolicitudgarantia}>
                                                    {item.nombre}
                                                </Option>
                                            )
                                        })
                                    }
                                </SelectForm>
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={12} style={{ padding: 1 }}>
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
                                    value={idesubgrupogarantia}                                >
                                    {
                                        subgruposgarantias.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.idesubgrupogarantia}>
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
                        {
                            idpestsolicitudgarantia === 100 ? <Field>
                                <ColFormLabel sm={10}>
                                    <label>Día de Vencimiento:</label>
                                </ColFormLabel>
                                <ColForm sm={14}>
                                    <SelectForm
                                        showSearch
                                        optionFilterProp='children'
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        onChange={this.changeDias}
                                        value={tiempo}                                >
                                        {dias.map((item, index) => {
                                            return (
                                                <Option key={index} value={item}>
                                                    {item}
                                                </Option>
                                            )
                                        })}
                                    </SelectForm>
                                </ColForm>
                            </Field> : ''
                        }
                    </ColForm>
                    <ColForm sm={24} lg={{ span: 24 }}>
                        <Field>
                            <ColFormLabel sm={5}>
                                <label>Título de Garantía:</label>
                            </ColFormLabel>
                            <ColForm sm={19}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeTitulo}
                                    value={titulo}                                >
                                    {inmueblegarantias.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.idegarantiarec}>
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
                            <ColFormLabel sm={5}>
                                <label>Descripción de Garantía:</label>
                            </ColFormLabel>
                            <ColForm sm={19}>
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
        const mantPoliza = (
            <div>
                <PagePanel titulo={params === 'inspeccion' ? 'Datos de la Garantía - Recomendación' : 'Datos de la Garantía'} children={formMantPoliza} />
            </div>
        )
        return (
            <Modal
                title={params === 'inspeccion' ? 'Agregar Garantía - Recomendación' : 'Agregar Garantía'}
                visible={modal}
                width='60%'
                centered={false}
                children={mantPoliza}
                onCancel={handleModalOff}
                onOk={this.onSubmit}
                messageTitle={messages.confirmationTitle}
                messageBody={messages.confirmationBdy}
            />
        )
    }
}

export default FormGarantia;