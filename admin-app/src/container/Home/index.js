import React from 'react'
import Layout from '../../componets/Loyout';
import { Row, Col, Container} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import './styles.css'

const Home = (props) => {
    return(
        <Layout sidebar>
            <h2>Home Page</h2>
        </Layout>
    )
}

export default Home;