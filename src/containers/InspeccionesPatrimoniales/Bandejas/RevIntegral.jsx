import React, {Component} from 'react'
import ModalComponent from '../../../components/Modal'
import ModalRevision from '../../../components/ModalRevision'
import ModalMensaje from '../../../components/ModalMensaje'
import {OverlayTrigger, Tooltip, Tabs,Tab} from "react-bootstrap";
import DatePicker from 'react-date-picker';
import ModalConfirmacion from "../../../components/ModalConfirmacion"

export default class RevIntegral extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showModalRevCuestionario: false,
            showModalConfimacionEliminar: false,
            showModalDescargar: false,
            showModalMensaje: false,
            date: ''
        }
    }

    onChange = date => this.setState({ date })

    handleShowModal = (e, item) => {
        this.setState({
            ["showModal"+item]: !this.state["showModal"+item]
        })
    }
    handleModalConfirmacion = (e, item) => {
        this.setState({
            ["showModal"+item]: false,
            showModalMensaje: true
        })
    }

    render() {
        const modalRevisionCuestionario = <div className="form-modal">
            <Tabs defaultActiveKey="datos" id="uncontrolled-tab-example">
                <Tab eventKey="datos" title="Datos Generales">
                    <div className="col-one-half">
                        <div className="input__field">
                            <label htmlFor="">Número de trámite</label>
                            <input type="text" name="" value="1"/>
                        </div>
                        <div className="input__field">
                            <label htmlFor="">Ubicación</label>
                            <input type="text" name="" value="Begonias"/>
                        </div>
                        <div className="input__field input__select">
                            <label htmlFor="">Ocupación</label>
                            <select name="">
                                <option value="" disabled selected>Seleccione</option>
                                <option value="">Oficina</option>
                            </select>
                        </div>
                        <div className="input__field">
                            <label htmlFor="">Fecha de inspección</label>
                            <input type="text" name="" value="18/02/2018 8:00 a.m" disabled/>
                        </div>
                        <div className="input__field">
                            <label htmlFor="">Entrevistado</label>
                            <input type="text" name="" value="Juan Sanchez"/>
                        </div>
                        <div className="input__field">
                            <label htmlFor="">Producido por</label>
                            <input type="text" name="" value="Juan Sanchez"/>
                        </div>
                    </div>
                    <div className="col-one-half">
                        <div className="input__field">
                            <label htmlFor="">Empresa</label>
                            <input type="text" name="" value="Abarroterias SAC"/>
                        </div>
                        <div className="input__field input__select">
                            <label htmlFor="">Giro</label>
                            <select name="" defaultValue="">
                                <option value="" disabled>Seleccione</option>
                                <option value="opc1">opc1</option>
                            </select>
                        </div>
                        <div className="input__field">
                            <label htmlFor="">Clasificación</label>
                            <input type="text" name="" value="se genera con selecciones" disabled/>
                        </div>
                        <div className="input__field">
                            <label htmlFor="">Fecha informe</label>
                            <input type="text" name="" value="18/12/2018 09:00 a.m."/>
                        </div>
                        <div className="input__field">
                            <label htmlFor="">Broker</label>
                            <input type="text" name="" value="Marsh"/>
                        </div>
                        <div className="input__field">
                            <label htmlFor="">Solicitado por</label>
                            <input type="text" name="" value="Abarroterias SAC"/>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel__title">Coordenadas</div>
                        <div className="col-one-half">
                            <div className="input__field">
                                <label htmlFor="">X GEO</label>
                                <input type="text" name="" value="0.7757"/>
                            </div>
                        </div>
                        <div className="col-one-half">
                            <div className="input__field">
                                <label htmlFor="">Y GEO</label>
                                <input type="text" name="" value="0.7757"/>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="incendio" title="Incendio">
                    <h5 className="text-center mg-20">Gestión de seguridad</h5>
                    <div className="panel">
                        <div className="panel__title">
                            Liderazgo y administración
                        </div>
                        <div className="col-one-half mg-20">
                            <p>1. ¿Cumplió las garantías planteada?</p>
                            <div className="input__field input__select">
                                <label htmlFor="">Repuesta</label>
                                <select name="" defaultValue="">
                                    <option value="" disabled>Seleccione</option>
                                    <option value="nocumpio">No cumplió</option>
                                    <option value="opc2">opc2</option>
                                </select>
                            </div>
                            <p>2. Nivel de capacitación de los colaboradores</p>
                            <div className="input__field input__select">
                                <label htmlFor="">Repuesta</label>
                                <select name="" defaultValue="">
                                    <option value="" disabled>Seleccione</option>
                                    <option value="Bajo">Bajo</option>
                                    <option value="op2">op2</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel__title">
                            Información
                        </div>
                        <div className="col-one-half mg-20">
                            <p>3. ¿Señalización de Riesgos Adecuado?</p>
                            <div className="input__field input__select">
                                <label htmlFor="">Repuesta</label>
                                <select name="" defaultValue="">
                                    <option value="" disabled>Seleccione</option>
                                    <option value="si">Si</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="mantgeneral" title="Mantenimiento General">
                    <div>Contenido</div>
                </Tab>
                <Tab eventKey="naturaleza" title="Naturaleza">
                    <div>Contenido</div>
                </Tab>
                <Tab eventKey="robo" title="Robo y/o asalto">
                    <div>Contenido</div>
                </Tab>
            </Tabs>
        </div>

        const modalDescargar = <div className="form-modal">
            <div className="panel">
                <div className="panel__title">Datos de indicadores</div>
                <div className="col-one-half">
                    <div className="input__field">
                        <label htmlFor="">Fecha inicio</label>
                        <DatePicker  className="datepicker" onChange={this.onChange} value={this.state.date} />
                    </div>
                </div>
                <div className="col-one-half">
                    <div className="input__field">
                        <label htmlFor="">Fecha fin</label>
                        <DatePicker  className="datepicker" onChange={this.onChange} value={this.state.date} />
                    </div>
                </div>
            </div>
        </div>

        return (
            <div className="container">
                <div className="title center">
                    <h2 className="title__principal">Revisión Integral del Informe</h2>
                </div>
                <div className="panel">
                    <div className="panel__title">Consultas</div>
                    <div className="col-one-third">
                        <div className="input__field">
                            <label htmlFor="">Código</label>
                            <input type="text" name=""/>
                        </div>
                        <div className="input__field">
                            <label htmlFor="">Corredor</label>
                            <input type="text" name=""/>
                        </div>
                    </div>
                    <div className="col-one-third">
                        <div className="input__field input__select">
                            <label htmlFor="">Motivo</label>
                            <select name="">
                                <option value="" disabled selected>Seleccione</option>
                                <option value="">Por Endoso</option>
                                <option value="">Por Renovación</option>
                            </select>
                        </div>
                        <div className="input__field">
                            <label htmlFor="">Nro Póliza</label>
                            <input type="text" name=""/>
                        </div>
                    </div>
                    <div className="col-one-third">
                        <div className="input__field">
                            <label htmlFor="">Nombre del Cliente</label>
                            <input type="text" name=""/>
                        </div>
                        <div className="input__field input__select">
                            <label htmlFor="">Estado</label>
                            <select name="">
                                <option value="" disabled selected>Seleccione</option>
                                <option value="">En Inspección</option>
                                <option value="">Inspeccionado</option>
                                <option value="">Rechazado</option>
                                <option value="">Cerrado con Inspección</option>
                                <option value="">Cerrado sin Inspección</option>
                                <option value="">Cancelado</option>
                            </select>
                        </div>
                        <button className="btn-cta f-right">
                            Consultar
                        </button>
                    </div>
                </div>
                <div className="text-right">
                    <button className="btn_secondary" onClick={e=>this.handleShowModal(e, "Descargar")}><i className="i-download"/>Descargar</button>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Cód Inspe</th>
                            <th>Motivo Inspección</th>
                            <th>Cód Prod</th>
                            <th>Número de Ren</th>
                            <th>Nombre del Corredor</th>
                            <th>Nombre del Corredor</th>
                            <th>Indicador Cuenta</th>
                            <th>Direc</th>
                            <th>Depart</th>
                            <th>Prov</th>
                            <th>Dist</th>
                            <th>Zona</th>
                            <th>Ocup</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1733342</td>
                            <td>17333423</td>
                            <td>Diego Alonso Perez Jurad</td>
                            <td>(01)6363434</td>
                            <td>912345678</td>
                            <td>diego@mail.com</td>
                            <td>Interno</td>
                            <td>Diego Alva</td>
                            <td>alva@mail.com</td>
                            <td>(01)45623445</td>
                            <td>I-II-V</td>
                            <td>Activo</td>
                            <td>
                                <div className="icons-acciones">
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Editar</Tooltip>}>
                                        <span className="d-inline-block icon-inline" onClick={e=>this.handleShowModal(e, "RevCuestionario")}>
                                            <i className="i-edit"/>
                                        </span>
                                    </OverlayTrigger>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Cancelar</Tooltip>}>
                                        <span className="d-inline-block icon-inline" onClick={e=>this.handleShowModal(e, "ConfirmacionEliminar")}>
                                            <i className="i-delete"/>
                                        </span>
                                    </OverlayTrigger>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>1733342</td>
                            <td>17333423</td>
                            <td>Diego Alonso Perez Jurad</td>
                            <td>(01)6363434</td>
                            <td>912345678</td>
                            <td>diego@mail.com</td>
                            <td>Interno</td>
                            <td>Diego Alva</td>
                            <td>alva@mail.com</td>
                            <td>(01)45623445</td>
                            <td>I-II-V</td>
                            <td>Activo</td>
                            <td>
                                <div className="icons-acciones">
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Editar</Tooltip>}>
                                            <span className="d-inline-block icon-inline" onClick={e=>this.handleShowModal(e, "RevCuestionario")}>
                                                <i className="i-edit"/>
                                            </span>
                                    </OverlayTrigger>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Cancelar</Tooltip>}>
                                        <span className="d-inline-block icon-inline" onClick={e=>this.handleShowModal(e, "ConfirmacionEliminar")}>
                                            <i className="i-delete"/>
                                        </span>
                                    </OverlayTrigger>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>1733342</td>
                            <td>17333423</td>
                            <td>Diego Alonso Perez Jurad</td>
                            <td>(01)6363434</td>
                            <td>912345678</td>
                            <td>diego@mail.com</td>
                            <td>Interno</td>
                            <td>Diego Alva</td>
                            <td>alva@mail.com</td>
                            <td>(01)45623445</td>
                            <td>I-II-V</td>
                            <td>Activo</td>
                            <td>
                                <div className="icons-acciones">
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Editar</Tooltip>}>
                                        <span className="d-inline-block icon-inline" onClick={e=>this.handleShowModal(e, "RevCuestionario")}>
                                            <i className="i-edit"/>
                                        </span>
                                    </OverlayTrigger>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Cancelar</Tooltip>}>
                                        <span className="d-inline-block icon-inline" onClick={e=>this.handleShowModal(e, "ConfirmacionEliminar")}>
                                            <i className="i-delete"/>
                                        </span>
                                    </OverlayTrigger>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>1733342</td>
                            <td>17333423</td>
                            <td>Diego Alonso Perez Jurad</td>
                            <td>(01)6363434</td>
                            <td>912345678</td>
                            <td>diego@mail.com</td>
                            <td>Interno</td>
                            <td>Diego Alva</td>
                            <td>alva@mail.com</td>
                            <td>(01)45623445</td>
                            <td>I-II-V</td>
                            <td>Activo</td>
                            <td>
                                <div className="icons-acciones">
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Editar</Tooltip>}>
                                        <span className="d-inline-block icon-inline" onClick={e=>this.handleShowModal(e, "RevCuestionario")}>
                                            <i className="i-edit"/>
                                        </span>
                                    </OverlayTrigger>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Eliminar</Tooltip>}>
                                        <span className="d-inline-block icon-inline" onClick={e=>this.handleShowModal(e, "ConfirmacionEliminar")}>
                                            <i className="i-delete"/>
                                        </span>
                                    </OverlayTrigger>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                {/*Modal Revisión de CUestionario*/}
                <ModalRevision
                    index="1040"
                    show={this.state.showModalRevCuestionario}
                    close={e => this.handleShowModal(e, "RevCuestionario")}
                    modalTitle='Revisión del Cuestionario'
                    children={modalRevisionCuestionario}
                    size="lg"
                    verify={e => this.handleModalConfirmacion(e, "RevCuestionario")}
                    aceptar="Guardar"
                />
                <ModalMensaje
                    show={this.state.showModalMensaje}
                    close={e => this.handleShowModal(e, "Mensaje")}
                    modalTitle='Operación exitosa'
                />
                {/*Modal Descargar Indicadores*/}
                <ModalComponent
                    index="1040"
                    show={this.state.showModalDescargar}
                    close={e => this.handleShowModal(e, "Descargar")}
                    modalTitle='Descarga de Indicadores'
                    children={modalDescargar}
                    verify={e => this.handleModalConfirmacion(e, "Descargar")}
                    aceptar="Descargar"
                    size="lg"
                />
                {/*Modal Eliminar*/}
                <ModalConfirmacion
                    show={this.state.showModalConfirmacionEliminar}
                    close={e => this.handleShowModal(e, "ConfirmacionEliminar")}
                    modalTitle='¿Esta seguro que desea eliminar este registro?'
                    verify={e =>this.handleModalConfirmacion(e,"ConfirmacionEliminar")}
                />
            </div>
        );
    }
}