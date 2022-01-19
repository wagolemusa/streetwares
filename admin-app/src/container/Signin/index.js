import React from 'react'
import Layout from '../../componets/Loyout';
import { Container, Col, Form,Row, Button  } from 'react-bootstrap';
import Input from '../../componets/UI/Input';

import {login} from '../../actions'
import { useDispatch } from 'react-redux';

const Signin = (props) => {

    const dispatch = useDispatch()

    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email: 'homie@gmail.com',
            password: '2233344'
        }
        dispatch(login(user));
    }
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit={userLogin}>
                            <Input
                                label="Email"
                                placeholder="Email"
                                Value=""
                                type="email"
                                onChange={() => { }}
                            />

                            <Input
                                label="Password"
                                placeholder="Password"
                                Value=""
                                type="password"
                                onChange={() => { }}
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

export default Signin;