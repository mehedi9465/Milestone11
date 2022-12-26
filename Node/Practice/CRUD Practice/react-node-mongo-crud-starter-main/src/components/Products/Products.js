import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setProducts(data)
        })
    }, [])

    const hanldeDeleteProcess = id => { 
        swal("Are you sure?", {
            dangerMode: true,
            buttons: true,
          }).then(result =>{
              if(result){
                fetch(`http://localhost:5000/products/${id}`, {
            method: "DELETE" 
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount){
                alert('Successfully deleted');
            }
            else{
                alert('Failed to delete');
            }
        });
        const filtered = products.filter(product => product?._id !== id)
        setProducts(filtered)
        }
          })
    }

    return (
        <div>
            <h2>{products?.length} Products Found</h2>

            {
                products.map(product => <p key={product?._id}>{product?.productName} {product?.productPrice} <Link to={`/products/update/${product?._id}`}><button>Update</button></Link><button onClick={() => hanldeDeleteProcess(product?._id)}>Delete</button></p>)
            }
        </div>
    );
};

export default Products;