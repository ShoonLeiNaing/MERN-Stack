import React,{useState} from 'react'
import Layout from '../components/layout/Layout'
import Input from '../components/UI/Input'
import { useDispatch,useSelector } from 'react-redux'
import { Form, Button, Container,Row,Col} from 'react-bootstrap'
import { login } from '../actions'
import { Redirect } from 'react-router-dom'

export default function Signin(props) {
    const dispatch = useDispatch()
    const [email,setEmail] =useState('')
    const [password,setPassword] = useState('')
    const [error,setError]=useState('')
    const auth = useSelector(state=>state.auth)

    const userLogin =(e)=>{
        e.preventDefault()
        const user = {
           email,password
        }
        dispatch(login(user))
    }

    if(auth.authenticate){
        return <Redirect to={`/`} />
    }
    return (
        <Layout>
            <Container>
                <Row style={{marginTop:"50px"}}>
                    <Col md={{ span:6,offset:3 }}>
                        <Form onSubmit={userLogin} method="POST">
                            <Input 
                                label="Email"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />

                            <Input 
                                label="Password"
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
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
