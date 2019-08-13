import React from 'react';
import {
    FieldContainer,
    Field,
    ColForm,
    ColFormLabel,
    RowForm,
    SelectForm,
    ButtonForm,
    InputNumberForm,
} from '../../../../components/Util/util.style';
import PagePanel from '../../../../components/Page/PanelPage';

const Option = SelectForm.Option;

class SearchAsigInspector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ideprioridadinspector: '',
            idezona: 'Seleccione',
            dni: '',
            nombres: '',
            idpactivo: 'Seleccione',
            prioridad: '',
            ERROR: []
        }
    }

    changeIdentificador = (e) => {
        this.setState({ ideprioridadinspector: e })
    }
    changeZona = (e) => {
        this.setState({ idezona: e })
    }
    changeDni = (e) => {
        const dni = e.target.value;
        if (dni.match(/^[0-9]{0,8}$/)) {
            this.setState({ dni })
        }
    }
    changeNombres = (e) => {
        const nombres = e.target.value;
        if (nombres.match(/^[-_ ,.'ñÑa-zA-ZáéíóúÁÉÍÓÚ]{0,}$/)) {
            this.setState({ nombres })
        }
    }
    changeEstado = (e) => {
        this.setState({ idpactivo: e })
    }
    changePrioridad = (e) => {
        this.setState({ prioridad: e })
    }
    onClear = async () => {
        await this.props.STARTACTIONSEARCH({
            ideprioridadinspector: '',
            dni: '',
            idezona: '',
            nombres: '',
            idpactivo: '',
            prioridad: ''
        });
        this.setState({
            ideprioridadinspector: '',
            idezona: 'Seleccione',
            dni: '',
            nombres: '',
            idpactivo: 'Seleccione',
            prioridad: '',
        })
    }
    onSearch = async () => {
        const { ideprioridadinspector, idezona, dni, nombres, idpactivo, prioridad } = this.state;
        let data = {
            ideprioridadinspector: ideprioridadinspector,
            idezona: idezona === 'Seleccione' ? '' : idezona,
            dni: dni,
            nombres: nombres,
            idpactivo: idpactivo === 'Seleccione' ? '' : idpactivo,
            prioridad: prioridad
        }
        await this.props.STARTACTIONSEARCH(data);
    }

    render() {
        const { ideprioridadinspector, idezona, dni, nombres, idpactivo, prioridad, ERROR } = this.state;
        const { zonasocupadas, estados } = this.props;
        const searchAsigInspector = (
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>ID:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <InputNumberForm
                                    min={0}
                                    onChange={this.changeIdentificador}
                                    value={ideprioridadinspector}
                                    placeholder='Identificador'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>DNI:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeDni}
                                    value={dni}
                                    placeholder='DNI'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Nombres y Apellidos del Inspector:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeNombres}
                                    value={nombres}
                                    placeholder='Nombres'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Zona:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeZona}
                                    value={idezona}
                                >
                                    {
                                        zonasocupadas.map((item, index) => {
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
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Prioridad:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <InputNumberForm
                                    min={0}
                                    onChange={this.changePrioridad}
                                    value={prioridad}
                                    placeholder='Prioridad'
                                />
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
                                    disabled={ERROR.length === 0 ? false : true}
                                >
                                    Consultar
                            </ButtonForm>
                            </ColForm>
                            <ColForm sm={12}>
                                <ButtonForm
                                    className="btn-cta-clear"
                                    onClick={this.onClear}
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
            <PagePanel titulo='Consultas' children={searchAsigInspector} />
        )
    }
}

export default SearchAsigInspector;