import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`http://localhost:4000/users/${id}`)
        .then(res => res.json())
        .then(data => setUser(data))
    }, []);

    const handleUpdate = e => {
        e.preventDefault();
        fetch(`http://localhost:4000/users/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount){
                alert(`Successfully Updated ${user.name}`)
            }
            else{
                alert('Failed to Update')
            }
        })
    }

    const handleNameChange = e => {
        const updateName = e.target.value;
        const updateUser = { name: updateName, email: user.email}
        setUser(updateUser)
    }

    const handleEmailChange = e => {
        const updateEmail = e.target.value;
        const updateUser = { name: user.name, email: updateEmail}
        setUser(updateUser)
    }

    return (
        <div>
            <h2>Update User</h2>
            <p><small>Updating: {user.name}</small></p>
            <form onSubmit={handleUpdate}>
                <input type="text" onChange={handleNameChange} value={user.name || ''} />
                <input type="email" onChange={handleEmailChange} value={user.email || ''} />
                <input type="submit" value='Update' />
            </form>
        </div>
    );
};

export default UpdateUser;