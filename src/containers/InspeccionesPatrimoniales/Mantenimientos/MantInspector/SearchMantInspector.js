import React from 'react';
import {
    FieldContainer,
    Field,
    ColForm,
    ColFormLabel,
    RowForm,
    SelectForm,
    ButtonForm,
    SpanError
} from '../../../../components/Util/util.style';
import PagePanel from '../../../../components/Page/PanelPage';
import { Notification } from '../../../../components/Notifications/Notifications';
import { messages } from '../../../../util/messages';
import { error } from '../../../../components/Messages/Messages';

const Option = SelectForm.Option;
//const regex = "- 'ña-zA-ZáéíóúÁÉÍÓÚ";

class SearchMantInspector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dni: '',
            nombres: '',
            apellidos: '',
            idptipoinspector: 'Seleccione',
            idpactivo: 'Seleccione',
            ideriesgo: 'Seleccione'
        }
    }

    changeDni = (e) => {
        const dni = e.target.value;
        if (dni.match(/^[0-9]{0,8}$/)) {
            this.setState({ dni })
        }
    }
    changeNombres = (e) => {
        const nombres = e.target.value;
        if (nombres.match(/^[- ,.'_ñÑa-zA-ZáéíóúÁÉÍÓÚ]{0,}$/)) {
            this.setState({ nombres })
        }
    }
    validateDni = () => {
        const { dni } = this.state
        if (!(dni.match(/^[0-9]{0,11}$/) && dni.length === 8)) {
            this.setState({ dni: '' })
        }
    }
    changeApellidos = (e) => {
        const apellidos = e.target.value;
        if (apellidos.match(/^[- ,.'_ñÑa-zA-ZáéíóúÁÉÍÓÚ]{0,}$/)) {
            this.setState({ apellidos })
        }
    }
    changeTipoInspector = (e) => {
        this.setState({ idptipoinspector: e });
    }
    changeEstado = (e) => {
        this.setState({ idpactivo: e });
    }
    changeRiesgo = (e) => {
        this.setState({ ideriesgo: e })
    }

    onClean = async () => {
        await this.props.STARTACTIONSEARCH({
            dni: '',
            nombres: '',
            apellidos: '',
            idptipoinspector: '',
            ideriesgo: '',
            idpactivo: ''
        });
        this.setState({
            dni: '',
            nombres: '',
            apellidos: '',
            idptipoinspector: 'Seleccione',
            ideriesgo: 'Seleccione',
            idpactivo: 'Seleccione'
        })
    }

    onSearch = async () => {
        const { dni, nombres, apellidos, idptipoinspector, ideriesgo, idpactivo } = this.state;
        let data = {
            dni: dni,
            nombres: nombres,
            apellidos: apellidos,
            idptipoinspector: idptipoinspector === 'Seleccione' ? '' : idptipoinspector,
            ideriesgo: ideriesgo === 'Seleccione' ? '' : ideriesgo,
            idpactivo: idpactivo === 'Seleccione' ? '' : idpactivo
        }
        await this.props.STARTACTIONSEARCH(data);
    }

    render() {
        const { dni, nombres, apellidos, idptipoinspector, idpactivo, ideriesgo } = this.state;
        const { common } = this.props;
        const searchMantInspector = (
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm md={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>DNI:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    placeholder='DNI'
                                    value={dni}
                                    onChange={this.changeDni}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm md={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Nombres:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    placeholder='Nombres'
                                    onChange={this.changeNombres}
                                    value={nombres}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm md={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Apellidos:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    placeholder='Apellidos'
                                    value={apellidos}
                                    onChange={this.changeApellidos}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Riesgo:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeRiesgo}
                                    placeholder='Seleccione'
                                    value={ideriesgo}
                                >
                                    {
                                        common.riesgos.map((item, index) => {
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
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Inspector:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeTipoInspector}
                                    value={idptipoinspector}
                                    placeholder='Seleccione'
                                >
                                    {common.estadosinspector.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.ideparametro}>
                                                {item.descripcion}
                                            </Option>
                                        )
                                    })}
                                </SelectForm>
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Estado:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeEstado}
                                    value={idpactivo}
                                    placeholder='Seleccione'
                                >
                                    {common.estados.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.ideparametro}>
                                                {item.descripcion}
                                            </Option>
                                        )
                                    })}
                                </SelectForm>
                            </ColForm>
                        </Field>
                    </ColForm>
                </RowForm>
                <RowForm gutter={16}>
                    <ColForm md={{ span: 8, offset: 8 }} lg={{ span: 6, offset: 9 }}>
                        <Field>
                            <ColForm sm={12}>
                                <ButtonForm
                                    className="btn-cta-search"
                                    onClick={this.onSearch}
                                >
                                    Consultar
                                                </ButtonForm>
                            </ColForm>
                            <ColForm sm={12}>
                                <ButtonForm
                                    className="btn-cta-clear"
                                    onClick={this.onClean}
                                >
                                    Limpiar
                                            </ButtonForm>
                            </ColForm>
                        </Field>
                    </ColForm>
                </RowForm>
            </FieldContainer>
        )
        return (
            <PagePanel titulo='Consultas' children={searchMantInspector} />
        )
    }
}

export default SearchMantInspector;
