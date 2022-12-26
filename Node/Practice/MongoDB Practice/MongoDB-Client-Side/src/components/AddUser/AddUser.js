import React, { useRef } from 'react';

const AddUser = () => {
    const nameRef = useRef('');
    const emailRef = useRef('');

    const handleAddUser = e => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const user = {name, email};
        
        fetch('http://localhost:4000/users', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            e.target.reset();
            if(data._id){
                alert(`Successfully Added ${data.name}`);
            }
        })
    }

    return (
        <div>
            <h2>Add an User</h2>
            <form onSubmit={handleAddUser}>
                <input type="text" ref={nameRef} placeholder='Enter Name' />
                <input type="email" ref={emailRef} placeholde='Enter Email' />
                <input type="submit" value='add'/>
            </form>
        </div>
    );
};

export default AddUser;