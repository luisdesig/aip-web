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

class SearchMantZona extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            idezona: 'Seleccione',
            idepais: 'Seleccione',
            idedepartamento: 'Seleccione',
            ideprovincia: 'Seleccione',
            idedistrito: 'Seleccione',
            ubigeos: [],
            ERROR: []
        }
    }
    changeZona = (e) => {
        this.setState({idezona: e})
    }
    changePais = (e) => {
        this.props.ACTIONSELECTDEPARTAMENTO(e)
        this.setState({
            idepais: e, 
            idedepartamento: 'Seleccione',
            ideprovincia: 'Seleccione',
            idedistrito: 'Seleccione'
        }) 
    }
    changeDepartamento = (e) => {
        this.props.ACTIONSELECTPROVINCIA(e);
        this.setState({
            idedepartamento: e, 
            ideprovincia: 'Seleccione',
            idedistrito: 'Seleccione'
        }) 
    }
    changeProvincia = (e) => {
        this.props.ACTIONSELECTDISTRITO(e);
        this.setState({ideprovincia: e, idedistrito: 'Seleccione'}) 
    }
    changeDistrito = (e) => {
        this.setState({idedistrito: e}) 
    }

    onClean = async () => {
        await this.props.STARTACTIONSEARCH({
            idezona: '',
            idepais: '',
            idedepartamento: '',
            ideprovincia: '',
            idedistrito: '',
        });
        await this.props.ACTIONCLEANSEARCHZONAS();
        this.setState({
            idezona: 'Seleccione',
            idepais: 'Seleccione',
            idedepartamento: 'Seleccione',
            ideprovincia: 'Seleccione',
            idedistrito: 'Seleccione',
        })
    }

    onSearch = async () => {
        let data = {
            idezona: this.state.idezona === 'Seleccione' ? '' : this.state.idezona,
            idepais: this.state.idepais === 'Seleccione' ? '' : this.state.idepais,
            idedepartamento: this.state.idedepartamento === 'Seleccione' ? '' : this.state.idedepartamento,
            ideprovincia: this.state.ideprovincia === 'Seleccione' ? '' : this.state.ideprovincia,
            idedistrito: this.state.idedistrito === 'Seleccione' ? '' : this.state.idedistrito,
        }
        await this.props.STARTACTIONSEARCH(data);
    }

    render() {
        const {idezona,idepais,idedepartamento,ideprovincia,idedistrito, ERROR } = this.state;
        const { 
            zonas, 
            paises,
            departamentos,
            provincias,
            distritos 
        } =this.props;

        const searchMantZona = (
                <FieldContainer>
                    <RowForm gutter={16}>
                        <ColForm md={23} lg={8}>
                            <Field>
                                <ColFormLabel sm={12}>
                                    <label>Nombre de la Zona:</label>
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
                                <ColFormLabel sm={10}>
                                    <label>País:</label>
                                </ColFormLabel>
                                <ColForm sm={14}>
                                    <SelectForm
                                        showSearch
                                        optionFilterProp='children'
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        onChange={this.changePais}
                                        value={idepais}
                                    >
                                        {
                                            paises.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item.idepais}>
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
                                    <label>Departamento:</label>
                                </ColFormLabel>
                                <ColForm sm={14}>
                                    <SelectForm
                                        showSearch
                                        optionFilterProp='children'
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        onChange={this.changeDepartamento}
                                        value={idedepartamento}
                                    >
                                        {
                                            departamentos.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item.ideubigeo}>
                                                        {item.nombre}
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
                        <ColForm sm={12} lg={{span:8, offset: 8}}>
                            <Field>
                                <ColFormLabel sm={10}>
                                    <label>Provincia:</label>
                                </ColFormLabel>
                                <ColForm sm={14}>
                                    <SelectForm
                                        showSearch
                                        optionFilterProp='children'
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        onChange={this.changeProvincia}
                                        value={ideprovincia}
                                    >
                                        {
                                            provincias.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item.ideubigeo}>
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
                                    <label>Distrito:</label>
                                </ColFormLabel>
                                <ColForm sm={14}>
                                    <SelectForm
                                        showSearch
                                        optionFilterProp='children'
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        onChange={this.changeDistrito}
                                        value={idedistrito}
                                    >
                                        {
                                            distritos.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item.ideubigeo}>
                                                        {item.nombre}
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
            <PagePanel titulo='Consultas' children={searchMantZona}/>
        )
    }
}

export default SearchMantZona;
