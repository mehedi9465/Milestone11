import React, { useRef } from 'react';

const AddProduct = () => {

    const productNameRef = useRef();
    const productPriceRef = useRef();

    const handleAddProcess = e => {
        e.preventDefault();
        
        const productName = productNameRef?.current?.value;
        const productPrice = productPriceRef?.current?.value;
        const product = {productName, productPrice};
        console.log(product);

        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                alert('Successfully Added', product.productName);
            }
            else{
                alert('Failed to Add Product');
            }
        })
        e.target.reset();
    }

    return (
        <div>
            <h2>Add a Product</h2>
            <form onSubmit={handleAddProcess}>
                <input type="text" ref={productNameRef} placeholder='Product Name' />
                <input type="number" ref={productPriceRef} placeholder='Product Price' />
                <input type="submit" value='Add' />
            </form>
        </div>
    );
};

export default AddProduct;