import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/users')
        .then(res => res.json())
        .then(data => setUsers(data))
    }, []);
    
    const handleDelete = (id) => {
        swal("Are you sure?", {
            dangerMode: true,
            buttons: true,
          }).then(result => {
              if(result){
                const url = `http://localhost:4000/users/${id}`;
                fetch(url, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if(data.deletedCount === 1){
                        alert('Successfully Deleted');
                        const filtered = users.filter(user => user._id !== id);
                        setUsers(filtered);
                    }
                    else{
                        alert('Failed to Delete')
                    }
                });
              }
          })
    }
    
    const handleUpdate = (id) => {

    }

    return (
        <div>
            <h2>Available Users: {users?.length}</h2>
            {
                users.map(user => <li key={user?._id}>{user?.name} {user?.email} <Link to={`/users/update/${user?._id}`}><button onClick={() => handleUpdate(user?.id)}><img src='https://cdn-icons-png.flaticon.com/512/5625/5625789.png' width='16'/></button></Link> <button onClick={() => handleDelete(user?._id)}><img src='https://cdn-icons-png.flaticon.com/512/3221/3221897.png' width='16'/></button></li>)
            }
        </div>
    );
};

export default Users;