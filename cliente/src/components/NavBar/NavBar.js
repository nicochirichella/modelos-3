import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';

import {
    Row,
    Header,
    Container,
    Hero,
    Image,
    Link,
    GithubButton,
    Column,
    Navbar,
    NavbarCollapse,
    NavbarBrand,
    NavbarNav,
    NavbarLink,
    Icon,
    LanguageSwitcher,
    Features,
    Team,
    BrowserSupport,
    Gif,
    Footer,
    Copyright,
    Social
  } from "@front10/landing-page-book/dist/components";
//import './NavBar.css';

class NavBar extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: localStorage.getItem('email')
        }
    }
    render() {
        return (
            <Navbar expand="md">
                <NavbarCollapse>
                    <NavbarBrand>
                        <Image
                            alt="Front10 logo"
                            src="images/logo/front10.png"
                            width="40"
                        />
                    </NavbarBrand>
                    <NavbarNav alignItems="right">
                        <NavbarLink href="/login">
                            { this.state.email  ? this.state.email + " " : "" }
                            <Icon icon="fa fa-user-circle" />
                        </NavbarLink>
                        <NavbarLink href="/">
                            <Icon icon="fa fa-home" />
                        </NavbarLink>
                    </NavbarNav>
                </NavbarCollapse>
            </Navbar>
            //   <Navbar>
            //     <Navbar.Header>
            //       <Navbar.Brand>
            //         <a href="/">React-Bootstrap</a>
            //       </Navbar.Brand>
            //     </Navbar.Header>
            //     <Nav>
            //       <NavItem eventkey={1} href="/">Home</NavItem>
            //       <NavItem eventkey={2} href="/login">Login</NavItem>
            //     </Nav>
            //   </Navbar>
        );
    }
}

export default NavBar;