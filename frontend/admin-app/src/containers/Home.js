import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import Layout from '../layout/Layout'

export default function Home() {
    return (
        <Layout>
            <Jumbotron className="text-center">
                <h1>Welcome to Admin Dashboard</h1>
            </Jumbotron>
        </Layout>
    )
}
