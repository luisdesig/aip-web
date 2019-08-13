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
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;
const Option = SelectForm.Option

class SearchBandInspeccion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numsolicitudinspeccion: '',
            codprod: '',
            numpol: '',
            nomcorredor: '',
            nomcliente: '',
            numdoccliente: '',
            idpmotivoinspeccion: 'Seleccione',
            ideriesgo: 'Seleccione'
        }
    }
    changeCodigo = (e) => {
        const numsolicitudinspeccion = e.target.value;
        if (numsolicitudinspeccion.match(/^[0-9a-zA-Z]{0,45}$/)) {
            this.setState({ numsolicitudinspeccion })
        }
    }
    changeProducto = (e) => {
        const codprod = e.target.value;
        if (codprod.match(/^[0-9]{0,45}$/)) {
            this.setState({ codprod })
        }
    }
    changePoliza = (e) => {
        const numpol = e.target.value;
        if (numpol.match(/^[0-9]{0,45}$/)) {
            this.setState({ numpol })
        }
    }
    changeRenovacion = (e) => {
        const numren = e.target.value;
        if (numren.match(/^[0-9]{0,45}$/)) {
            this.setState({ numren })
        }
    }
    changeNombreCorredor = (e) => {
        const nomcorredor = e.target.value;
        this.setState({ nomcorredor })
    }
    changeNombreCliente = (e) => {
        const nomcliente = e.target.value;
        this.setState({ nomcliente })
    }
    changeDocCliente = (e) => {
        const numdoccliente = e.target.value;
        if (numdoccliente.match(/^[0-9]{0,11}$/)) {
            this.setState({ numdoccliente })
        }
    }
    changeMotivo = (e) => {
        const idpmotivoinspeccion = e;
        this.setState({ idpmotivoinspeccion })
    }
    changeRiesgo = (e) => {
        const ideriesgo = e;
        this.setState({ ideriesgo })
    }

    onClean = () => {
        const state = {
            numsolicitudinspeccion: '',
            codprod: '',
            numpol: '',
            nomcorredor: '',
            nomcliente: '',
            numdoccliente: '',
            idpmotivoinspeccion: 'Seleccione',
            ideriesgo: 'Seleccione'
        }
        this.setState(state)
        this.props.STARTACTIONSEARCH({
            numsolicitudinspeccion: '',
            codprod: '',
            numpol: '',
            nomcorredor: '',
            numdoccliente: '',
            nomcliente: '',
            idpmotivoinspeccion: '',
            ideriesgo: ''
        });
    }
    onSearch = () => {
        let data = {
            numsolicitudinspeccion: this.state.numsolicitudinspeccion,
            codprod: this.state.codprod,
            numpol: this.state.numpol,
            nomcorredor: this.state.nomcorredor,
            nomcliente: this.state.nomcliente,
            numdoccliente: this.state.numdoccliente,
            idpmotivoinspeccion: this.state.idpmotivoinspeccion === 'Seleccione' ? '' : this.state.idpmotivoinspeccion,
            ideriesgo: this.state.ideriesgo === 'Seleccione' ? '' : this.state.ideriesgo
        }
        this.props.STARTACTIONSEARCH(data);
    }

    render() {
        const {
            numsolicitudinspeccion,
            codprod,
            numpol,
            nomcorredor,
            nomcliente,
            numdoccliente,
            idpmotivoinspeccion,
            ideriesgo
        } = this.state;
        const { motivosinspeccion, riesgos } = this.props;
        const FormMantRoles = (
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Código de Solicitud:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeCodigo}
                                    value={numsolicitudinspeccion}
                                    placeholder='Código'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Nro. de Producto:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeProducto}
                                    value={codprod}
                                    placeholder='Nro. de Producto'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Nro. de Póliza:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changePoliza}
                                    value={numpol}
                                    placeholder='Nro. de Póliza'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Corredor:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeNombreCorredor}
                                    value={nomcorredor}
                                    placeholder='Nombres'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>DNI:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeDocCliente}
                                    value={numdoccliente}
                                    placeholder='DNI Cliente'
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
                                    onChange={this.changeNombreCliente}
                                    value={nomcliente}
                                    placeholder='Cliente'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Motivo:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeMotivo}
                                    value={idpmotivoinspeccion}
                                >
                                    {
                                        motivosinspeccion.map((item, index) => {
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
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Clasificación de Riesgo:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
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
            <PagePanel titulo='Consultas' children={FormMantRoles} />
        )
    }
}

export default SearchBandInspeccion;