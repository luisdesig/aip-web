import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import { messages } from '../../../../util/messages';
import { showConfirm } from '../../../../components/Modal/Utils';
import { Validator } from '../../../../util/validator';
import PagePanel from '../../../../components/Page/PanelPage';
import { error } from '../../../../components/Messages/Messages';
import {
    FieldContainer,
    Field,
    ColForm,
    ColFormLabel,
    RowForm,
    SwitchForm
} from '../../../../components/Util/util.style';


class FormMantInspector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            codproducto: props.dataEdit ? props.dataEdit.codproducto : '',
            numpoliza: props.dataEdit ? props.dataEdit.numpoliza : '',
            idpactivo: props.dataEdit ? props.dataEdit.activo.idpactivo : 9,
            ERROR: []
        }
    }

    changeCodigo = (e) => {
        const codproducto = e.target.value;
        if (codproducto.match(/^[a-zA-Z0-9]+$/) || codproducto === '') {
            this.setState({ codproducto });
        }
    }

    handleCodigo = (e) => {
        const codproducto = e.target.value;
        let ERROR = this.state.ERROR;
        if (codproducto.match(/^[a-zA-Z0-9]+$/)) {
            let index = ERROR.indexOf('codproducto');
            if (index >= 0) {
                ERROR.splice(index, 1)
            }
            this.setState({ ERROR })
        } else {
            if (ERROR.indexOf('codproducto') < 0) {
                ERROR.push('codproducto')
            }
            this.setState({ ERROR })
        }
    }
    changeNumero = (e) => {
        const numpoliza = e.target.value;
        if (numpoliza.match(/^[0-9]+$/) || numpoliza === '') {
            this.setState({ numpoliza });
        }
    }
    handleNumero = (e) => {
        const numpoliza = e.target.value;
        let ERROR = this.state.ERROR;
        if (numpoliza.match(/^[0-9]+$/)) {
            let index = ERROR.indexOf('numpoliza');
            if (index >= 0) {
                ERROR.splice(index, 1)
            }
            this.setState({ ERROR })
        } else {
            if (ERROR.indexOf('numpoliza') < 0) {
                ERROR.push('numpoliza')
            }
            this.setState({ ERROR })
        }
    }

    changeActivo = (e) => {
        if (e) {
            this.setState({ idpactivo: 9 })
        } else {
            this.setState({ idpactivo: 10 })
        }
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
                showConfirm(messages.polizas.title,
                    messages.confirmationUpdate,
                    () => this.props.STARTACTIONPUT(
                        this.props.dataEdit.idepolizaestrategica,
                        { idpactivo: data.idpactivo }),
                    () => this.props.handleModalOff()
                );
            } else {
                showConfirm(messages.polizas.title,
                    messages.confirmationInsert,
                    () => this.props.STARTACTIONPOST(data),
                    () => this.props.handleModalOff()
                );
            }
        } else {
            error(messages.polizas.validacion)
        }
    }


    render() {
        const {
            codproducto,
            numpoliza
        } = this.state;
        const { dataEdit, modal, handleModalOff } = this.props;
        const formMantPoliza = (
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={24} lg={24}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Código Producto:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeCodigo}
                                    value={codproducto}
                                    placeholder='Código Producto'
                                    disabled={dataEdit ? true : false}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={24}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Número de Póliza:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={numpoliza}
                                    onChange={this.changeNumero}
                                    placeholder='Número de Poliza'
                                    disabled={dataEdit ? true : false}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    {
                        dataEdit ? <SwitchForm
                            onChange={this.changeActivo}
                            defaultChecked={dataEdit.activo.idpactivo === 9 ? true : false}
                            checkedChildren='Habilitado'
                            unCheckedChildren='Deshabilitado' /> : ''
                    }
                </RowForm>
            </FieldContainer>
        )
        const mantPoliza = (
            <PagePanel titulo='Datos de la póliza' children={formMantPoliza} />
        )
        return (
            <Modal
                title={dataEdit ? messages.polizas.actualizar : messages.polizas.agregar}
                visible={modal}
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

export default FormMantInspector;