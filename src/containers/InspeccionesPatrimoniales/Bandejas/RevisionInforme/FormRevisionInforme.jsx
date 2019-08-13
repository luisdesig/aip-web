import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import { messages } from '../../../../util/messages';
import { showConfirm } from '../../../../components/Modal/Utils';
import { Validator } from '../../../../util/validator';
import PagePanel from '../../../../components/Page/PanelPage';
import TableInmuebles from './TableInmueble';
import {
    FieldContainer,
    Field,
    ColForm,
    ColFormLabel,
    InputForm,
    RowForm
} from '../../../../components/Util/util.style';
import { message } from 'antd';

const TextArea = InputForm.TextArea;

class FormRevisionInforme extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            codproducto: '',
            numpoliza: '',
            idpactivo: 9,
            ERROR: []
        }
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount(){
        this.props.STARTACTIONGET()
    }

    onChange= () => {

    }
    onSelect = () => {

    }

    onSubmit = () => {
        let data = {
            codproducto: this.state.codproducto,
            numpoliza: this.state.numpoliza,
        }
        const validator = Validator(data);
        this.setState({ ERROR: validator });
        data.idpactivo = this.state.idpactivo;
        if (data.codproducto !== '' && data.numpoliza !== '') {
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
        }
    }


    render() {
        var dataSource;
        const {
            codproducto,
            numpoliza,
            ERROR
        } = this.state;
        const { dataEdit, modal, bandpolizas, handleModalOff } = this.props;
        dataSource = bandpolizas.polizainmuebles; 
        const formMantPoliza = (
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Nro Póliza</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={dataEdit.numpol}
                                    placeholder='Número de póliza'
                                    disabled={true}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Ruc Corredor</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={dataEdit.numdoccorredor}
                                    placeholder='RUC Corredor'
                                    disabled={true}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Nro DNI</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={dataEdit.numdoccliente}
                                    placeholder='DNI cliente'
                                    disabled={true}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Nro Renovacion</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={dataEdit.numren}
                                    placeholder='Número renovación'
                                    disabled={true}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Corredor</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={dataEdit.nombrecorredor}
                                    placeholder='Nombre del corredor'
                                    disabled={true}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Nombre</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={dataEdit.nomcliente}
                                    placeholder='Nombre del cliente'
                                    disabled={true}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                </RowForm>
            </FieldContainer>
        )

        
        const mantPoliza = (
            <div>
                <PagePanel titulo='Datos de la póliza' children={formMantPoliza} />
                <TableInmuebles
                    dataSource={dataSource}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                />
                <RowForm style={{paddingTop: 10}}>
                    <PagePanel
                        titulo='Descripción de la póliza'
                        children={
                            <TextArea
                                style={{marginTop: 10, marginBottom: 10, width: '98%'}}
                                row={2}
                            />
                        }
                    />
                    
                </RowForm>
            </div>
        )
        return (
            <Modal
                title={'Pasar a Ingenieria'}
                visible={modal}
                width='80%'
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

export default FormRevisionInforme;