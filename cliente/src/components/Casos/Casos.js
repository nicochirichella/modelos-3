import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import HoverStripedTable from '../Table';

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
            email: this.props.email ? this.props.email : "",
            dataSet: false,
            data: []
        };
    }

    componentWilMount() {
        this.getCasos();
    }

    getCasos = () => {
        console.log('Entre a hacer get casos')
        console.log(this.props.email)
        return fetch(`http://localhost:4000/casos/`+localStorage.getItem('email'))
            .then(res => res.text())
            .then(res => JSON.parse(res).casos)
            .then(res => this.setState({ data: res,
                        dataSet:true }))
            .catch((error) => {
                console.log('fail to conect');
            });
    }

    render() {
        if(!this.state.dataSet) {
            this.getCasos();
        }
        return (
            <Container>

                <Row className="mt-5">
                    <Column>
                        <NavBar email={localStorage.getItem('email')} />
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
                    <HoverStripedTable data={this.state.data}>

                    </HoverStripedTable>
                </Row>


            </Container>
        );
    }
}

export default Casos;