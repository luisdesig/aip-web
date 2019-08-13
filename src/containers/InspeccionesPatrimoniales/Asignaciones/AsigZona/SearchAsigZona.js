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
import { success } from '../../../../components/Messages/Messages'
import PagePanel from '../../../../components/Page/PanelPage';

const Option = SelectForm.Option;

class SearchAsigZona extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ideriesgozona: '',
            idezona: 'Seleccione',
            ideriesgo: 'Seleccione',
            mtomaximodeclarado: '',
            mtominimodeclarado: '',
            idptipoinspectorasg: 'Seleccione',
            ERROR: []
        }
    }

    changeIdentificador = (e) => {
        this.setState({ ideriesgozona: e })
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
    changeMinimo = (e) => {
        this.setState({ mtominimodeclarado: e })
    }
    changeInspector=(e) => {
        const inspector = this.props.tiposinspectoresasg.find(res => res.ideparametro === e)
        //success(`Usted selecciono un ${inspector.descripcion}`);
        this.setState({ idptipoinspectorasg : e });
    }
    onClean = () => {
        this.props.STARTACTIONSEARCH({
            ideriesgozona: '',
            ideriesgo: '',
            idezona: '',
            idptipoinspectorasg: '',
            mtominimodeclarado: '',
            mtomaximodeclarado: ''
        })
        this.setState({
            ideriesgozona: '',
            idezona: 'Seleccione',
            ideriesgo: 'Seleccione',
            mtomaximodeclarado: '',
            mtominimodeclarado: '',
            idptipoinspectorasg: 'Seleccione'
        })
    }
    onSearch = () => {
        const { ideriesgozona, idezona, ideriesgo, mtomaximodeclarado, mtominimodeclarado, idptipoinspectorasg} = this.state;
        let data = {
            ideriesgozona: ideriesgozona,
            idezona: idezona === 'Seleccione' ? '' : idezona,
            ideriesgo: ideriesgo === 'Seleccione' ? '' : ideriesgo,
            mtomaximodeclarado: mtomaximodeclarado,
            mtominimodeclarado: mtominimodeclarado,
            idptipoinspectorasg: idptipoinspectorasg === 'Seleccione' ? '' : idptipoinspectorasg
        }
        this.props.STARTACTIONSEARCH(data)
    }

    render() {
        const { ideriesgozona, idezona, ideriesgo, mtomaximodeclarado, mtominimodeclarado,idptipoinspectorasg, ERROR } = this.state;
        const { zonas, riesgos, tiposinspectoresasg } = this.props;
        
        const searchAsigZona = (
            <FieldContainer>
                    <RowForm gutter={16}>
                        <ColForm sm={12} lg={8}>
                            <Field>
                                <ColFormLabel sm={12}>
                                    <label>Identificador:</label>
                                </ColFormLabel>
                                <ColForm sm={12}>
                                    <InputNumberForm
                                        min={0}
                                        onChange={this.changeIdentificador}
                                        value={ideriesgozona}
                                        placeholder='Identificador'
                                    />
                                </ColForm>
                            </Field>
                        </ColForm>
                        <ColForm sm={12} lg={8}>
                            <Field>
                                <ColFormLabel sm={12}>
                                    <label>Zona Geográfica:</label>
                                </ColFormLabel>
                                <ColForm sm={12}>
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
                        <ColForm sm={12} lg={8}>
                            <Field>
                                <ColFormLabel sm={12}>
                                    <label>Clasificación de Riesgo:</label>
                                </ColFormLabel>
                                <ColForm sm={12}>
                                    <SelectForm
                                        showSearch
                                        optionFilterProp='children'
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        onChange={this.changeClasificacion}
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
                                    <label>Monto Mínimo:</label>
                                </ColFormLabel>
                                <ColForm sm={12}>
                                    <InputNumberForm
                                        min={0}
                                        max={1000000000000000}
                                        onChange={this.changeMinimo}
                                        value={mtominimodeclarado}
                                        placeholder='Monto Mínimo'
                                    />
                                </ColForm>
                            </Field>
                        </ColForm>
                        <ColForm sm={12} lg={8}>
                            <Field>
                                <ColFormLabel sm={12}>
                                    <label>Monto Máximo:</label>
                                </ColFormLabel>
                                <ColForm sm={12}>
                                    <InputNumberForm
                                        min={0}
                                        max={100000000000}
                                        onChange={this.changeMaximo}
                                        value={mtomaximodeclarado}
                                        placeholder='Monto Máximo'
                                    />
                                </ColForm>
                            </Field>
                        </ColForm>
                        <ColForm sm={12} lg={8}>
                            <Field>
                                <ColFormLabel sm={12}>
                                    <label>Tipo inspector:</label>
                                </ColFormLabel>
                                <ColForm sm={12}>
                                    <SelectForm
                                        showSearch
                                        optionFilterProp='children'
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        onChange={this.changeInspector}
                                        value={idptipoinspectorasg}
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
            <PagePanel titulo='Consultas' children={searchAsigZona}/>
        )
    }
}

export default SearchAsigZona;