import React, {Component} from 'react'
import ModalComponent from '../../../components/Modal'
import ModalConfirmacion from '../../../components/ModalConfirmacion'
import ModalMensaje from '../../../components/ModalMensaje'
import ModalDetalle from '../../../components/ModalDetalle'
import {OverlayTrigger, Button, Tooltip} from "react-bootstrap";

export default class InspManuales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showModalGarantia: false
        }
    }

    handleShowModal = (modalItem) => {
        this.setState({showModal: !this.state.showModal, modalItem})
    }
    handleShowModalAgregar = () => {
        this.setState({showModalGarantia: !this.state.showModalGarantia})
    }
    render() {
        const contentEndoso = <div className="form-modal">
            <div className="panel">
                <div className="panel__title">Datos de la Solicitud</div>
                <div className="col-one-half">
                    <div className="input__field input__select">
                        <label htmlFor="tipo">Tipo de Endoso</label>
                        <select name="tipo">
                            <option value="" disabled selected>Seleccione</option>
                            <option value="">Inclusión de local</option>
                            <option value="">....</option>
                        </select>
                    </div>
                    <div className="input__field input__select">
                        <label htmlFor="nroPoliza">Nro de Póliza</label>
                        <select name="nroPoliza">
                            <option value="" disabled selected>Seleccione</option>
                            <option value="">001</option>
                            <option value="">002</option>
                        </select>
                    </div>
                    <div className="input__field">
                        <label htmlFor="corredor">Nombre Corredor</label>
                        <input type="text" name="corredor"/>
                    </div>
                    <div className="input__field">
                        <label htmlFor="direccion">Dirección</label>
                        <input type="text" name="direccion"/>
                    </div>
                    <div className="input__field input__select">
                        <label htmlFor="provincia">Provincia</label>
                        <select name="provincia">
                            <option value="" disabled selected>Seleccione</option>
                            <option value="">Lima</option>
                            <option value="">Huaral</option>
                        </select>
                    </div>
                    <div className="input__field input__select">
                        <label htmlFor="zona">Zona</label>
                        <select name="zona">
                            <option value="" disabled selected>Seleccione</option>
                            <option value="">zona1</option>
                            <option value="">zona2</option>
                        </select>
                    </div>
                    <div className="input__field input__select">
                        <label htmlFor="ocupacion">Ocupación</label>
                        <select name="ocupacion">
                            <option value="" disabled selected>Seleccione</option>
                            <option value="">Oficina</option>
                            <option value="">Oficina</option>
                        </select>
                    </div>
                    <div className="input__field">
                        <label htmlFor="clasificación">Clasificación</label>
                        <input type="text" name="clasificación"/>
                    </div>
                </div>
                <div className="col-one-half">
                    <div className="input__field">
                        <label htmlFor="codigo">Código de Producto</label>
                        <input type="text" name="código"/>
                    </div>
                    <div className="input__field">
                        <label htmlFor="nroRenovacion">Nro de Renovación</label>
                        <input type="text" name="nroRenovacion"/>
                    </div>
                    <div className="input__field">
                        <label htmlFor="cliente">Nombre del Cliente</label>
                        <input type="text" name="cliente"/>
                    </div>
                    <div className="input__field input__select">
                        <label htmlFor="departamento">Departamento</label>
                        <select name="departamento">
                            <option value="" disabled selected>Seleccione</option>
                            <option value="">Lima</option>
                            <option value="">Cusco</option>
                        </select>
                    </div>
                    <div className="input__field input__select">
                        <label htmlFor="distrito">Distrito</label>
                        <select name="distrito">
                            <option value="" disabled selected>Seleccione</option>
                            <option value="">Lima</option>
                            <option value="">Cusco</option>
                        </select>
                    </div>
                    <div className="input__field input__select">
                        <label htmlFor="giro">Giro</label>
                        <select name="giro">
                            <option value="" disabled selected>Seleccione</option>
                            <option value="">Abarrotes</option>
                            <option value="">Abarrotes</option>
                        </select>
                    </div>
                    <div className="input__field">
                        <label htmlFor="valor">Valor declarado</label>
                        <input type="text" name="valor"/>
                    </div>
                    <div className="input__field">
                        <label htmlFor="estado">Estado</label>
                        <input type="text" name="estado"/>
                    </div>
                </div>
            </div>
            <div className="panel">
                <div className="panel__title">Garantías</div>
                <div className="text-right">
                    <button className="btn_icon" onClick={this.handleShowModalAgregar}>
                        <i className="i-add"/>
                    </button>
                </div>
                <div className="table-container-y">
                    <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Grupo de Garantía</th>
                        <th>Sub-Grupo de Garantía</th>
                        <th>Garantías</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1733342</td>
                        <td>17333423</td>
                        <td>Diego Alonso Perez Jurad</td>
                        <td>(01)6363434</td>
                    </tr>
                    <tr>
                        <td>1733342</td>
                        <td>17333423</td>
                        <td>Diego Alonso Perez Jurad</td>
                        <td>(01)6363434</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>;

        const contentProspecto = <div className="form-modal">
            <div className="panel">
                <div className="panel__title">Datos de la Solicitud</div>
                <div className="col-one-half">
                    <div className="input__field">
                        <label htmlFor="nomCorredor">Nombre Corredor</label>
                        <input type="text" name="nomCorredor"/>
                    </div>
                    <div className="input__field">
                        <label htmlFor="direccion">Dirección</label>
                        <input type="text" name="direccion"/>
                    </div>
                    <div className="input__field input__select">
                        <label htmlFor="provincia">Provincia</label>
                        <select name="provincia">
                            <option value="" disabled selected>Seleccione</option>
                            <option value="">Lima</option>
                            <option value="">Huaral</option>
                        </select>
                    </div>
                    <div className="input__field input__select">
                        <label htmlFor="zona">Zona</label>
                        <select name="zona">
                            <option value="" disabled selected>Seleccione</option>
                            <option value="">zona1</option>
                            <option value="">zona2</option>
                        </select>
                    </div>
                    <div className="input__field input__select">
                        <label htmlFor="ocupacion">Ocupación</label>
                        <select name="ocupacion">
                            <option value="" disabled selected>Seleccione</option>
                            <option value="">Oficina</option>
                            <option value="">Oficina</option>
                        </select>
                    </div>
                    <div className="input__field">
                        <label htmlFor="clasificación">Clasificación</label>
                        <input type="text" name="clasificación"/>
                    </div>
                </div>
                <div className="col-one-half">
                    <div className="input__field">
                        <label htmlFor="cliente">Nombre del Cliente</label>
                        <input type="text" name="cliente"/>
                    </div>
                    <div className="input__field input__select">
                        <label htmlFor="departamento">Departamento</label>
                        <select name="departamento">
                            <option value="" disabled selected>Seleccione</option>
                            <option value="">Lima</option>
                            <option value="">Cusco</option>
                        </select>
                    </div>
                    <div className="input__field input__select">
                        <label htmlFor="distrito">Distrito</label>
                        <select name="distrito">
                            <option value="" disabled selected>Seleccione</option>
                            <option value="">Lima</option>
                            <option value="">Cusco</option>
                        </select>
                    </div>
                    <div className="input__field input__select">
                        <label htmlFor="giro">Giro</label>
                        <select name="giro">
                            <option value="" disabled selected>Seleccione</option>
                            <option value="">Abarrotes</option>
                            <option value="">Abarrotes</option>
                        </select>
                    </div>
                    <div className="input__field">
                        <label htmlFor="valor">Valor declarado</label>
                        <input type="text" name="valor"/>
                    </div>
                    <div className="input__field">
                        <label htmlFor="estado">Estado</label>
                        <input type="text" name="estado"/>
                    </div>
                </div>
            </div>
            <div className="panel">
                <div className="panel__title">Garantías</div>
                <div className="text-right">
                    <button className="btn_icon" onClick={this.handleShowModalAgregar}>
                        <i className="i-add"/>
                    </button>
                </div>
                <div className="table-container-y">
                    <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Grupo de Garantía</th>
                        <th>Sub-Grupo de Garantía</th>
                        <th>Garantías</th>
                        <th>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1733342</td>
                        <td>17333423</td>
                        <td>Diego Alonso Perez Jurad</td>
                        <td>(01)6363434</td>
                        <td>
                            <div className="icons-acciones">
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Eliminar</Tooltip>}>
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
                        <td>
                            <div className="icons-acciones">
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
            </div>
        </div>

        const contentGarantia = <div className="form-modal">
            <div className="panel">
                <div className="panel__title">Datos de la Garantía</div>
                <div className="col-full">
                    <div className="input__field input__select">
                        <label htmlFor="grupo">Grupo de Garantía</label>
                        <select name="grupo">
                            <option value="" disabled>Seleccione</option>
                            <option value="">Incendio</option>
                            <option value="">....</option>
                        </select>
                    </div>
                    <div className="input__field input__select">
                        <label htmlFor="subGrupo">Sub-Grupo de Garantía</label>
                        <select name="subGrupo">
                            <option value="" disabled selected>Seleccione</option>
                            <option value="">Sistema de Inundación</option>
                            <option value="">....</option>
                        </select>
                    </div>
                    <div className="input__field input__select">
                        <label htmlFor="titulo">Título de la Garantía</label>
                        <select name="titulo">
                            <option value="" disabled selected>Seleccione</option>
                            <option value="">Sistema de Riego</option>
                            <option value="">Sistema de ...</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="panel">
                <div className="panel__title">Garantías</div>
                <div className="col-full">
                    <textarea className="mg-20" name="" id="" cols="80" rows="4"></textarea>
                </div>
            </div>
        </div>;
        return (
            <div className="container">
                <div className="title center">
                    <h2 className="title__principal">Solicitud de Inspección</h2>
                </div>
                <div className="panel">
                    <div className="panel__title">Consulta</div>
                    <div className="col-one-third">
                        <div className="input__field">
                            <label htmlFor="dni">Código</label>
                            <input type="text" name="dni"/>
                        </div>
                        <div className="input__field">
                            <label htmlFor="name">Corredor</label>
                            <input type="text" name="name"/>
                        </div>
                    </div>
                    <div className="col-one-third">
                        <div className="input__field input__select">
                            <label htmlFor="tipoinsp">Motivo</label>
                            <select name="tipoinsp">
                                <option value="" disabled selected>Seleccione</option>
                                <option value="">Por prospecto</option>
                                <option value="">Por endoso</option>
                                <option value="">Por renovación</option>
                            </select>
                        </div>
                        <div className="input__field">
                            <label htmlFor="lastname">Nro. Póliza</label>
                            <input type="text" name="lastname"/>
                        </div>
                    </div>
                    <div className="col-one-third">
                        <div className="input__field">
                            <label htmlFor="lastname">Nro. DNI Cliente</label>
                            <input type="text" name="lastname"/>
                        </div>
                        <div className="input__field">
                            <label htmlFor="lastname">Nombre Cliente</label>
                            <input type="text" name="lastname"/>
                        </div>
                        <button className="btn-cta f-right">
                            Consultar
                        </button>
                    </div>
                </div>
                <div className="text-right">
                    <button className="btn_secondary" onClick={() => this.handleShowModal("endoso")}>
                        Endosos
                    </button>
                    <button className="btn_secondary" onClick={() => this.handleShowModal("prospecto")}>
                        Prospectos
                    </button>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Cód. Inspector</th>
                                <th>Motivo Inspección</th>
                                <th>Cód. Producto</th>
                                <th>Núm. de P</th>
                                <th>Núm de Ren</th>
                                <th>Nombre Corredor</th>
                                <th>Nombre Cliente</th>
                                <th>Indicador</th>
                                <th>Dirección</th>
                                <th>Departamento</th>
                                <th>Provincia</th>
                                <th>Distrito</th>
                                <th>Zona</th>
                                <th>X</th>
                                <th>Ocupa</th>
                                <th>Valor de</th>
                                <th>Gara</th>
                                <th>Clasificación riesgo</th>
                                <th>Estado Inspección</th>
                                <th>Motivo de</th>
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
                                <td>Zona</td>
                                <td>Interno</td>
                                <td>Diego Alva</td>
                                <td>alva@mail.com</td>
                                <td>(01)45623445</td>
                                <td>I-II-V</td>
                                <td>Activo</td>
                                <td>Zona</td>
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
                                <td>Zona</td>
                                <td>Interno</td>
                                <td>Diego Alva</td>
                                <td>alva@mail.com</td>
                                <td>(01)45623445</td>
                                <td>I-II-V</td>
                                <td>Activo</td>
                                <td>Zona</td>
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
                                <td>Zona</td>
                                <td>Interno</td>
                                <td>Diego Alva</td>
                                <td>alva@mail.com</td>
                                <td>(01)45623445</td>
                                <td>I-II-V</td>
                                <td>Activo</td>
                                <td>Zona</td>
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
                                <td>Zona</td>
                                <td>Interno</td>
                                <td>Diego Alva</td>
                                <td>alva@mail.com</td>
                                <td>(01)45623445</td>
                                <td>I-II-V</td>
                                <td>Activo</td>
                                <td>Zona</td>
                            </tr>
                        </tbody>
                </table>
                </div>
                
                {{  'endoso'    :<ModalComponent
                                    index='1040'
                                    show = {this.state.showModal} 
                                    close={this.handleShowModal}
                                    modalTitle='Endoso - Inclusión de Local'
                                    children={contentEndoso}
                                    size="lg"
                                    verify={this.guardarEndoso}
                                    aceptar="Guardar"
                                />,
                    'prospecto':<ModalComponent
                                    index='1040'
                                    show = {this.state.showModal} 
                                    close={this.handleShowModal}
                                    modalTitle='Prospecto'
                                    children={contentProspecto}
                                    verify={this.guardarProspecto}
                                    aceptar="Guardar"
                                    size="lg"
                                />
                }[this.state.modalItem]}
                <ModalComponent
                    show = {this.state.showModalGarantia} 
                    close={this.handleShowModalAgregar}
                    modalTitle='Agregar Garantías'
                    children={contentGarantia}
                    verify={this.agregar}
                    aceptar="Agregar"
                />
            </div>
        );
    }
}