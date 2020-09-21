import React, { Component } from 'react'
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';


export default class Navbars extends Component {
    render() {
        return (
            <div>
                <Navbar color="primary" dark expand="md">
        <NavbarBrand href="/">Mini Social Media</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/adduser">Add User</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/mahanthesh0r">GitHub</NavLink>
            </NavItem>
          </Nav>
        
      </Navbar>
            </div>
        )
    }
}
