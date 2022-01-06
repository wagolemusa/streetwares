import React from 'react'
import Layout from '../../componets/Loyout';

import { Container, Col, Form,Row, Button  } from 'react-bootstrap';
import Input from '../../componets/UI/Input';

const Signup = (props) => {
    return(
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Input 
                                        label="First Name"
                                        placeholder="First Name"
                                        Value=""
                                        type="text"
                                        onChange={() => {}}
                                    />
                                </Col>
                                <Col md={6}>
                                <Input 
                                        label="Last Name"
                                        placeholder="Last Name"
                                        Value=""
                                        type="text"
                                        onChange={() => {}}
                                    />
                                </Col>
                            </Row>

                            <Input
                                label="Email"
                                placeholder="Email"
                                Value=""
                                type="email"
                                onChange={() => { }}
                            />

                            <Input
                                label="Password"
                                placeholder="password"
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

export default Signup;