import React, { useEffect, useState } from 'react';
import Home from '../Home/Home';
import './Data.css';

const Data = () => {
    const [image, setImage] = useState([]);
    useEffect(() => {
        const url = `https://api.mocki.io/v1/58e6a154`;
        fetch(url)
        .then(res => res.json())
        .then(data => setImage(data))
    }, [])
    return (
        
        <div className="row header">
            {
                image.map(vehicle => <Home vehicle={vehicle}></Home>)
            }
        </div>
    );
};

export default Data;