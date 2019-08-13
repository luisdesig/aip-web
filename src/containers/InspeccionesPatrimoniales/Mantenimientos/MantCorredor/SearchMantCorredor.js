import React from 'react';
import {
    FieldContainer,
    Field,
    ColForm,
    ColFormLabel,
    RowForm,
    ButtonForm,
    SelectForm
} from '../../../../components/Util/util.style';
import PagePanel from '../../../../components/Page/PanelPage';

const Option = SelectForm.Option;

class SearchMantGarantia extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            codigo: '',
            numero: '',
            nombres: '',
            ideparametro: 'Seleccione',
            ERROR: []
        }
    }

    changeCodigo = (e) => {
        const codigo = e.target.value;
        if (codigo.match(/^[0-9]{0,120}$/)) {
            this.setState({ codigo })
        }
    }
    changeNumero = (e) => {
        const numero = e.target.value;
        if (numero.match(/^[0-9]{0,120}$/)) {
            this.setState({ numero })
        }
    }
    changeNombres = (e) => {
        const nombres = e.target.value;
        this.setState({ nombres })
    }
    changeEstado = (e) => {
        this.setState({ ideparametro: e })
    }
    onClean = async () => {
        await this.props.STARTACTIONSEARCH({
            numdocbroker: '',
            numidbrokerref: '',
            nombres: '',
            idpactivo: ''
        })
        this.setState({
            codigo: '',
            numero: '',
            nombres: '',
            ideparametro: 'Seleccione'
        })
    }
    onSearch = async () => {
        const { codigo, numero, nombres, ideparametro } = this.state;
        let data = {
            numidbrokerref: codigo,
            numdocbroker: numero,
            nombres: nombres,
            idpactivo: ideparametro === 'Seleccione' ? '' : ideparametro
        }
        await this.props.STARTACTIONSEARCH(data);
    }

    render() {
        const { codigo, numero, nombres, ideparametro, ERROR } = this.state;
        const { estados } = this.props;
        const searchMantCorredor = (
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={23} lg={12}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Código:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeCodigo}
                                    value={codigo}
                                    placeholder='Código'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={23} lg={12}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Nro. Documento:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeNumero}
                                    value={numero}
                                    placeholder='Número documento'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={23} lg={12}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Nombres:</label>
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
                    <ColForm sm={12} lg={12}>
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
                                    value={ideparametro}
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
            <PagePanel titulo='Consultas' children={searchMantCorredor} />
        )
    }
}

export default SearchMantGarantia;