import React, { useRef } from 'react';

const AddUser = () => {
    const nameRef = useRef('');
    const emailRef = useRef('');
    const phoneRef = useRef('');

    const handleOnsubmit = (e) => {
        e.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;

        const newUser = {name, email, phone};
        console.log(newUser);

        fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            if(data._id){
                alert('Successfully Added user');
                e.target.reset();
            }
        })
    }

    return (
        <div>
            <h2>Add an User</h2>
            <form onSubmit={handleOnsubmit}>
                <input type="text" ref={nameRef} placeholder='Name'/>
                <input type="email" ref={emailRef} placeholder='Email'/>
                <input type="number" ref={phoneRef} placeholder='Phone'/>
                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddUser;