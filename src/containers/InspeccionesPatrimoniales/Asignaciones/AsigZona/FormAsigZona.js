import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import { showConfirm } from '../../../../components/Modal/Utils';
import { error, success } from '../../../../components/Messages/Messages';
import PagePanel from '../../../../components/Page/PanelPage';
import {
    FieldContainer,
    RowForm,
    ColForm,
    Field,
    ColFormLabel,
    SelectForm,
    InputNumberForm
} from '../../../../components/Util/util.style';
import { messages } from '../../../../util/messages';

const Option = SelectForm.Option;

class FormAsigZona extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            idezona: props.dataEdit ? props.dataEdit.zona.idezona : 'Seleccione',
            ideriesgo: props.dataEdit ? props.dataEdit.riesgo.ideriesgo : 'Seleccione',
            mtomaximodeclarado: props.dataEdit ? props.dataEdit.mtomaximodeclarado : '',
            mtominimodeclarado: props.dataEdit ? props.dataEdit.mtominimodeclarado : '',
            idptipoinspectorasg: props.dataEdit ? props.dataEdit.tipoinspectorasg.idptipoinspectorasg : 'Seleccione',
            idpactivo: props.dataEdit ? props.dataEdit.activo.idpactivo : 9
        }


    }
    changeZona = (e) => {
        this.setState({ idezona: e })
    }
    changeClasificacion = (e) => {
        this.setState({ ideriesgo: e })
    }
    changeMaximo = (e) => {
        this.setState({ mtomaximodeclarado: e })
    }
    onBlurMaximo = e => {
        const mtomaximodeclarado = e.target.value
        this.setState({ mtomaximodeclarado })
    }
    changeMinimo = (e) => {
        this.setState({ mtominimodeclarado: e })
    }
    changeInspector = (e) => {
        const inspector = this.props.tiposinspectoresasg.find(res => res.ideparametro === e)
        success(`Usted seleccionó un ${inspector.descripcion}.`);
        this.setState({ idptipoinspectorasg: e });
    }
    changeEstado = (e) => {
        this.setState({ idpactivo: e })
    }

    onSubmit = () => {
        const { dataEdit, STARTACTIONPUT, STARTACTIONPOST, handleModalOff } = this.props;
        const {
            idezona, ideriesgo, mtomaximodeclarado,
            mtominimodeclarado, idptipoinspectorasg, idpactivo
        } = this.state;
        let data = {
            idezona: idezona,
            ideriesgo: ideriesgo,
            mtomaximodeclarado: mtomaximodeclarado === '' ? 0 : mtomaximodeclarado,
            mtominimodeclarado: mtominimodeclarado === '' ? 0 : mtominimodeclarado,
            idptipoinspectorasg: idptipoinspectorasg,
            idpactivo: idpactivo
        }
        if (data.idezona !== 'Seleccione' &&
            data.ideriesgo !== 'Seleccione' &&
            data.idptipoinspectorasg !== 'Seleccione' &&
            data.mtominimodeclarado !== 0 && data.mtominimodeclarado !== 0) {
            if (data.mtominimodeclarado > data.mtomaximodeclarado) {
                error(messages.asigzonas.validacionmonto);
                return false;
            }
            if (dataEdit) {
                showConfirm(messages.asigzonas.title,
                    messages.confirmationUpdate,
                    () => STARTACTIONPUT(dataEdit.ideriesgozona, data),
                    () => handleModalOff()
                );
            } else {
                showConfirm(messages.asigzonas.title,
                    messages.confirmationInsert,
                    () => STARTACTIONPOST(data),
                    () => handleModalOff()
                );
            }
        } else {
            error(messages.asigzonas.validacion)
        }
    }

    render() {

        const { idezona, ideriesgo, mtomaximodeclarado, mtominimodeclarado, idpactivo, idptipoinspectorasg } = this.state;
        const { modal, dataEdit, zonas, riesgos, estados, tiposinspectoresasg, handleModalOff } = this.props;
        const formAsigZona = (
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={24} lg={24}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Zona Geográfica:</label>
                            </ColFormLabel>
                            <ColForm sm={10}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeZona}
                                    value={idezona}
                                >
                                    {
                                        zonas.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.idezona}>
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
                                <label>Clasificación de Riesgo:</label>
                            </ColFormLabel>
                            <ColForm sm={10}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeClasificacion}
                                    defaultValue={ideriesgo}
                                >
                                    {
                                        riesgos.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.ideriesgo}>
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
                                <label>Tipo de Inspector:</label>
                            </ColFormLabel>
                            <ColForm sm={10}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeInspector}
                                    defaultValue={idptipoinspectorasg}
                                >
                                    {
                                        tiposinspectoresasg.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.ideparametro}>
                                                    {item.descripcion}
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
                                <label>Monto Mínimo:</label>
                            </ColFormLabel>
                            <ColForm sm={10}>
                                <InputNumberForm
                                    min={0}
                                    max={10000000000}
                                    onChange={this.changeMinimo}
                                    value={mtominimodeclarado}
                                    placeholder='Monto Mínimo'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={24}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Monto Máximo:</label>
                            </ColFormLabel>
                            <ColForm sm={10}>
                                <InputNumberForm
                                    min={0}
                                    onBlur={this.onBlurMaximo}
                                    onChange={this.changeMaximo}
                                    value={mtomaximodeclarado}
                                    placeholder='Monto Máximo'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    {
                        dataEdit ? <ColForm sm={24} lg={24}>
                            <Field>
                                <ColFormLabel sm={10}>
                                    <label>Estado:</label>
                                </ColFormLabel>
                                <ColForm sm={10}>
                                    <SelectForm
                                        showSearch
                                        optionFilterProp='children'
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        onChange={this.changeEstado}
                                        defaultValue={idpactivo}
                                    >
                                        {
                                            estados.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item.ideparametro}>
                                                        {item.descripcion}
                                                    </Option>
                                                )
                                            })
                                        }
                                    </SelectForm>
                                </ColForm>
                            </Field>
                        </ColForm> : ''
                    }
                </RowForm>
            </FieldContainer>
        )

        const asigZona = (
            <PagePanel
                titulo='Datos de zonas geográficas por clasificación de riesgo'
                children={formAsigZona}
            />
        )

        return (
            <Modal
                title={dataEdit ? messages.asigzonas.actualizar : messages.asigzonas.agregar}
                visible={modal}
                centered={false}
                children={asigZona}
                onCancel={handleModalOff}
                onOk={this.onSubmit}
                messageTitle={messages.confirmationTitle}
                messageBody={messages.confirmationBdy}
            />
        )
    }
}

export default FormAsigZona;