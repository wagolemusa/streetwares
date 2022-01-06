import React from 'react'
import Layout from '../../componets/Loyout';

const Home = (props) => {
    return(
        <Layout>
            <div className='text-center' style={{margin: '5rem'}}>
                <h1>Welcome to Admin Dashboard</h1>
            </div>
        </Layout>
    )
}

export default Home;