import React, { Fragment, useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button
} from 'reactstrap';
import { AuthContext } from '../../App';

function MenuMember() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { state, dispatch } = useContext(AuthContext)
    return (
        <div>
            <Navbar className="navbar-dark bg-dark" expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink className="nav-link" to="/dashboard">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/transaksi">Transaksi</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        <UncontrolledDropdown>
                            <DropdownToggle nav caret>
                                {state.user}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                <Button color="default"
                                        onClick="/transaksi">

                                        LOGOUT
                                    </Button>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Button color="default"
                                        onClick={() =>
                                            dispatch({
                                                type: "LOGOUT"
                                            })}>

                                        LOGOUT
                                    </Button>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default MenuMember
