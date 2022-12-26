import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateProduct = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [])
    
    return (
        <div>
            <h2>This is Update Products</h2>
            <form >
                <input type="text" value={product?.productName || ''} />
                <input type="number" value={product?.productPrice || ''} />
                <input type="submit" value='Update' />
            </form>
        </div>
    );
};

export default UpdateProduct;