import React from 'react'
import Layout from '../layout/Layout'
import { Form, Button, Container,Row,Col} from 'react-bootstrap'
import Input from '../UI/Input'

export default function Signin() {
   
    return (
        <Layout>
            <Container>
                <Row style={{marginTop:"50px"}}>
                    <Col md={{ span:6,offset:3 }}>
                        <Form >
                            <Row>
                                <Col md={6}>
                                   <Input 
                                   label="First Name"
                                   type="text"
                                   placeholder="Enter first name"
                                   value=""
                                   onChange={()=>{}}
                                   />
                                </Col>
                                <Col md={6}>
                                   <Input 
                                   label="Second Name"
                                   type="text"
                                   placeholder="Enter second name"
                                   value=""
                                   onChange={()=>{}}
                                   />
                                </Col>
                            </Row>
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

