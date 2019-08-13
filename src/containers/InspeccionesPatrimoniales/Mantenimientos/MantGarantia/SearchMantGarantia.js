import React from 'react';
import {
    FieldContainer,
    Field,
    ColForm,
    ColFormLabel,
    RowForm,
    InputNumberForm,
    ButtonForm,
    SelectForm
} from '../../../../components/Util/util.style';
import PagePanel from '../../../../components/Page/PanelPage';

const Option = SelectForm.Option;

class SearchMantGarantia extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            idegarantiarec: '',
            idegrupogarantia: 'Seleccione',
            idesubgrupogarantia: 'Seleccione',
            titulo: '',
            prioridad: '',
            dscgarantia: '',
            ERROR: []
        }
    }

    changeId = (e) => {
        this.setState({ idegarantiarec: e })
    }
    changeGrupoGarantia = async (e) => {
        await this.props.ACTIONSUBGARANTIA(e)
        this.setState({ idegrupogarantia: e, idesubgrupogarantia: 'Seleccione' })
    }
    changeGrupoSubGarantia = (e) => {
        this.setState({ idesubgrupogarantia: e })
    }
    changeTitulo = (e) => {
        const titulo = e.target.value;
        this.setState({ titulo })
    }
    changePrioridad = (e) => {
            this.setState({ prioridad: e })

    }
    onClean = async () => {
        this.props.ACTIONCLEANSUBGARANTIA()
        await this.props.STARTACTIONSEARCH({
            dscgarantia: '',
            idegarantiarec: '',
            idegrupogarantia: '',
            idesubgrupogarantia: '',
            titulo: '',
            prioridad: ''
        });
        this.setState({
            idegarantiarec: '',
            idegrupogarantia: 'Seleccione',
            idesubgrupogarantia: 'Seleccione',
            titulo: '',
            dscgarantia: '',
            prioridad: ''
        })
    }

    onSearch = async () => {
        let data = {
            idegarantiarec: this.state.idegarantiarec === null ? '' : this.state.idegarantiarec,
            idegrupogarantia: this.state.idegrupogarantia === 'Seleccione' ? '' : this.state.idegrupogarantia,
            idesubgrupogarantia: this.state.idesubgrupogarantia === 'Seleccione' ? '' : this.state.idesubgrupogarantia,
            titulo: this.state.titulo,
            prioridad: this.state.prioridad === null ? '' : this.state.prioridad
        }
        await this.props.STARTACTIONSEARCH(data);
    }

    render() {
        const {
            idegarantiarec,
            idegrupogarantia,
            idesubgrupogarantia,
            titulo,
            prioridad,
            ERROR
        } = this.state;
        const {
            gruposgarantias,
            subgruposgarantias
        } = this.props;
        const searchMantGarantia = (
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={23} lg={6}>
                        <Field>
                            <ColFormLabel sm={12}>
                                <label>Identificador:</label>
                            </ColFormLabel>
                            <ColForm sm={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <InputNumberForm
                                    min={0}
                                    onChange={this.changeId}
                                    value={idegarantiarec}
                                    placeholder='Identificador'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={9}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Grupo de Garantía:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeGrupoGarantia}
                                    value={idegrupogarantia}
                                    placeholder='Grupo de Garantía'
                                >
                                    {
                                        gruposgarantias.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.idegrupogarantia}>
                                                    {item.nombre}
                                                </Option>
                                            )
                                        })
                                    }
                                </SelectForm>
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={9}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Sub-Grupo de Garantía:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeGrupoSubGarantia}
                                    value={idesubgrupogarantia}
                                    placeholder='Sub-Grupo de Garantía'
                                >
                                    {
                                        subgruposgarantias.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.idesubgrupogarantia}>
                                                    {item.nombre}
                                                </Option>
                                            )
                                        })
                                    }
                                </SelectForm>
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={23} lg={{ span: 9, offset: 6 }}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Título de Garantía:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeTitulo}
                                    value={titulo}
                                    placeholder='Título'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={23} lg={9}>
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
            <PagePanel titulo='Consultas' children={searchMantGarantia} />
        )
    }
}

export default SearchMantGarantia;