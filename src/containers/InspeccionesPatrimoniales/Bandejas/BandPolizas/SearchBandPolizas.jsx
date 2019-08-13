import React from 'react';
import {
    FieldContainer,
    Field,
    ColForm,
    ColFormLabel,
    RowForm,
    ButtonForm
} from '../../../../components/Util/util.style';
import PagePanel from '../../../../components/Page/PanelPage';
import { DatePicker } from 'antd';
import moment from 'moment';
moment.locale('es');

const { RangePicker } = DatePicker;

class SearchMantRoles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            codprod: '',
            numpol: '',
            numren: '',
            nombrecorredor: '',
            numdocbroker: '',
            nomcliente: '',
            numdoccliente: '',
            rangedate: ''
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
        const nombrecorredor = e.target.value;
        this.setState({ nombrecorredor })
    }
    changeDocCorredor = (e) => {
        const numdocbroker = e.target.value;
        if (numdocbroker.match(/^[0-9]{0,11}$/)) {
            this.setState({ numdocbroker })
        }
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
    changeDate = (date, dateString) => {
        if (dateString[0] !== '') {
            this.setState({
                rangedate: dateString
            })
        }else{
            this.setState({
                rangedate: ''
            })
        }
    }
    onClean = () => {
        const state = {
            codprod: '',
            numpol: '',
            numren: '',
            nombrecorredor: '',
            numdocbroker: '',
            nomcliente: '',
            numdoccliente: '',
            rangedate: ''
        }
        this.setState(state)
        this.props.STARTACTIONSEARCH(state);
    }
    onSearch = () => {
        let data = this.state
        console.log(data);
        this.props.STARTACTIONSEARCH(data);
    }

    render() {
        const {
            codprod,
            numpol,
            numren,
            nombrecorredor,
            numdocbroker,
            nomcliente,
            numdoccliente,
            rangedate
        } = this.state;
        const FormMantRoles = (
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Cód. Producto:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeProducto}
                                    value={codprod}
                                    placeholder='Cód. Producto'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>RUC Corredor:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeDocCorredor}
                                    value={numdocbroker}
                                    placeholder='RUC Corredor'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>DNI Cliente:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeDocCliente}
                                    value={numdoccliente}
                                    placeholder='DNI'
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
                                    value={nombrecorredor}
                                    placeholder='Nombres'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Cliente:</label>
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
                                <label>Nro. de Renovación:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeRenovacion}
                                    value={numren}
                                    placeholder='Nro. de Renovación'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={16}>
                        <Field>
                            <ColFormLabel sm={8}>
                                <label>Fecha de Vigencia:</label>
                            </ColFormLabel>
                        </Field>
                        <RangePicker
                            onChange={this.changeDate}
                            value={rangedate === '' ? rangedate : [moment(rangedate[0], 'YYYY-MM-DD'), moment(rangedate[1], 'YYYY-MM-DD')]} />
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

export default SearchMantRoles;