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

class SearchClasRiesgo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            idegironegocio: 'Seleccione',
            ideocupacion: 'Seleccione',
            indminera: 'Seleccione',
            ideriesgo: 'Seleccione',
            idptipogironegocio: 'Seleccione',
            idpestasignacion: 'Seleccione',
            ERROR: []
        }
    }

    changeGiroNegocio = (e) => {
        this.setState({ idegironegocio: e })
    }
    changeOcupacion = (e) => {
        this.setState({ ideocupacion: e })
    }
    changeTipoGiro = (e) => {
        this.setState({ idptipogironegocio: e })
    }
    changeRiesgo = (e) => {
        this.setState({ ideriesgo: e })
    }
    changeEstado = (e) => {
        this.setState({ idpestasignacion: e })
    }
    changeMineria = (e) => {
        this.setState({ indminera: e })
    }
    onClean = async () => {
        await this.props.STARTACTIONSEARCH({
            idegironegocio: "",
            ideocupacion: "",
            ideriesgo: "",
            idptipogironegocio: "",
            idpestasignacion: "",
            indminera: ""
        })
        this.setState({
            idegironegocio: 'Seleccione',
            ideocupacion: 'Seleccione',
            indminera: 'Seleccione',
            ideriesgo: 'Seleccione',
            idptipogironegocio: 'Seleccione',
            idpestasignacion: 'Seleccione',
        })
    }
    onSearch = async () => {
        const {
            idegironegocio,
            ideocupacion,
            indminera,
            ideriesgo,
            idptipogironegocio,
            idpestasignacion
        } = this.state;

        let data = {
            idegironegocio: idegironegocio === 'Seleccione' ? '' : idegironegocio,
            ideocupacion: ideocupacion === 'Seleccione' ? '' : ideocupacion,
            indminera: indminera === 'Seleccione' ? '' : indminera,
            ideriesgo: ideriesgo === 'Seleccione' ? '' : ideriesgo,
            idptipogironegocio: idptipogironegocio === 'Seleccione' ? '' : idptipogironegocio,
            idpestasignacion: idpestasignacion === 'Seleccione' ? '' : idpestasignacion,
        };
        await this.props.STARTACTIONSEARCH(data)
    }

    render() {
        const { idegironegocio, ideocupacion, indminera, idpestasignacion, ideriesgo, idptipogironegocio, ERROR } = this.state;
        const {
            girosnegocios,
            ocupaciones,
            minero,
            riesgos,
            tiposgironegocios,
            estadosgiro
        } = this.props;

        const searchClasRiesgo = (
            <FieldContainer>
            <RowForm gutter={16}>
                <ColForm sm={12} lg={8}>
                    <Field>
                        <ColFormLabel sm={12}>
                            <label>Giro Negocio:</label>
                        </ColFormLabel>
                        <ColForm sm={12}>
                            <SelectForm
                                showSearch
                                optionFilterProp='children'
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={this.changeGiroNegocio}
                                value={idegironegocio}
                            >
                                {
                                    girosnegocios.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.idegironegocio}>
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
                        <ColFormLabel sm={12}>
                            <label>Ocupación:</label>
                        </ColFormLabel>
                        <ColForm sm={12}>
                            <SelectForm
                                showSearch
                                optionFilterProp='children'
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={this.changeOcupacion}
                                value={ideocupacion}
                            >
                                {
                                    ocupaciones.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.ideocupacion}>
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
                        <ColFormLabel sm={12}>
                            <label>Tipo de Giro:</label>
                        </ColFormLabel>
                        <ColForm sm={12}>
                            <SelectForm
                                showSearch
                                optionFilterProp='children'
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={this.changeTipoGiro}
                                value={idptipogironegocio}
                            >
                                {
                                    tiposgironegocios.map((item, index) => {
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
                        <ColFormLabel sm={12}>
                            <label>Clasificación Riesgo:</label>
                        </ColFormLabel>
                        <ColForm sm={12}>
                            <SelectForm
                                showSearch
                                optionFilterProp='children'
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={this.changeRiesgo}
                                value={ideriesgo}
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
                                value={idpestasignacion}
                            >
                                {
                                    estadosgiro.map((item, index) => {
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
                        <ColFormLabel sm={12}>
                            <label>Minería:</label>
                        </ColFormLabel>
                        <ColForm sm={12}>
                            <SelectForm
                                showSearch
                                optionFilterProp='children'
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={this.changeMineria}
                                value={indminera}
                            >
                                {
                                    minero.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.id}>
                                                {item.value}
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
            <PagePanel titulo='Consultas' children={searchClasRiesgo}/>
        )
    }
}

export default SearchClasRiesgo;