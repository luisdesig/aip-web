import React, {Component} from 'react'
import {Container, Row, Col} from 'react-bootstrap'

export default class Bienvenida extends Component{
    render() {
        return (
            <div id="bienvenida">
                <Container>
                    <Row>
                        <Col md={12} lg={{ span:8, offset: 2 }}>
                            <div className="content-title">
                                <div className="title center">
                                    <h2 className="title__principal">Inspecciones Patrimoniales</h2>
                                </div>
                                <div className="title">
                                    <h3 className="title__name">Bienvenido, Arturo Díaz</h3>
                                    <p className="title__subtext">AL SISTEMA INTEGRADO DE INSPECCIONES PATRIMONIALES DE RIMAC</p>
                                    <p className="title__subtitle">Seleccione una opción del lado izquierdo para empezar.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}