import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import { messages } from '../../../../util/messages';
import { showConfirm } from '../../../../components/Modal/Utils';
import {
    FieldContainer,
    Field,
    ColForm,
    ColFormLabel,
    RowForm,
    SelectForm,
    CheckboxForm,
    RadioForm,
    AutoCompleteForm,
    SpanError
} from '../../../../components/Util/util.style';
import {
    TIPOSOLICITUD
} from '../../../../services/constants';
import PagePanel from '../../../../components/Page/PanelPage';
import { successloading, error, success } from '../../../../components/Messages/Messages';
import Reactotron from 'reactotron-react-js';

//const regex = "- 'ña-zA-ZáéíóúÁÉÍÓÚ"

const Option = SelectForm.Option;
const RadioGroup = RadioForm.Group;
const CheckboxGroup = CheckboxForm.Group;
const idptipoinspector = 54;

class FormMantInspector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            seleccionado: false,
            seleccionadoSupervisor: false,
            seleccionadoSupervisorEmpres: false,
            idptipoinspector: props.dataEdit ? props.dataEdit.tipoinspector.idptipoinspector : 'Seleccione',
            ideinspector: props.dataEdit ? props.dataEdit.ideingeniero : '',
            dni: props.dataEdit ? props.dataEdit.dni : '',
            apepaterno: props.dataEdit ? props.dataEdit.apepaterno : '',
            apematerno: props.dataEdit ? props.dataEdit.apematerno : '',
            nombres: props.dataEdit ? props.dataEdit.nombres : '',
            idpsede: props.dataEdit ? props.dataEdit.sede.idpsede : 'Seleccione',
            usuario: props.dataEdit ? props.dataEdit.usuario : '',
            email: props.dataEdit ? props.dataEdit.email : '',
            telefono: props.dataEdit ? props.dataEdit.telefono : '',
            celular: props.dataEdit ? props.dataEdit.celular : '',
            idpactivo: props.dataEdit ? props.dataEdit.activo.idpactivo : 'Seleccione',
            ideingeniero: props.dataEdit ? props.dataEdit.supervisor.ideingeniero : '',
            idesupervisorempresa: props.dataEdit ? props.dataEdit.supervisorEmp.idesupervisorempresa : '',
            riesgos: props.dataEdit ? props.dataEdit.riesgos.riesgos : [],
            indcrearsolicitud: props.dataEdit ? props.dataEdit.indcrearsolicitud : '',
            dataSource: [],
            supervisornombre: props.dataEdit ? props.dataEdit.supervisor.nombres : '',
            supervisorpaterno: props.dataEdit ? props.dataEdit.supervisor.apepaterno : '',
            supervisormaterno: props.dataEdit ? props.dataEdit.supervisor.apematerno : '',
            supervisortelefono: props.dataEdit ? props.dataEdit.supervisor.telefono : '',
            supervisoremail: props.dataEdit ? props.dataEdit.supervisor.email : '',
            supervisorlugar: props.dataEdit ? props.dataEdit.supervisor.lugartrabajo : '',
            supervisorempresanombre: props.dataEdit ? props.dataEdit.supervisorEmp.nombres : '',
            telefonoempresa: props.dataEdit ? props.dataEdit.supervisorEmp.telefono : '',
            emailempresa: props.dataEdit ? props.dataEdit.supervisorEmp.email : '',
            referenciaempresa: props.dataEdit ? props.dataEdit.supervisorEmp.rfrexterna : '',
            lugarempresa: props.dataEdit ? props.dataEdit.supervisorEmp.lugartrabajo : ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeTipoInspector = (e) => {
        this.setState({
            idptipoinspector: e,
        });
        /*
        this.setState({
            idptipoinspector: e,
            ideinspector: '',
            dni: '',
            apepaterno: '',
            apematerno: '',
            nombres: '',
            idpsede: 'Seleccione',
            usuario: '',
            email: '',
            telefono: '',
            celular: '',
            idpactivo: 'Seleccione',
            ideingeniero: '',
            idesupervisorempresa: '',
            riesgos: [],
            indcrearsolicitud: '',
            dataSource: [],
            ideingeniero: '',
            supervisornombre: '',
            supervisorpaterno: '',
            supervisormaterno: '',
            supervisortelefono: '',
            supervisoremail: '',
            supervisorlugar: '',
            idesupervisorempresa: '',
            supervisorempresanombre: '',
            telefonoempresa: '',
            emailempresa: '',
            referenciaempresa: '',
            lugarempresa: ''
        })
        */
    }
    changeDni = (e) => {
        const dni = e.target.value;
        if (dni.match(/^[0-9]{0,8}$/)) {
            this.setState({ dni })
        }
    }
    /* INI ECE 10072019 */
    blurDni = (e) => {
        const dni = e.target.value;
        if (dni.length != 8) {
            error('DNI inválido');
            this.setState({ dni: '' })
        }
    }
    /* FIN ECE 10072019 */
    changeUsuario = (e) => {
        const usuario = e.target.value;
        if (usuario.match(/^[ @.ñÑa-zA-Z0-9]{0,50}$/)) {
            this.setState({ usuario })
        }
    }

    changeNombre = (e) => {
        const nombres = e;
        const inspector = this.props.inspectores.supervisores.find(res =>
            `${res.nombres.replace(/ /g, "")}${res.apepaterno.replace(/ /g, "")}${res.apematerno.replace(/ /g, "")}` === nombres.replace(/ /g, "")
        )
        if (inspector !== undefined) {
            this.setState({
                seleccionado: true,
                ideinspector: inspector.ideingeniero,
                nombres: inspector.nombres,
                apepaterno: inspector.apepaterno,
                apematerno: inspector.apematerno,
                telefono: inspector.telefono,
                email: inspector.email,
            })
        } else {
            this.setState({ nombres, seleccionado: false })
        }
    }
    handleSearchNombre = async (value) => {
        const nombres = value;
        const { dataEdit } = this.props;
        const { seleccionado, ideinspector } = this.state;
        //if (this.state.idptipoinspector !== 'Seleccione') {
            if (nombres.match(/^[-_ ,.'ñÑa-zA-ZáéíóúÁÉÍÓÚ]{0,}$/)) {
                if (nombres.length > 2 &&
                    this.state.idptipoinspector === idptipoinspector &&
                    dataEdit === undefined) {
                    await this.props.STARTACTIONSEARCHSUPERVISOR({ nombre: this.state.nombres })
                } else {
                    this.props.ACTIONCLEANINSPECTOR()
                }
                if (seleccionado) {
                    this.setState({
                        seleccionado: false,
                        nombres: '',
                        apepaterno: '',
                        apematerno: '',
                        telefono: '',
                        email: ''
                    })
                }
                this.setState({
                    nombres: value, ideinspector: dataEdit ? ideinspector : ''
                });
            }
       // } else {
         //   error('Seleccione el tipo de inspector.')
        //}
    }

    /*
    handleNombres = (e) => {
        const ideinspector = e;
        const inspector = this.props.inspectores.supervisores.find(res =>
            `${res.nombres}${res.apepaterno}${res.apematerno}` === ideinspector.replace(/ /g, "")
        )
        if (inspector !== undefined) {
            this.setState({
                seleccionado: true,
                ideinspector: inspector.ideingeniero,
                nombres: inspector.nombres,
                apepaterno: inspector.apepaterno,
                apematerno: inspector.apematerno,
                telefono: inspector.telefono,
                email: inspector.email,
            })
        } else {
            this.setState({ ideinspector, seleccionado: false })
        }
    }
    changeNombres = async (value) => {
        const { dataEdit } = this.props;
        const { seleccionado } = this.state;
        const nombres = value;
        if (nombres.match(/^[-_ ,.'ña-zA-ZáéíóúÁÉÍÓÚ]{0,50}$/)) {
            if (nombres.length > 2 &&
                this.state.idptipoinspector === idptipoinspector &&
                dataEdit === undefined) {
                await this.props.STARTACTIONSEARCHSUPERVISOR({ nombre: this.state.nombres })
            } else {
                this.props.ACTIONCLEANINSPECTOR()
            }
            if (!dataEdit && seleccionado) {
                this.setState({
                    seleccionado: false,
                    dni: '',
                    usuario: '',
                    nombres,
                    apepaterno: '',
                    apematerno: '',
                    email: '',
                    telefono: '',
                    celular: '',
                    idpactivo: 'Seleccione',
                    idpsede: 'Seleccione'
                })
            }
            this.setState({
                nombres: value, ideinspector: ''
            });
        }
        /*
        this.setState({
            nombres: value, ideinspector: ''
        });
    }*/
    changePaterno = (e) => {
        const apepaterno = e.target.value;
        if (apepaterno.match(/^[-_ ,.'ñÑa-zA-ZáéíóúÁÉÍÓÚ]{0,50}$/)) {
            this.setState({ apepaterno })
        }
    }
    changeMaterno = (e) => {
        const apematerno = e.target.value;
        if (apematerno.match(/^[-_ ,.'ñÑa-zA-ZáéíóúÁÉÍÓÚ]{0,50}$/)) {
            this.setState({ apematerno })
        }
    }
    changeEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    /*
    blurEmail = (e) => {
        const email = e.target.value;
        if (email.match(/^[^@]+@rimac.com.pe$/)) {
            success('Correo valido')
        } else {
            error('Correo invalido');
            this.setState({ email: '' })
        }
    }*/
    changeTelefono = (e) => {
        const telefono = e.target.value;
        if (telefono.match(/^[- #/()*+0-9]{0,20}$/)) {
            this.setState({ telefono })
        }
    }
    changeCelular = (e) => {
        const celular = e.target.value;
        if (celular.match(/^[- #/()*+0-9]{0,20}$/)) {
            this.setState({ celular })
        }
    }
    changeEstado = (e) => {
        this.setState({ idpactivo: e })
    }
    changeSede = (e) => {
        this.setState({ idpsede: e })
    }
    changeSupervisor = (e) => {
        const supervisornombre = e;
        const ingeniero = this.props.inspectores.ingenieros.find(res =>
            `${res.nombres.replace(/ /g, "")}${res.apepaterno.replace(/ /g, "")}${res.apematerno.replace(/ /g, "")}` === supervisornombre.replace(/ /g, "")
        )
        if (ingeniero !== undefined) {
            this.setState({
                seleccionadoSupervisor: true,
                ideingeniero: ingeniero.ideingeniero,
                supervisornombre: ingeniero.nombres,
                supervisorpaterno: ingeniero.apepaterno,
                supervisormaterno: ingeniero.apematerno,
                supervisortelefono: ingeniero.telefono,
                supervisorlugar: ingeniero.lugartrabajo,
                supervisoremail: ingeniero.email,
                referenciaingeniero: ingeniero.referencia
            })
        } else {
            this.setState({ supervisornombre, seleccionadoSupervisor: false })
        }
    }
    handleSearchSupervisor = async (value) => {
        const supervisornombre = value;
        const { dataEdit } = this.props;
        const { seleccionadoSupervisor, ideingeniero } = this.state;
        if (supervisornombre.match(/^[-_ ,.'ñÑa-zA-ZáéíóúÁÉÍÓÚ]{0,}$/)) {
            if (supervisornombre.length > 2) {
                await this.props.STARTACTIONSEARCHINGENIERO({ nombre: this.state.supervisornombre })
            } else {
                this.props.ACTIONCLEANINSPECTOR()
            }
            if (seleccionadoSupervisor) {
                this.setState({
                    seleccionadoSupervisor: false,
                    supervisornombre,
                    supervisorpaterno: '',
                    supervisormaterno: '',
                    supervisortelefono: '',
                    supervisorlugar: '',
                    supervisoremail: '',
                    referenciaingeniero: ''
                })
            }
            this.setState({
                supervisornombre: value, ideingeniero: dataEdit ? ideingeniero : ''
            });
        }
    }
    changeSupervisorEmpresa = (e) => {
        const supervisorempresanombre = e;
        const empresa = this.props.inspectores.empresas.find(res => res.nombres.trim() === supervisorempresanombre.trim())
        if (empresa !== undefined) {
            this.setState({
                seleccionadoSupervisorEmpres: true,
                idesupervisorempresa: empresa.idesupervisorempresa,
                telefonoempresa: empresa.telefono,
                lugarempresa: empresa.lugartrabajo,
                emailempresa: empresa.email,
                referenciaempresa: empresa.referencia
            })
        }
        this.setState({ supervisorempresanombre })
    }
    handleSearchEmpresa = async (value) => {
        const supervisorempresanombre = value;
        const { seleccionadoSupervisorEmpres, idesupervisorempresa } = this.state;
        const { dataEdit } = this.props;
        if (supervisorempresanombre.match(/^[-_ ,.'ñÑa-zA-ZáéíóúÁÉÍÓÚ]{0,}$/)) {
            if (supervisorempresanombre.length > 2) {
                await this.props.STARTACTIONSEARCHEMPRESA({ nombre: this.state.supervisorempresanombre })
            }
            if (seleccionadoSupervisorEmpres) {
                this.setState({
                    seleccionadoSupervisorEmpres: false,
                    supervisorempresanombre,
                    telefonoempresa: '',
                    lugarempresa: '',
                    emailempresa: '',
                    referenciaempresa: ''
                })
            }
            this.setState({
                supervisorempresanombre: value, idesupervisorempresa: dataEdit ? idesupervisorempresa : ''
            });
        }
    }
    changesupervisortelefono = (e) => {
        const supervisortelefono = e.target.value;
        if (supervisortelefono.match(/^[- #/()*+0-9]{0,20}$/)) {
            this.setState({ supervisortelefono })
        }

    }
    //Ingeniero
    changeSupervisorPaterno = (e) => {
        const supervisorpaterno = e.target.value;
        if (supervisorpaterno.match(/^[-_ ,.'ñÑa-zA-ZáéíóúÁÉÍÓÚ]{0,50}$/)) {
            this.setState({ supervisorpaterno })
        }
    }
    changeSupervisorMaterno = (e) => {
        const supervisormaterno = e.target.value;
        if (supervisormaterno.match(/^[-_ ,.'ñÑa-zA-ZáéíóúÁÉÍÓÚ]{0,50}$/)) {
            this.setState({ supervisormaterno })
        }
    }
    changesupervisorlugar = (e) => {
        const supervisorlugar = e.target.value;
        if (supervisorlugar.match(/^[-_ ,.:'ñÑa-zA-ZáéíóúÁÉÍÓÚ]{0,200}$/)) {
            this.setState({ supervisorlugar })
        }
    }
    changesupervisoremail = (e) => {
        this.setState({ supervisoremail: e.target.value })
    }
    /*blursupervisoremail = (e) => {
        const supervisoremail = e.target.value;
        if (supervisoremail.match(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)) {
            success('Correo valido')
        } else {
            error('Correo invalido');
            this.setState({ supervisoremail: '' })
        }
    }*/
    changeReferenciaIngeniero = (e) => {
        const referenciaingeniero = e.target.value;
        if (referenciaingeniero.match(/^[-_ ,.:'ñÑa-zA-ZáéíóúÁÉÍÓÚ]{0,200}$/)) {
            this.setState({ referenciaingeniero })
        }
    }
    //Supervisor Empresa
    changeTelefonoEmpresa = (e) => {
        const telefonoempresa = e.target.value;
        if (telefonoempresa.match(/^[- #/()*+0-9]{0,20}$/)) {
            this.setState({ telefonoempresa })
        }

    }
    changeLugarEmpresa = (e) => {
        const lugarempresa = e.target.value;
        if (lugarempresa.match(/^[-_ ,.:'ñÑa-zA-ZáéíóúÁÉÍÓÚ]{0,200}$/)) {
            this.setState({ lugarempresa })
        }
    }
    changeEmailEmpresa = (e) => {
        this.setState({ emailempresa: e.target.value })
    }
    /*blurEmailEmpresa = (e) => {
        const emailempresa = e.target.value;
        if (emailempresa.match(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)) {
            success('Correo valido')
        } else {
            error('Correo invalido');
            this.setState({ emailempresa: '' })
        }
    }*/
    changeReferenciaEmpresa = (e) => {
        const referenciaempresa = e.target.value;
        if (referenciaempresa.match(/^[-_ ,.:'ñÑa-zA-ZáéíóúÁÉÍÓÚ]{0,200}$/)) {
            this.setState({ referenciaempresa })
        }
    }
    changeRiesgo = (e) => {
        this.setState({ riesgos: e })
    }
    changeSolicitud = (e) => {
        this.setState({ indcrearsolicitud: e.target.value })
    }

    onSubmit = () => {
        const { dataEdit } = this.props;
        const {
            idptipoinspector,
            dni,
            ideinspector,
            nombres,
            apepaterno,
            apematerno,
            idpsede,
            usuario,
            email,
            telefono,
            celular,
            idpactivo,
            riesgos,
            indcrearsolicitud,
            ideingeniero,
            supervisornombre,
            supervisorpaterno,
            supervisormaterno,
            supervisortelefono,
            supervisorlugar,
            supervisoremail,
            idesupervisorempresa,
            telefonoempresa,
            lugarempresa,
            emailempresa,
            referenciaempresa,
            supervisorempresanombre
        } = this.state;
        let data = {
            idptipoinspector: idptipoinspector,
            dni: dni,
            nombres: ideinspector === '' ? nombres.trim() : (dataEdit ? nombres.trim() : ideinspector),
            apepaterno: apepaterno.trim(),
            apematerno: apematerno.trim(),
            usuario: usuario.trim(),
            email: email.trim(),
            telefono: telefono.trim(),
            celular: celular.trim(),
            idpactivo: idpactivo,
            riesgos: riesgos,
            idpsede: idpsede,
            indcrearsolicitud: indcrearsolicitud,
            supervisor: ideingeniero === '' ? supervisornombre.trim() : (dataEdit ? supervisornombre.trim() : ideingeniero),
            supervisorpaterno: supervisorpaterno.trim(),
            supervisormaterno: supervisormaterno.trim(),
            supervisoremail: supervisoremail.trim(),
            supervisortelefono: supervisortelefono.trim(),
            supervisortrabajo: supervisorlugar.trim(),
            // Repetido
            // supervisortelefono: supervisortelefono,
            empresa: idesupervisorempresa === '' ? supervisorempresanombre.trim() : (dataEdit ? supervisorempresanombre.trim() : idesupervisorempresa),
            empresatelefono: telefonoempresa.trim(),
            empresatrabajo: lugarempresa.trim(),
            empresaemail: emailempresa.trim(),
            empresareferencia: referenciaempresa.trim()
        }
        if (idptipoinspector !== 'Seleccione' &&
            dni !== '' && nombres !== '' && apepaterno !== ''
            && apematerno !== '' && usuario !== '' && email !== ''
            && telefono !== '' && celular !== '' && idpactivo !== 'Seleccione'
            && riesgos.length !== 0 && indcrearsolicitud !== '') {
            if (idptipoinspector === 54) {
                //interno
                if (idpsede !== 'Seleccione' &&
                    data.supervisor !== '' &&
                    supervisoremail !== '' && supervisorpaterno !== '' && supervisormaterno !== '' &&
                    supervisortelefono !== '' && supervisorlugar !== '') {

                    if (!email.toUpperCase().match(/^[^@]+@RIMAC.COM.PE$/)) {
                        error('Correo de inspector interno inválido, debe ingresar un correo RÍMAC.')
                        return;
                    }

                    if (!supervisoremail.toUpperCase().match(/^[^@]+@RIMAC.COM.PE$/)) {
                        error('Correo de supervisor inválido, debe ingresar un correo RÍMAC.')
                        return;
                    }
                    if (ideinspector !== "" && ideingeniero !== "") {
                        if (ideinspector === ideingeniero) {
                            error(messages.inspector.validacionsupervisor)
                            return;
                        }
                    }

                    if (this.props.dataEdit) {
                        data.ideinspector = this.props.dataEdit.ideinspector;
                        data.ideingeniero = this.state.ideingeniero;
                        showConfirm(messages.inspector.title,
                            messages.confirmationUpdate,
                            () => this.props.STARTACTIONPUT(data),
                            () => this.props.handleModalOff()
                        );
                    } else {
                        showConfirm(messages.inspector.title,
                            messages.confirmationInsert,
                            () => this.props.STARTACTIONPOST(data),
                            () => this.props.handleModalOff()
                        );
                    }
                } else {
                    Reactotron.log('1');
                    error(messages.inspector.validacion)
                }

            } else {
                //externo
                if (data.empresa !== '' && data.supervisor !== '' && emailempresa !== ''
                    && supervisorempresanombre !== '' && telefonoempresa !== '' && lugarempresa !== '' && emailempresa !== '') {
                    if (!email.match(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/) || email.toUpperCase().match(/^[^@]+@RIMAC.COM.PE$/)) {
                        error('Correo de inspector externo inválido, debe ingresar un correo diferente a RÍMAC.')
                        return;
                    }
                    if (!supervisoremail.toUpperCase().match(/^[^@]+@RIMAC.COM.PE$/)) {
                        error('Correo de supervisor inválido, debe ingresar un correo RÍMAC.')
                        return;
                    }
                    if (this.props.dataEdit) {
                        data.ideinspector = this.props.dataEdit.ideinspector;
                        data.ideingeniero = this.state.ideingeniero;
                        data.idesupervisorempresa = this.state.idesupervisorempresa;
                        showConfirm(messages.inspector.title,
                            messages.confirmationUpdate,
                            () => this.props.STARTACTIONPUT(data),
                            () => this.props.handleModalOff()
                        );
                    } else {
                        showConfirm(messages.inspector.title,
                            messages.confirmationInsert,
                            () => this.props.STARTACTIONPOST(data),
                            () => this.props.handleModalOff()
                        );
                    }
                } else {
                    Reactotron.log('1');
                    error(messages.inspector.validacion)
                }
            }
        } else {
            Reactotron.log('2');
            error(messages.inspector.validacion)
        }
    }

    render() {
        const {
            idptipoinspector,
            usuario,
            nombres,
            apepaterno,
            apematerno,
            dni,
            email,
            telefono,
            celular,
            ideriesgo,
            riesgos,
            idpactivo,
            idpsede,
            supervisornombre,
            supervisormaterno,
            supervisorpaterno,
            supervisorempresanombre,
            dataSource,
            ideingeniero,
            supervisortelefono,
            supervisorlugar,
            supervisoremail,
            referenciaingeniero,
            idesupervisorempresa,
            telefonoempresa,
            lugarempresa,
            emailempresa,
            referenciaempresa
        } = this.state;
        const { modal, dataEdit, handleModalOff, params, inspectores, common } = this.props;
        const Inspector = (<div>
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Tipo inspector:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeTipoInspector}
                                    placeholder='Seleccione'
                                    value={dataEdit ? idptipoinspector : idptipoinspector}
                                    disabled={dataEdit ? true : false}
                                >
                                    {
                                        common.estadosinspector.map((item, index) => {
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
                            <ColFormLabel sm={10}>
                                <label>Nombres:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <AutoCompleteForm
                                    value={nombres}
                                    dataSource={inspectores.supervisor}
                                    onSelect={this.changeNombre}
                                    onSearch={this.handleSearchNombre}
                                    filterOption={(inputValue, option) =>
                                        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    placeholder="Nombres"
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={{ span: 12 }} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>A. Paterno:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changePaterno}
                                    value={apepaterno === null ? '' : apepaterno}
                                    placeholder='Apellido paterno'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                </RowForm>
                <RowForm gutter={16}>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>A. Materno:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeMaterno}
                                    value={apematerno === null ? '' : apematerno}
                                    placeholder='Apellido materno'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Dni:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeDni}
                                    onBlur={this.blurDni}
                                    value={dni}
                                    placeholder='88888888'
                                    disabled={dataEdit ? true : false}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Usuario:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={usuario}
                                    onChange={this.changeUsuario}
                                    placeholder='Usuario'
                                    disabled={dataEdit ? true : false}
                                />
                            </ColForm>
                        </Field>
                    </ColForm>


                </RowForm>
                <RowForm gutter={16}>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Email:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeEmail}
                                    value={email}
                                    placeholder='email@email.com'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Teléfono:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeTelefono}
                                    value={telefono}
                                    placeholder='000-0000'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Celular:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    onChange={this.changeCelular}
                                    value={celular}
                                    placeholder='999999999'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                </RowForm>
                <RowForm gutter={16}>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Estado:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14} lg={14}>
                                <SelectForm
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={this.changeEstado}
                                    placeholder='Seleccione'
                                    value={dataEdit ? idpactivo : idpactivo}
                                    disabled={dataEdit ? (params === 'editar' ? false : true) : false}
                                >
                                    {common.estados.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.ideparametro}>
                                                {item.descripcion}
                                            </Option>
                                        )
                                    })}
                                </SelectForm>
                            </ColForm>
                        </Field>
                    </ColForm>
                    {idptipoinspector === 54 ?
                        <ColForm sm={12} lg={8}>
                            <Field>
                                <ColFormLabel sm={10}>
                                    <label>Sede:<span>*</span></label>
                                </ColFormLabel>
                                <ColForm sm={14}>
                                    <SelectForm
                                        showSearch
                                        optionFilterProp='children'
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        onChange={this.changeSede}
                                        placeholder='Seleccione'
                                        value={dataEdit ? idpsede : idpsede}
                                        disabled={dataEdit ? (params === 'editar' ? false : true) : false}
                                    >
                                        {common.sedes.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.ideparametro}>
                                                    {item.descripcion}
                                                </Option>
                                            )
                                        })}
                                    </SelectForm>
                                </ColForm>
                            </Field>
                        </ColForm> : ''}
                </RowForm>
            </FieldContainer>
        </div>);
        const Supervisor = (<div>
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={12} lg={8} style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Nombres:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <AutoCompleteForm
                                    value={supervisornombre}
                                    dataSource={inspectores.ingeniero}
                                    onSelect={this.changeSupervisor}
                                    onSearch={this.handleSearchSupervisor}
                                    filterOption={(inputValue, option) =>
                                        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    placeholder="Nombres"
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>A. Paterno:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={supervisorpaterno}
                                    onChange={this.changeSupervisorPaterno}
                                    disabled={ideingeniero === '' ? (dataEdit ? true : false) : true}
                                    placeholder='Apellido Paterno'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>A. Materno:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={supervisormaterno}
                                    onChange={this.changeSupervisorMaterno}
                                    disabled={ideingeniero === '' ? (dataEdit ? true : false) : true}
                                    placeholder='Apellido Materno'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Teléfono:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={supervisortelefono}
                                    onChange={this.changesupervisortelefono}
                                    disabled={ideingeniero === '' ? (dataEdit ? true : false) : true}
                                    placeholder='000-0000'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Lugar de Trabajo:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={supervisorlugar}
                                    onChange={this.changesupervisorlugar}
                                    placeholder='Lugar de trabajo'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Email:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={supervisoremail}
                                    onChange={this.changesupervisoremail}
                                    disabled={ideingeniero === '' ? (dataEdit ? true : false) : true}
                                    placeholder='Email@email.com'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                </RowForm>
            </FieldContainer>
        </div>);
        const Empresa = (<div>
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Nombres:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <AutoCompleteForm
                                    value={supervisorempresanombre}
                                    dataSource={inspectores.empresa}
                                    onSelect={this.changeSupervisorEmpresa}
                                    onSearch={this.handleSearchEmpresa}
                                    filterOption={(inputValue, option) =>
                                        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    placeholder="Nombres"
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Teléfono:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={telefonoempresa}
                                    onChange={this.changeTelefonoEmpresa}
                                    disabled={idesupervisorempresa === '' ? (dataEdit ? true : false) : true}
                                    placeholder='000-0000'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Lugar de Trabajo:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={lugarempresa}
                                    onChange={this.changeLugarEmpresa}
                                    disabled={idesupervisorempresa === '' ? (dataEdit ? true : false) : true}
                                    placeholder='Lugar de trabajo'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Email:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={14}>
                                <input
                                    value={emailempresa}
                                    onChange={this.changeEmailEmpresa}
                                    disabled={idesupervisorempresa === '' ? (dataEdit ? true : false) : true}
                                    placeholder='Email@email.com'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={24} lg={8}>
                        <Field>
                            <ColFormLabel sm={10}>
                                <label>Referencia:</label>
                            </ColFormLabel>
                            <ColForm sm={8} lg={14}>
                                <input
                                    value={referenciaempresa}
                                    onChange={this.changeReferenciaEmpresa}
                                    disabled={idesupervisorempresa === '' ? (dataEdit ? true : false) : true}
                                    placeholder='Referencia'
                                />
                            </ColForm>
                        </Field>
                    </ColForm>
                </RowForm>
            </FieldContainer>
        </div>);
        const Riesgo = (<div>
            <FieldContainer>
                <RowForm gutter={16}>
                    <ColForm sm={12} lg={12}>
                        <Field>
                            <ColFormLabel sm={9}>
                                <label>Clasificación de Riesgo<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={15}>
                                <CheckboxGroup
                                    onChange={this.changeRiesgo}
                                    defaultValue={riesgos}
                                >
                                    {
                                        common.riesgos.map((item, index) => {
                                            return (
                                                <CheckboxForm key={index} value={item.ideriesgo}>
                                                    {item.nombre}
                                                </CheckboxForm>
                                            )
                                        })
                                    }
                                </CheckboxGroup>
                            </ColForm>
                        </Field>
                    </ColForm>
                    <ColForm sm={12} lg={12}>
                        <Field>
                            <ColFormLabel sm={12}>
                                <label>Permiso para crear solicitud:<span>*</span></label>
                            </ColFormLabel>
                            <ColForm sm={12}>
                                <RadioGroup
                                    onChange={this.changeSolicitud}
                                    value={this.state.indcrearsolicitud}
                                >
                                    {
                                        TIPOSOLICITUD.map((item, index) => {
                                            return (
                                                <RadioForm key={index} value={item.indcrearsolicitud}>{item.nombre}</RadioForm>
                                            )
                                        })
                                    }
                                </RadioGroup>
                            </ColForm>
                        </Field>
                    </ColForm>
                </RowForm>
            </FieldContainer>
        </div>);

        const formMantInspector = (
            <div>
                <PagePanel titulo='Datos del inspector' children={Inspector} />
                <PagePanel titulo='Datos del supervisor' children={Supervisor} />
                {
                    idptipoinspector === 55 ? <PagePanel titulo='Datos del supervisor empresa' children={Empresa} /> : ''
                }
                <PagePanel titulo='Riesgo' children={Riesgo} />
            </div>
        )
        return (
            <Modal
                title={dataEdit ? (params === 'editar' ? messages.inspector.actualizar : 'Detalle Inspector') : messages.inspector.agregar}
                visible={modal}
                width='80%'
                centered={false}
                children={formMantInspector}
                onCancel={handleModalOff}
                onOk={this.onSubmit}
                messageTitle={messages.confirmationTitle}
                messageBody={messages.confirmationBdy}
            />
        )
    }

}

export default FormMantInspector;