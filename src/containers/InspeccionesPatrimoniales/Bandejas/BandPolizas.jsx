import React, {Component} from 'react'
import {OverlayTrigger, Tooltip} from "react-bootstrap";

export default class BandPolizas extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal:false
        }
    }
    handleShowModal = ()=>{}
    render() {
        return (
            <div className="container">
                <div className="title center">
                    <h2 className="title__principal">Bandeja de Pólizas por Renovación</h2>
                </div>
                <div className="panel">
                    <div className="panel__title">Consulta</div>
                    <div className="col-one-third">
                        <div className="input__field">
                            <label htmlFor="nroPoliza">Nro. Póliza:</label>
                            <input type="text" name="nroPoliza"/>
                        </div>
                        <div className="input__field">
                            <label htmlFor="rucCorredor">RUC Corredor:</label>
                            <input type="text" name="rucCorredor"/>
                        </div>
                    </div>
                    <div className="col-one-third">
                        <div className="input__field">
                            <label htmlFor="corredor">Corredor:</label>
                            <input type="text" name="corredor"/>
                        </div>
                        <div className="input__field">
                            <label htmlFor="nroRenovacion">Nro. Renovación:</label>
                            <input type="text" name="nroRenovacion"/>
                        </div>
                    </div>
                    <div className="col-one-third">
                        <div className="input__field">
                            <label htmlFor="dniCliente">Nro. DNI Cliente:</label>
                            <input type="text" name="dniCliente"/>
                        </div>
                        <div className="input__field">
                            <label htmlFor="nombreCliente">Nombre del Cliente:</label>
                            <input type="text" name="nombreCliente"/>
                        </div>
                        <button className="btn-cta f-right">
                            Consultar
                        </button>
                    </div>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cod. Producto</th>
                                <th>Nro Póliza</th>
                                <th>Nro Renovación</th>
                                <th>Nombre Corredor</th>
                                <th>RUC</th>
                                <th>Nombre Cliente</th>
                                <th>Fecha Fin</th>
                                <th>Indica de Fr</th>
                                <th>Dirección</th>
                                <th>Departamento</th>
                                <th>Provincia</th>
                                <th>Distrito</th>
                                <th>Giro</th>
                                <th>Ocupa</th>
                                <th>Valor</th>
                                <th>Estado</th>
                                <th>Acciones</th>
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
                                <td>Lima</td>
                                <td>Lima</td>
                                <td>Lima</td>
                                <td>Lima</td>
                                <td>Textdsfdsfsdf</td>
                                <td>
                                    <div className="icons-acciones">
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Editar</Tooltip>}>
                                            <span className="d-inline-block icon-inline" onClick={this.handleShowModal}>
                                                <i className="i-edit"/>
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
                                <td>Lima</td>
                                <td>Lima</td>
                                <td>Lima</td>
                                <td>Lima</td>
                                <td>Textdsfdsfsdf</td>
                                <td>
                                    <div className="icons-acciones">
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Editar</Tooltip>}>
                                            <span className="d-inline-block icon-inline" onClick={this.handleShowModal}>
                                                <i className="i-edit"/>
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
                                <td>Lima</td>
                                <td>Lima</td>
                                <td>Lima</td>
                                <td>Lima</td>
                                <td>Textdsfdsfsdf</td>
                                <td>
                                    <div className="icons-acciones">
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Editar</Tooltip>}>
                                            <span className="d-inline-block icon-inline" onClick={this.handleShowModal}>
                                                <i className="i-edit"/>
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
                                <td>Lima</td>
                                <td>Lima</td>
                                <td>Lima</td>
                                <td>Lima</td>
                                <td>Textdsfdsfsdf</td>
                                <td>
                                    <div className="icons-acciones">
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Editar</Tooltip>}>
                                            <span className="d-inline-block icon-inline" onClick={this.handleShowModal}>
                                                <i className="i-edit"/>
                                            </span>
                                        </OverlayTrigger>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}