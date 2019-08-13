import React from 'react';
import {
    FieldContainer,
    Field,
    ColForm,
    ColFormLabel,
    RowForm,
    ButtonForm,
    SelectForm,
} from '../../../../components/Util/util.style';
import PagePanel from '../../../../components/Page/PanelPage';

const Option = SelectForm.Option;

class SearchMantPoliza extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            codproducto: '',
            numpoliza: '',
            ideparametro: 'Seleccione'
        }
    }

    changeCodigo = (e) => {
        const codproducto = e.target.value;
        if (codproducto.match(/^[a-zA-Z0-9]+$/) || codproducto === '') {
            this.setState({ codproducto })
        }
    }

    changeNumero = (e) => {
        const numpoliza = e.target.value;
        if (numpoliza.match(/^[0-9]+$/) || numpoliza === '') {
            this.setState({ numpoliza })
        }
    }

    changeEstado = (e) => {
        this.setState({ ideparametro: e })
    }

    onClean = async () => {
        await this.props.STARTACTIONSEARCH({
            codproducto: '',
            numpoliza: '',
            idpactivo: ''
        });
        this.setState({
            codproducto: '',
            numpoliza: '',
            ideparametro: 'Seleccione'
        })
    }

    onSearch = async () => {
        const { codproducto, numpoliza, ideparametro } = this.state;
        let data = {
            codproducto: codproducto,
            numpoliza: numpoliza,
            idpactivo: ideparametro === 'Seleccione' ? '' : ideparametro
        }
        await this.props.STARTACTIONSEARCH(data);
    }


    render() {
        const { codproducto, numpoliza, ideparametro } = this.state;
        const { estados } = this.props;
        const searchMantPoliza = (
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Código Producto:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={codproducto}
                                    onChange={this.changeCodigo}
                                    placeholder='Código producto'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Número de Póliza:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={numpoliza}
                                    onChange={this.changeNumero}
                                    placeholder='Número de póliza'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
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
            <PagePanel titulo='Consultas' children={searchMantPoliza} />
        )
    }
}
export default SearchMantPoliza;
