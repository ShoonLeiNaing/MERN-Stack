import React from 'react'
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { signout } from '../../actions'

export default function Header() {
    const auth = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const logout=()=>{
        dispatch(signout())
    }
    const renderLoggedinLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span className="nav-link" onClick={logout}>Sign Out</span>
                </li>
            </Nav>
        )
    }
    const renderNonLoggedinLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <NavLink to="signin" className="nav-link">Sign In</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="signup" className="nav-link">Sign Up</NavLink>
                </li>
            </Nav>
        )
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
            <Container fluid>
                <NavLink to="/" class="navbar-brand">Admin Dashboard</NavLink>

                {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                { auth.authenticate ? renderLoggedinLinks():renderNonLoggedinLinks()}
            </Container>
        </Navbar>
    )
}
