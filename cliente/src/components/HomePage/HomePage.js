import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import {Carousel} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import {
    Row,
    Header,
    Container,
    Column,
} from "@front10/landing-page-book/dist/components";

class HomePage extends Component {
    render() {
        return (
            <Container>

                <Row className="mt-5">
                    <Column>
                        <Header borderBottom type="h3">
                            Ordenando mis casos
                        </Header>
                    </Column>
                </Row>
                <Row className="mt-5">
                    <Column>
                        <NavBar />
                    </Column>
                </Row>
                <Row className="mt-5">
                    <Column>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="images/slide03.jpg"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Column>
                </Row>
            </Container>
        );
    }
}

export default HomePage;