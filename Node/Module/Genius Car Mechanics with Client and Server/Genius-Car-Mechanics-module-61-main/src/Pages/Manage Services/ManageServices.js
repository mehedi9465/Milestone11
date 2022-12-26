import React, { useEffect, useState } from 'react';

const ManageServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://polar-badlands-18197.herokuapp.com/services/services')
        .then(res => res.json())
        .then(data => setServices(data))
    }, []);

    const hanldeDelete = id => {
        console.log(id);
        fetch(`https://polar-badlands-18197.herokuapp.com/services/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount){
                alert('Delete Successfully');
                const remaining = services.filter(service => service._id !== id)
                setServices(remaining);
            }
            else{
                alert('Failed to Delete');
            }
        })
    }

    return (
        <div>
        <h1>Manage Services</h1>
            {
                services.map(service => <div key={service._id}>
                    <h3>{service.name}</h3>
                    <button onClick={() => hanldeDelete(service._id)}>Delete</button>
                </div>)
            }
        </div>
    );
};

export default ManageServices;