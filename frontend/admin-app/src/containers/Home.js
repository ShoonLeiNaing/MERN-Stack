import React from 'react'
import { Container, Jumbotron, Row,Col } from 'react-bootstrap'
import Layout from '../components/layout/Layout'
import './homeStyle.css'

export default function Home() {
    return (
        <Layout>
            <Container fluid>
                <Row>
                    <Col md={2} className="sidebar"> Side Bar </Col>
                    <Col md={10} style={{ marginLeft:'auto' }}> Container </Col>
                </Row>
            </Container>
            {/* <Jumbotron className="text-center">
                <h1>Welcome to Admin Dashboard</h1>
            </Jumbotron> */}
        </Layout>
    )
}
