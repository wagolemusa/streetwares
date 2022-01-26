import React, { useState } from 'react'
import Layout from '../../componets/Loyout';
import { Container, Col, Form,Row, Button  } from 'react-bootstrap';
import Input from '../../componets/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signup } from '../../actions';

const dispatch = useDispatch

const Signup = (props) => {
    
    const [firstname, setFirstname] = useState('');
    const [lastname , setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);

    const userSignup = (e) => {
        e.preventDefault();
        const user = {
            firstname, lastname,email,password
        }
        dispatch(signup(user));
    }

    if(auth.authenticate){
        return <Navigate to={`/`} />
    }

    if(user.loading){
        return <p>Loading....!</p>
    }
    return(
        <Layout>
            <Container>
                {user.message}
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{span: 6, offset: 3}}>
                    <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input 
                                        label="First Name"
                                        placeholder="First Name"
                                        value={firstname}
                                        type="text"
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                <Input 
                                        label="Last Name"
                                        placeholder="Last Name"
                                        value={lastname}
                                        type="text"
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
                                </Col>
                            </Row>

                            <Input
                                label="Email"
                                placeholder="Email"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                label="Password"
                                placeholder="password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        <br/>
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

export default Signup;