import React from 'react'
import Layout from '../layout/Layout'
import Input from '../UI/Input'
import { useDispatch } from 'react-redux'
import { Form, Button, Container,Row,Col} from 'react-bootstrap'
import { login } from '../actions'

export default function Signup() {
    const dispatch = useDispatch()
    const userLogin =(e)=>{
        
        e.preventDefault()
        const user = {
            email : "shoon@gmail.com",
            password : "testing123"
        }
     
        dispatch(login(user))
        
    }
    return (
        <Layout>
            <Container>
                <Row style={{marginTop:"50px"}}>
                    <Col md={{ span:6,offset:3 }}>
                        <Form onSubmit={userLogin}>
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
