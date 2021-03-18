import React from 'react';
import { Card } from 'react-bootstrap';

const Home = (props) => {
    const { name, image } = props.vehicle;
    return (
        <div className="col-sm-12 col-md-6 col-lg-3">
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>

            </Card.Body>
        </Card>
        </div>
        
    );
};

export default Home;