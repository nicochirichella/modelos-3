import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import HoverStripedTable from '../Table';
import { Button, Modal, Col } from 'react-bootstrap'


import {
    Row,
    Header,
    Container,
    Column,
} from "@front10/landing-page-book/dist/components";

class Casos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSet: false,
            showModal: false,
            soluciones: [],
            data: [],
            pantallaCasos: true,
            solucionActual: 0
        };
    }

    componentWilMount() {
        this.getCasos();
    }

    getCasos = () => {
        console.log('Entre a hacer get casos')
        return fetch(`http://localhost:4000/casos/` + localStorage.getItem('email'))
            .then(res => res.text())
            .then(res => JSON.parse(res).casos)
            .then(res => this.setState({
                data: res,
                dataSet: true,
                pantallaCasos: true
            }))
            .catch((error) => {
                console.log('fail to conect');
            });
    }

    ordenarCasos = () => {
        console.log('entre a ordenar casos')
        return fetch(`http://localhost:4000/ordenar-casos/` + localStorage.getItem('email'))
            .then(res => res.text())
            .then(res => JSON.parse(res).casos)
            .then(res => this.setState({
                data: res,
            }))
            .catch((error) => {
                console.log('fail to conect');
            });
    }

    ordenarCasos2 = () => {
        console.log('entre a ordenar casos2')
        return fetch(`http://localhost:4000/ordenar-casos2/` + localStorage.getItem('email'))
            .then(res => res.text())
            .then(res => JSON.parse(res).casos)
            .then(res => this.setState({
                data: res,
            }))
            .catch((error) => {
                console.log('fail to conect');
            });
    }

    getSoluciones = () => {
        console.log('entre a get soluciones')
        return fetch(`http://localhost:4000/soluciones/` + localStorage.getItem('email'))
            .then(res => res.text())
            .then(res => JSON.parse(res).soluciones)
            .then(res => this.setState({
                soluciones: res,
                // pantallaCasos: false
            }))
            .catch((error) => {
                console.log('fail to conect');
            });
    }

    mostrarSolucionActual = () => {
        let solucion_id = this.state.soluciones[this.state.solucionActual]
        return fetch(`http://localhost:4000/solucion/` + localStorage.getItem('email') + '/' + solucion_id.id)
            .then(res => res.text())
            .then(res => JSON.parse(res).casos)
            .then(res => this.setState({
                data: res,
                pantallaCasos: false
            }))
            .catch((error) => {
                console.log('fail to conect');
            });
    }

    proximaSolucion = () => {
        let solucionActual;
        if (this.state.solucionActual < (this.state.soluciones.length - 1)) {
            solucionActual = this.state.solucionActual + 1
        } else {
            solucionActual = 0
        }
        this.setState({
            solucionActual: solucionActual
        })
        this.mostrarSolucionActual()
    }

    showModal = (show) => {
        console.log(show)
        this.setState({
            showModal: show
        });
    }

    render() {
        if (!this.state.dataSet) {
            this.getSoluciones();
            this.getCasos();
        }
        return (
            <Container>

                <Row className="mt-5">
                    <Column>
                        <NavBar />
                    </Column>
                </Row>

                <Row className="mt-5">
                    <Column>
                        <Button className="btn btn-primary" onClick={this.mostrarSolucionActual} >
                            Mis soluciones
                        </Button>
                    </Column>
                    <Column>
                        <Button className="btn btn-primary" onClick={this.getCasos} >
                            Mis casos
                        </Button>
                    </Column>
                </Row>

                {this.state.pantallaCasos &&
                    <div>
                        <Row className="mt-5">
                            <Column>
                                <Header borderBottom type="h3">
                                    Mis casos
                                </Header>
                            </Column>
                        </Row>

                        <Row>
                            <Col md={6} xs={4}>
                                <Button className="btn btn-primary" onClick={() => this.showModal(true)} >
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                </Button>
                            </Col>
                            <Col md={2} xs={12} className='allign-right'>
                                <Button className="btn btn-primary" onClick={this.getCasos} >
                                    Todos los casos
                                </Button>
                            </Col>
                            <Col md={2} xs={12} className='allign-right'>
                                <Button className="btn btn-primary" onClick={this.ordenarCasos} >
                                    Ordenar
                                </Button>
                            </Col>
                            <Col md={2} xs={12} className='allign-right'>
                                <Button className="btn btn-primary" onClick={this.ordenarCasos2} >
                                    Ordenar 2
                                </Button>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Column>
                                <HoverStripedTable data={this.state.data} />
                            </Column>
                        </Row>
                    </div>
                }

                {!this.state.pantallaCasos &&
                    <div>
                        <Row className="mt-5">
                            <Column>
                                <Header borderBottom type="h3">
                                    Mis soluciones
                                </Header>
                            </Column>
                        </Row>
                        <Row >
                            <Col md={12}>
                                <h4> solucion {this.state.solucionActual + 1}</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2} xs={12} className='allign-right'>
                                <Button className="btn btn-primary" onClick={this.proximaSolucion} >
                                    Proxima solucion
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Column>
                                <HoverStripedTable data={this.state.data} />
                            </Column>
                        </Row>

                    </div>
                }

                <Modal show={this.state.showModal} onHide={() => this.showModal(false)} animation={false}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.showModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.showModal(false)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        );
    }
}

export default Casos;