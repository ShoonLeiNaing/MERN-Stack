import React from 'react'
import { Nav, Navbar,NavDropdown,Container } from 'react-bootstrap'
import { NavLink,Link } from 'react-router-dom'

export default function Header() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <NavLink to="/" class="navbar-brand">Admin Dashboard</NavLink>
                
                {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Nav>
                    <li className="nav-item">
                        <NavLink to="signin" className="nav-link">Sign In</NavLink>
                    </li>
                    <li className="nav-item">
                            <NavLink to="signup" className="nav-link">Sign Up</NavLink>
                    </li>     
                </Nav>
                
            </Container>
        </Navbar>
    )
}
