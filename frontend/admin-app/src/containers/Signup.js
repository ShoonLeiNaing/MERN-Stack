import React,{useState} from 'react'
import Layout from '../components/layout/Layout'
import { Form, Button, Container,Row,Col} from 'react-bootstrap'
import Input from '../components/UI/Input'
import { Redirect } from 'react-router-dom'
import { useSelector,useDispatch} from 'react-redux'
import { signup } from '../actions'

export default function Signup(user) {
    const auth = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail] =useState('')
    const [password,setPassword] = useState('')
    const [error,setError]=useState('')

    const adminSignUp = (e) =>{
        e.preventDefault()
        const user = {
            firstName,lastName,email,password
        }
        dispatch(signup(user))
    }

    if(auth.authenicate){
        return <Redirect to={`/`} />
    }
    if(user.loading){
        return <p>Loading ... !</p>
    }

    
    return (
        <Layout>
            <Container>
                <p>{ user.message}</p>
                <Row style={{marginTop:"50px"}}>
                    <Col md={{ span:6,offset:3 }}>
                        <Form onSubmit={adminSignUp}>
                            <Row>
                                <Col md={6}>
                                   <Input 
                                   label="First Name"
                                   type="text"
                                   placeholder="Enter first name"
                                   value={firstName}
                                   onChange={(e)=>{setFirstName(e.target.value)}}
                                   />
                                </Col>
                                <Col md={6}>
                                   <Input 
                                   label="Second Name"
                                   type="text"
                                   placeholder="Enter second name"
                                   value={lastName}
                                   onChange={(e)=>{setLastName(e.target.value)}}
                                   />
                                </Col>
                            </Row>
                            <Input 
                                   label="Email"
                                   type="email"
                                   placeholder="Enter email"
                                   value={email}
                                   onChange={(e)=>{setEmail(e.target.value)}}
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

