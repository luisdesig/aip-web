import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import { error } from '../../../../components/Messages/Messages';
import { messages } from '../../../../util/messages';
import { showConfirm } from '../../../../components/Modal/Utils';
import PagePanel from '../../../../components/Page/PanelPage';
import FormGarantia from '../BandPolizas/FormGarantia'
import {
    FieldContainer,
    Field,
    ColForm,
    ColFormLabel,
    RowForm,
    ButtonForm,
    SelectForm,
    InputNumberForm,
    AutoCompleteForm,
    SkeletonForm
} from '../../../../components/Util/util.style';
import { Card } from 'antd'
import TableGarantia from './TableGarantia';
import { TIPOCREARSOLICITUD, TIPOENDOSO } from '../../../../services/constants';

const Option = SelectForm.Option;
const INDELIMINADO = 0;

class FormBandInspeccion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            idpmotivoinspeccion: props.dataEdit ? props.dataEdit.motivo.idpmotivoinspeccion : 'Seleccione',
            idpmotivoendoso: props.dataEdit ? props.dataEdit.endoso.idpmotivoendoso === null ? 'Seleccione' : props.dataEdit.endoso.idpmotivoendoso : 'Seleccione',
            idppolizaestrategica: props.dataEdit ? props.dataEdit.idppolizaestrategica : 'Seleccione',

            idepolizaacuerdo: props.dataEdit ? props.dataEdit.idepolizaacuerdo : '',
            codprod: props.dataEdit ? props.dataEdit.codprod : '1301',
            numpol: props.dataEdit ? props.dataEdit.numpol : '',
            numren: props.dataEdit ? props.dataEdit.numren : '',
            valordeclarado: props.dataEdit ? props.dataEdit.valordeclarado : '',
            idecorredor: props.dataEdit ? props.dataEdit.corredor.idecorredor : 'Seleccione',
            cliente: props.dataEdit ? props.dataEdit.cliente.nombre : '',
            idecliente: props.dataEdit ? props.dataEdit.cliente.idecliente : '',
            idedirec: '',

            ideinmueblepoliza: props.dataEdit ? props.dataEdit.ideinmueblepoliza : 'Seleccione',
            direccion: props.dataEdit ? props.dataEdit.direccion : '',

            ideubigeozona: props.dataEdit ? props.dataEdit.zona.ideubigeozona : 'Selecione',
            idezona: props.dataEdit ? props.dataEdit.zona.idezona : '',
            zona: props.dataEdit ? props.dataEdit.zona.nombre : '',

            ideriesgogironegocio: props.dataEdit ? props.dataEdit.ideriesgogironegocio : 'Seleccione',
            riesgo: props.dataEdit ? props.dataEdit.riesgo.nombre : '',

            idpestinspeccion: '',
            modalGarantia: false,
            solicitud: undefined,
            garantias: [],
            paramsgarantia: undefined,
            searchValues: false,
            searchInmueble: false
        }
        this.stringReasonInspection = ''
        this.handleOffGarantia = this.handleOffGarantia.bind(this);
        this.handleDeleteGarantia = this.handleDeleteGarantia.bind(this);
        this.typeReasonInspection = this.typeReasonInspection.bind(this);
    }
    async componentDidMount() {
        if (this.props.dataEdit) {
            await this.props.searchPoliza({
                codprod: this.props.dataEdit.codprod,
                numpol: this.props.dataEdit.numpol,
            });
            await this.props.STARTACTIONSOLICITUDGARANTIA({
                idesolicitudinspeccion: this.props.dataEdit.idesolicitudinspeccion
            })
        }
        await this.props.STARTACTIONLIST();
        await this.props.STARTACTIONLISTZONAS();
        await this.props.STARTACTIONLISTGIRONEGOCIO();
    }

    typeReasonInspection(idtypeReasonInspection) {
        let param = this.props.parametricas.IDPMOTIVOINSPECCION.filter(i => i.ideparametro === idtypeReasonInspection)
        if (param.length > 0) {
            this.stringReasonInspection = param[0].descripcion
        } else {
            this.stringReasonInspection = 'Seleccione'
        }
        return this.stringReasonInspection
    }


    handleModalGarantia = () => {
        this.setState({ modalGarantia: true, paramsgarantia: 'inspeccion' })
    }
    handleOffGarantia = () => {
        this.setState({ modalGarantia: false, params: undefined })
        this.props.ACTIONCLEANINMUEBLES();
        this.props.ACTIONCLEANSUBGARANTIA();
    }
    changeSolicitud = (e) => {
        const idpmotivoinspeccion = e
        this.setState({
            idpmotivoinspeccion,
            idpmotivoendoso: 'Seleccione',
            codprod: '1301',
            numpol: '',
            numren: '',
            valordeclarado: '',
            idecorredor: 'Seleccione',
            cliente: '',
            idecliente: '',
            idedirec: '',
            ideinmueblepoliza: 'Seleccione',
            direccion: '',
            ideubigeozona: 'Selecione',
            idezona: '',
            zona: '',
            ideriesgogironegocio: 'Seleccione',
            riesgo: '',
            searchValues: false,
            searchInmueble: false
        })
        this.props.ACTIONCLEANINSPECCION()
    }
    changeEndoso = (e) => {
        const idpmotivoendoso = e
        this.setState({
            idpmotivoendoso,
            codprod: '1301',
            numpol: '',
            numren: '',
            valordeclarado: '',
            idecorredor: 'Seleccione',
            cliente: '',
            idecliente: '',
            idedirec: '',
            ideinmueblepoliza: 'Seleccione',
            direccion: '',
            ideubigeozona: 'Selecione',
            idezona: '',
            zona: '',
            ideriesgogironegocio: 'Seleccione',
            riesgo: '',
            searchValues: false,
            searchInmueble: false
        })
        this.props.ACTIONCLEANINSPECCION()
    }
    changeCodigoProducto = (e) => {
        const codprod = e.target.value;
        if (codprod.match(/^[0-9]{0,24}$/)) {
            this.setState({ codprod })
        }
    }
    changePoliza = (e) => {
        const numpol = e.target.value;
        if (numpol.match(/^[0-9]{0,24}$/)) {
            if (this.state.searchValues) {
                this.setState({
                    numpol,
                    numren: '',
                    valordeclarado: '',
                    idecorredor: 'Seleccione',
                    cliente: '',
                    idecliente: '',
                    idedirec: '',
                    ideinmueblepoliza: 'Seleccione',
                    direccion: '',
                    ideubigeozona: 'Selecione',
                    idezona: '',
                    zona: '',
                    ideriesgogironegocio: 'Seleccione',
                    riesgo: '',
                })
                this.props.ACTIONCLEANINSPECCION()
            } else {
                this.setState({ numpol })
                this.props.ACTIONCLEANINSPECCION()
            }
        }
    }
    changeNumeroRenovacion = (e) => {
        const numren = e.target.value;
        if (numren.match(/^[0-9]{0,24}$/)) {
            this.setState({ numren })
        }
    }

    changeCliente = async (value) => {
        const cliente = value;
        if (cliente.match(/^[ ña-zA-Z]{0,50}$/)) {
            if (cliente.length > 2) {
                await this.props.STARTACTIONLISTCLIENTES({ nombre: cliente });
            } else {
                await this.props.CLEANCOMBOCLIENTES()
            }
        }
        this.setState({
            cliente: value, idecliente: ''
        });
    }
    handleCliente = (e) => {
        const cliente = e;
        const result = this.props.clientes.clientes.find(res => res.nomcliente.trim() === cliente.trim())
        this.setState({ cliente, idecliente: result.idecliente })
    }

    changeCorredor = (e) => {
        const idecorredor = e
        this.setState({ idecorredor })
    }
    changeDireccion = (e) => {
        const direccion = e.target.value
        this.setState({ direccion })
    }
    changeValorDeclarado = (e) => {
        const valordeclarado = e
        if (this.state.searchInmueble) {
            this.props.ACTIONCHANGEVALORDECLARADO(valordeclarado)
        } else {
            this.setState({ valordeclarado: valordeclarado === null ? '' : valordeclarado })
        }
    }
    changeLugar = (e) => {
        const zona = this.props.zonas.find(res => res.ideubigeozona === e)
        /*const data = {
            ideubigeozona: zona.ideubigeozona,
            idezona: zona.zona.idezona,
            nombre: zona.zona.nombre
        }*/
        const ideubigeozona = e
        this.setState({ ideubigeozona, zona: zona.zona.nombre, idezona: zona.zona.idezona })
    }
    changeGiros = (e) => {
        let giro = this.props.giros.find(res => res.ideriesgogironegocio === e);
        /*
        let data = {
            ideriesgogironegocio: e,
            ideriesgo: giro.riesgo.ideriesgo,
            nombre: giro.riesgo.nombre
        }
        */
        let ideriesgogironegocio = e
        this.setState({ ideriesgogironegocio, riesgo: giro.riesgo.nombre })
    }
    changeInmueble = (e) => {
        const ideinmueblepoliza = e
        this.setState({ ideinmueblepoliza, searchInmueble: true })
        this.props.STARTACTIONINMUEBLEINSPECCION({ "ideinmueblepoliza": e })
    }
    handleDeleteGarantia = (e) => {
        this.props.ACTIONDELETEGARANTIA(e)
    }
    searchPoliza = () => {
        const data = {
            codprod: this.state.codprod,
            numpol: this.state.numpol
        }
        if (data.codprod !== '' && data.numpol !== '') {
            this.props.searchPoliza(data);
            this.setState({ searchValues: true })
        } else {
            error('El código de producto y el número de poliza son obligatorios')
        }
    }
    addGarantia = (e) => {
        const garantias = this.state.garantias;
        if (garantias.indexOf(e.idegarantiarec) < 0) {
            garantias.push(e)
            this.props.ACTIONREGISTERGARANTIA(e)
            this.setState({ garantias })
        } else {
            error('ya se ha registrado esta garantia')
        }
    }
    onSubmit = () => {
        const { STARTACTIONPOST, STARTACTIONPUT, dataEdit, handleModalOff, inmueble, bandejainspeccion } = this.props;
        const {
            idpmotivoinspeccion,
            idpmotivoendoso,
            idppolizaestrategica,
            idepolizaacuerdo,
            codprod,
            numpol,
            numren,
            idecorredor,
            idecliente,
            cliente,
            idedirec,
            direccion,
            ideinmueblepoliza,
            ideriesgogironegocio,
            valordeclarado,
            ideubigeozona,
            idezona,
            searchInmueble,
            searchValues
        } = this.state;
        let data = {
            idpmotivoinspeccion: idpmotivoinspeccion,
            idpmotivoendoso: idpmotivoendoso === 'Seleccione' ? '' : idpmotivoendoso,
            idppolizaestrategica: idppolizaestrategica,
            poliza: {
                idepolizaacuerdo: idepolizaacuerdo,
                codprod: codprod,
                numpol: numpol,
                numren: numren,
                idecorredor: searchValues ? bandejainspeccion.corredor : idecorredor,
                idecliente: searchValues ? bandejainspeccion.cliente : idecliente === '' ? cliente : idecliente
            },
            inmueble: {
                idedirec: idedirec,
                direccion: direccion,
                ideinmueblepoliza: ideinmueblepoliza,
                ideriesgogironegocio: ideriesgogironegocio,
                ideubigeozona: ideubigeozona,
                valordeclarado: searchInmueble ? inmueble.valordeclarado : valordeclarado
            },
            idezona: searchInmueble ? inmueble.idezona : idezona,
            idpestinspeccion: 84,
            garantias: this.props.garantiascurrent
        }
        if (
            data.idpmotivoinspeccion !== 'Seleccione' && data.idpmotivoendoso !== 'Seleccione'
            && ((data.poliza.idecorredor !== 'Seleccione' && data.poliza.idecliente != ''
                && data.inmueble.direccion !== '' && data.idezona !== ''
                && data.inmueble.ideriesgogironegocio !== 'Seleccione' && data.inmueble.valordeclarado !== ''
            ) || searchInmueble)) {
            if (dataEdit) {
                data.idesolicitudinspeccion = dataEdit.idesolicitudinspeccion
                showConfirm(messages.bandejainspeccion.title,
                    messages.confirmationUpdate,
                    () => STARTACTIONPUT(data),
                    () => handleModalOff()
                );
            } else {
                showConfirm(messages.bandejainspeccion.title,
                    messages.confirmationInsert,
                    () => STARTACTIONPOST(data),
                    () => handleModalOff()
                );
            }
        } else {
            error(messages.bandejainspeccion.validacion)
        }
    }
    render() {
        const {
            idpmotivoinspeccion,
            idpmotivoendoso,
            codprod,
            numpol,
            numren,
            idecorredor,
            cliente,
            ideinmueblepoliza,
            direccion,
            ideubigeozona,
            zona,
            ideriesgogironegocio,
            riesgo,
            valordeclarado,
            modalGarantia,
            searchValues,
            searchInmueble,
            paramsgarantia
        } = this.state;
        const {
            modal,
            dataEdit,
            handleModalOff,
            bandejainspeccion,
            gruposgarantias,
            subgruposgarantias,
            inmueblegarantias,
            garantiascurrent,
            inmuebles,
            inmueble,
            ACTIONSUBGARANTIA,
            STARTACTIONGETSUBGARANTIA,
            ACTIONCLEANINMUEBLES,
            corredores,
            clientes,
            zonas,
            giros,
            params,
        } = this.props;
        const formBandInspeccionEndoso = (
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={24} lg={24}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Tipo de Solicitud:</label>
                            </ColFormLabel>
                            <ColForm sm={14} lg={10}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeSolicitud}
                                    value={this.typeReasonInspection(idpmotivoinspeccion)}
                                    disabled={params === 'editar' || params === 'endoso' ? true : false}
                                >
                                    {
                                        TIPOCREARSOLICITUD.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.idpmotivoinspeccion}>
                                                    {item.nombre}
                                                </Option>
                                            )
                                        })
                                    }
                                </SelectForm>
                            </ColForm>
                        </Field>
                    </ColForm>

                    <ColForm sm={24} lg={8} style={{ paddingTop: 1, paddingBottom: 1 }}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Tipo de Endoso:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    value={
                                        idpmotivoendoso}
                                    onChange={this.changeEndoso}
                                    disabled={
                                        idpmotivoinspeccion === 19 ||
                                            params === 'editar' ||
                                            params === 'endoso' ||
                                            idpmotivoinspeccion === 'Seleccione' ? true : false}
                                >
                                    {
                                        TIPOENDOSO.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.idpmotivoendoso}>
                                                    {item.nombre}
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
                                <label>Código de Producto:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    placeholder='Código de Producto'
                                    value={codprod}
                                    onChange={this.changeCodigoProducto}
                                    disabled={params === 'editar' ? true : false}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Nro. de Póliza:</label>
                            </ColFormLabel>
                            <ColForm sm={10}>
                                <input
                                    placeholder='Nro. De Poliza'
                                    value={numpol}
                                    onChange={this.changePoliza}
                                    disabled={params === 'editar' ? true : false}
                                />
                            </ColForm>
                            <ColForm sm={4}>
                                <ButtonForm
                                    shape="circle"
                                    icon="search"
                                    onClick={this.searchPoliza}
                                    disabled={params === 'editar' || idpmotivoendoso === 'Seleccione' ? true : false}
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
                                    onChange={this.changeNumeroRenovacion}
                                    value={searchValues ? bandejainspeccion.numren : numren}
                                    placeholder='Renovación'
                                    disabled={
                                        idpmotivoendoso === 25 ||
                                            idpmotivoendoso === 24 ||
                                            idpmotivoendoso === 23 ||
                                            params === 'editar' ? true : false
                                    }
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8} style={{ paddingTop: 1, paddingBottom: 1 }}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Corredor:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeCorredor}
                                    value={searchValues ? bandejainspeccion.corredor : idecorredor}
                                    disabled={
                                        idpmotivoendoso === 25 ||
                                            idpmotivoendoso === 24 ||
                                            idpmotivoendoso === 23 ||
                                            params === 'editar' ? true : false
                                    }
                                >
                                    {
                                        corredores.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.idecorredor}>
                                                    {`${item.nombroker} ${item.apepatbroker} ${item.apematbroker}`}
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
                                <label>Cliente:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <AutoCompleteForm
                                    value={searchValues ? bandejainspeccion.cliente : cliente}
                                    dataSource={clientes.comboclientes}
                                    onSelect={this.handleCliente}
                                    onSearch={this.changeCliente}
                                    filterOption={(inputValue, option) =>
                                        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    placeholder='Cliente'
                                    disabled={
                                        idpmotivoendoso === 25 ||
                                            idpmotivoendoso === 24 ||
                                            idpmotivoendoso === 23 ||
                                            params === 'editar' ? true : false
                                    }
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    {
                        idpmotivoinspeccion === 21 &&
                            (idpmotivoendoso === 24 ||
                                idpmotivoendoso === 25 ||
                                params === 'editar') ? <ColForm sm={24} lg={24}>
                                <Field>
                                    <ColFormLabel sm={10} lg={3}>
                                        <label>Inmueble:</label>
                                    </ColFormLabel>
                                    <ColForm sm={14} lg={21}>
                                        <SelectForm
                                            showSearch
                                            optionFilterProp='children'
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            onChange={this.changeInmueble}
                                            value={
                                                params === 'endoso' ? bandejainspeccion.ideinmueblepoliza : ideinmueblepoliza
                                            }
                                            disabled={params === 'editar' ? true : false}
                                        >
                                            {
                                                inmuebles.map((item, index) => {
                                                    return (
                                                        <Option key={index} value={item.ideinmueblepoliza}>
                                                            {`${item.ideinmueblepoliza} ${item.direccion}`}
                                                        </Option>
                                                    )
                                                })
                                            }
                                        </SelectForm>
                                    </ColForm>
                                </Field>
                            </ColForm> : ''
                    }
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Dirección:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    placeholder='Dirección'
                                    onChange={this.changeDireccion}
                                    value={searchInmueble ? inmueble.direccion : direccion}
                                    disabled={
                                        idpmotivoendoso === 25 ||
                                            idpmotivoendoso === 24 ||
                                            params === 'editar' ? true : false}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={16}>
                        <Field>
                            <ColFormLabel sm={5}>
                                <label>Lugar:</label>
                            </ColFormLabel>
                            <ColForm sm={19}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeLugar}
                                    value={searchInmueble ? inmueble.ideubigeozona : ideubigeozona}
                                    disabled={
                                        idpmotivoendoso === 25 ||
                                            idpmotivoendoso === 24 ||
                                            params === 'editar' ? true : false}
                                >
                                    {
                                        zonas.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.ideubigeozona}>
                                                    {`${item.pais.nombre} / ${item.departamento.nombre} / ${item.provincia.nombre} / ${item.distrito.nombre}`}
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
                                <label>Zona:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    placeholder='Zona'
                                    disabled={true}
                                    value={searchInmueble ? inmueble.zona.nombre : zona}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={16} style={{ paddingTop: 1, paddingBottom: 1 }}>
                        <Field>
                            <ColFormLabel sm={5}>
                                <label>Giro y Ocupación:</label>
                            </ColFormLabel>
                            <ColForm sm={19}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeGiros}
                                    value={searchInmueble ? inmueble.ideriesgogironegocio : ideriesgogironegocio}
                                    disabled={
                                        idpmotivoendoso === 25 ||
                                            idpmotivoendoso === 24 ||
                                            params === 'editar' ? true : false}
                                >
                                    {
                                        giros.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.ideriesgogironegocio}>
                                                    {`${item.gironegocio.nombre} / ${item.ocupacion.ocupacion}`}
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
                                <input
                                    placeholder='Riesgo'
                                    disabled={true}
                                    value={searchInmueble ? inmueble.riesgo.nombre : riesgo}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Valor Declarado:</label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <InputNumberForm
                                    onChange={this.changeValorDeclarado}
                                    value={searchInmueble ? inmueble.valordeclarado : valordeclarado}
                                    min={0}
                                    disabled={
                                        idpmotivoendoso === 25 ||
                                            params === 'editar' ? true : false}
                                    placeholder={0}
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
                                <input
                                    disabled={true}
                                    placeholder='Por Inspeccionar'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                </RowForm>
            </FieldContainer>
        )
        const mantPoliza = (
            <div>
                <PagePanel titulo='Datos de la solicitud' children={formBandInspeccionEndoso} />
                <div className="text-right">
                    <ButtonForm
                        className="btn_secondary"
                        onClick={this.handleModalGarantia}
                        disabled={idpmotivoinspeccion === 'Seleccione' ? true : false}
                    >
                        <i className="i-add" />
                        <span>Añadir Garantía</span>
                    </ButtonForm>
                </div>
                {
                    modalGarantia ? <FormGarantia
                        modal={modalGarantia}
                        handleModalOff={this.handleOffGarantia}
                        gruposgarantias={gruposgarantias}
                        subgruposgarantias={subgruposgarantias}
                        ACTIONSUBGARANTIA={ACTIONSUBGARANTIA}
                        addGarantia={this.addGarantia}
                        inmueblegarantias={inmueblegarantias}
                        STARTACTIONGETSUBGARANTIA={STARTACTIONGETSUBGARANTIA}
                        ACTIONCLEANINMUEBLES={ACTIONCLEANINMUEBLES}
                        params={paramsgarantia}
                    /> : ''
                }
                <TableGarantia
                    dataSource={garantiascurrent.filter(res => res.indeliminado === INDELIMINADO)}
                    handleDeleteGarantia={this.handleDeleteGarantia}
                />
            </div>
        )
        return (
            <Modal
                title={dataEdit ? 'Actualizar Solicitud' : 'Crear Solicitud'}
                visible={modal}
                width='80%'
                centered={false}
                children={
                    zonas.length === 1 || giros.length === 1 ? <SkeletonForm active>
                        <Card sm={24} loading={true}></Card>
                        <Card sm={24} loading={true}></Card>
                    </SkeletonForm> :
                        mantPoliza}
                onCancel={handleModalOff}
                onOk={this.onSubmit}
                messageTitle={messages.confirmationTitle}
                messageBody={messages.confirmationBdy}
            />
        )
    }
}

export default FormBandInspeccion;