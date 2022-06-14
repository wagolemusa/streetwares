import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Header from '../Header';
import './styles.css'
const Layout = (props) => {
    return (
        <>
            <Header />

            {
                props.sidebar ?
                    <div className="container-fluid">
                        <Row>
                            <Col md={2} className="sidebar">
                                <ul>
                                    <li><NavLink to={'/'}>Home</NavLink></li>
                                    <li><NavLink to={'/category'}>Category</NavLink></li>
                                    <li><NavLink to={'/products'}>Products</NavLink></li>
                                    <li><NavLink to={'/order'}>Orders</NavLink></li>
                                </ul>
                            </Col>
                            <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>
                            {props.children}
                            </Col>
                            
                        </Row>
                    </div>
                    :
                    props.children
            }


        </>
    )
}

export default Layout