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
            data: []
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
                dataSet: true
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

    showModal = (show) => {
        console.log(show)
        this.setState({
            showModal: show
        });
    }

    render() {
        if (!this.state.dataSet) {
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
                        <Header borderBottom type="h3">
                            Mis casos
                        </Header>
                    </Column>
                </Row>
                <Row>
                    <Col md={8} xs={4}>
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
                </Row>
                <br />
                <Row>
                    <Column>
                        <HoverStripedTable data={this.state.data} />
                    </Column>
                </Row>

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