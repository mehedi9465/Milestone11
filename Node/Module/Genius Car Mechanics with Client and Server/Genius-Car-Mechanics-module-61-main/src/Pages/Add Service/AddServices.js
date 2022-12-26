import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './AddService.css'

const AddServices = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        axios.post('https://polar-badlands-18197.herokuapp.com/services', data)
          .then(res => {
            if(res.status === 200){
                alert('Successfully Added');
                reset();
            }
            else{
                alert('Falied to Add');
                reset();
            }
          }) 
    }
      
    return (
        <div className='addService'>
            <h2>Add a Service</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name", { required: true })} placeholder='Enter Service name'/>
            <input type='number' {...register("price", { required: true })} placeholder='Service cost'/>
            <textarea {...register("description", { required: true })} placeholder='Service description'/>
            <input {...register("img", { required: true })} placeholder='Enter Image link'/>
            <input type="submit" />
            </form>

        </div>
    );
};

export default AddServices;