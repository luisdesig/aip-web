import React from 'react';
import {
    FieldContainer,
    Field,
    ColForm,
    ColFormLabel,
    RowForm,
    SelectForm,
    InputNumberForm,
    ButtonForm
} from '../../../../components/Util/util.style';
import PagePanel from '../../../../components/Page/PanelPage';

const Option = SelectForm.Option;

class SearchAsigInspC extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            idecorredorinspector: '',
            inspector: '',
            numdocbroker: '',
            corredor: '',
            idpactivo: 'Seleccione',
            ERROR: []
        }
    }
    changeIdentificador = (e) => {
        this.setState({ idecorredorinspector: e })
    }
    changeInspector = (e) => {
        const inspector = e.target.value
        if (inspector.match(/^[-_ ,.'ñÑa-zA-ZáéíóúÁÉÍÓÚ]{0,}$/)) {
            this.setState({ inspector })
        }
    }
    changeNumeroCorredor = (e) => {
        const numdocbroker = e.target.value;
        if (numdocbroker.match(/^[0-9]{0,}$/)) {
            this.setState({ numdocbroker })
        }
    }
    changeNombresCorredor = (e) => {
        const corredor = e.target.value;
        if (corredor.match(/^[-_ ,.'ñÑ0-9a-zA-ZáéíóúÁÉÍÓÚ]{0,}$/)) {
            this.setState({ corredor })
        }
    }
    changeEstado = (e) => {
        this.setState({ idpactivo: e })
    }
    onClean = async () => {
        this.setState({
            idecorredorinspector: '',
            inspector: '',
            numdocbroker: '',
            corredor: '',
            idpactivo: 'Seleccione',
        })
        await this.props.STARTACTIONSEARCH({
            idecorredorinspector: "",
            numdocbroker: "",
            corredor: "",
            inspector: "",
            idpactivo: ""
        });
    }
    onSearch = async () => {
        const {
            idecorredorinspector,
            inspector,
            numdocbroker,
            corredor,
            idpactivo
        } = this.state;
        let data = {
            idecorredorinspector: idecorredorinspector,
            inspector: inspector,
            numdocbroker: numdocbroker,
            corredor: corredor,
            idpactivo: idpactivo === 'Seleccione' ? '' : idpactivo,
        }
        await this.props.STARTACTIONSEARCH(data)
    }

    render() {
        const {
            idecorredorinspector,
            inspector,
            numdocbroker,
            corredor,
            idpactivo, ERROR
        } = this.state;
        const { estados } = this.props;
        const searchAsigInspC = (
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={12}>
                                <label>ID:</label>
                            </ColFormLabel>
                            <ColForm sm={12}>
                                <InputNumberForm
                                    min={0}
                                    onChange={this.changeIdentificador}
                                    value={idecorredorinspector}
                                    placeholder='Identificador'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={12}>
                                <label>Inspector:</label>
                            </ColFormLabel>
                            <ColForm sm={12}>
                                <input
                                    onChange={this.changeInspector}
                                    value={inspector}
                                    placeholder='Nombre Inspector'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={12}>
                                <label>Nombre Corredor:</label>
                            </ColFormLabel>
                            <ColForm sm={12}>
                                <input
                                    onChange={this.changeNombresCorredor}
                                    value={corredor}
                                    placeholder='Nombre Corredor'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={{ span: 8, offset: 8 }}>
                        <Field>
                            <ColFormLabel sm={12}>
                                <label>Número Corredor:</label>
                            </ColFormLabel>
                            <ColForm sm={12}>
                                <input
                                    onChange={this.changeNumeroCorredor}
                                    value={numdocbroker}
                                    placeholder='Número Corredor'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={12}>
                                <label>Estado:</label>
                            </ColFormLabel>
                            <ColForm sm={12}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeEstado}
                                    value={idpactivo}
                                    placeholder='Seleccione'
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
            <PagePanel titulo='Consultas' children={searchAsigInspC} />
        )
    }
}

export default SearchAsigInspC;