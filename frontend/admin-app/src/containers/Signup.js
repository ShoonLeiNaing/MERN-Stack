import React from 'react'
import Layout from '../layout/Layout'
import Input from '../UI/Input'
import { Form, Button, Container,Row,Col} from 'react-bootstrap'

export default function Signup() {
    return (
        <Layout>
            <Container>
                <Row style={{marginTop:"50px"}}>
                    <Col md={{ span:6,offset:3 }}>
                        <Form>
                            <Input 
                                label="Email"
                                type="email"
                                placeholder="Enter email"
                                value=""
                                onChange={()=>{}}
                            />

                            <Input 
                                label="Password"
                                type="password"
                                placeholder="Enter Password"
                                value=""
                                onChange={()=>{}}
                            />
            
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
               

            </Container>
           
        </Layout>
       
    )
}
