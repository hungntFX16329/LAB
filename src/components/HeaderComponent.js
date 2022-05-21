import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom'


class Header extends Component {

    constructor(props){
        super(props);
        this.toggleNav = this.toggleNav.bind(this)

        this.state ={
            isNavOpen: false
        };
        
    }


    toggleNav(){
        this.setState({
            isNavOpen : !this.state.isNavOpen
        })
    }

    render(){
        return(
            <div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img src="assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion" /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/nhanvien"><span className="fa fa-home fa-lg"></span> Nhân viên</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/phongban"><span className="fa fa-info fa-lg"></span> Phòng ban</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu"><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/bangluong"><span className="fa fa-address-card fa-lg"></span> Bảng lương</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    }
}

export default Header;