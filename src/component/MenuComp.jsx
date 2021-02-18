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
import { AuthContext } from '../App';
import MenuAdmin from './Menu/MenuAdmin';
import MenuMember from './Menu/MenuMember';
import MenuPublik from './Menu/MenuPublik';
import MenuStaff from './Menu/MenuStaff';



function MenuComp() {

    const { state, dispatch } = useContext(AuthContext)

    if (!state.isAuthenticated) {
        return (
            <MenuPublik />
        )
    }
    if (state.role === 1){
        return (
            <MenuAdmin />
        )
    }
    if (state.role === 2){
        return (
            <MenuStaff />
        )
    }
    return (
        <MenuMember />
    )
}

export default MenuComp
