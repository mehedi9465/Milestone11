import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Booking = () => {
    const [service, setService] = useState({});
    const { serviceId } = useParams();

    useEffect(() => {
        fetch(`https://polar-badlands-18197.herokuapp.com/services/${serviceId}`)
        .then(res => res.json())
        .then(data => setService(data))
    }, []);
    console.log(service);
    return (
        <div>
            <h2>Details of: {service?.name}</h2>
            
        </div>
    );
};

export default Booking;