import React from 'react';
import {
    FieldContainer,
    Field,
    ColForm,
    ColFormLabel,
    RowForm,
    SelectForm,
    ButtonForm
} from '../../../../components/Util/util.style';
import PagePanel from '../../../../components/Page/PanelPage';

const Option = SelectForm.Option;

class SearchMantRoles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            usuario: '',
            nombres: '',
            idpactivo: 'Seleccione',
            ERROR: []
        }
    }

    changeUsuario = (e) => {
        const usuario = e.target.value;
        if (usuario.match(/^[- ',_@.ña-zA-ZáéíóúÁÉÍÓÚ0-9]{0,}$/)) {
            this.setState({ usuario })
        }
    }
    changeNombres = (e) => {
        const nombres = e.target.value;
        if (nombres.match(/^[- ',_ña-zA-ZáéíóúÁÉÍÓÚ]{0,}$/)) {
            this.setState({ nombres })
        }
    }
    changeEstado = (e) => {
        this.setState({idpactivo: e})
    }
    onClean = async () => {
        await this.props.STARTSEARCHROLES({
            usuario: '',
            nombres: '',
            idpactivo: ''
        });
        this.setState({
            usuario: '',
            nombres: '',
            idpactivo: 'Seleccione'
        })
    }
    onSearch = async () => {
        let data = {
            usuario: this.state.usuario,
            nombres: this.state.nombres,
            idpactivo: this.state.idpactivo === 'Seleccione' ? '': this.state.idpactivo
        }
        await this.props.STARTSEARCHROLES(data);
    }

    render() {
        const { usuario, nombres, idpactivo, ERROR } = this.state;
        const { estadousuario } = this.props;
        const FormMantRoles = (
            <FieldContainer>
                    <RowForm gutter={16}>
                        <ColForm sm={24} lg={8}>
                            <Field>
                                <ColFormLabel sm={10}>
                                    <label>Usuario:</label>
                                </ColFormLabel>
                                <ColForm sm={14}>
                                    <input
                                        onChange={this.changeUsuario}
                                        value={usuario}
                                        placeholder='Usuario'
                                    />
                                </ColForm>
                            </Field>
                        </ColForm>
                        <ColForm sm={24} lg={8}>
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
                                        placeholder='Seleccione'
                                        value={idpactivo}
                                    >
                                        {
                                            estadousuario.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item.descripcion}>
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
                        <ColForm md={{span: 8,offset:8}} lg={{ span: 6, offset: 9 }}>
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
            <PagePanel titulo='Consultas' children={FormMantRoles}/>
        )
    }
}

export default SearchMantRoles;