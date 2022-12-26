import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { addToDb } from '../../utilities/fakedb';
import './Shop.css';
import useCart from '../../hooks/useCart';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [cart, setCart] = useCart(products);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    // products to be rendered on the UI

    useEffect(() => {
        fetch('./products.json')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProducts(data);
                const count = data.length;
                const pageSize = Math.ceil(count/size);
                setPageCount(pageSize);
                console.log();
            });
    }, [size]);

    const handleAddToCart = (product) => {
        const exists = cart.find(pd => pd.key === product.key);
        let newCart = [];
        if (exists) {
            const rest = cart.filter(pd => pd.key !== product.key);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, product];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        // save to local storage (for now)
        addToDb(product.key);

    }

    const handleSearch = event => {
        const searchText = event.target.value;

        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));

        setDisplayProducts(matchedProducts);
    }

    const handlePaginationProducts = number => {
        const alteredProducts = [];
        setPage(number)
        const start = page * size;
        const maxLength = start + size;
        console.log(start, maxLength);
        for(let i = start; i < maxLength; i++ ){
            alteredProducts.push(products[i]);
        }
        setDisplayProducts(alteredProducts);
    }

    const handleSetSize = e => {
        console.log(e.target.value);
        setSize(e.target.value);
    }

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search Product" />

                    <select className="form-select" id="inputGroupSelect01" onChange={handleSetSize}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                    </select>
            </div>
            <div className="shop-container">
                <div className="product-container">
                    {
                        displayProducts.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        >
                        </Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review">
                            <button className="btn-regular">Review Your Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>

            <div className='pagination'>
                {
                    [...Array(pageCount).keys()].map(number => <button 
                    key={number}
                    className={ number === page ? 'selected' : ''} 
                    onClick={() => handlePaginationProducts(number)}>{number + 1}</button>)
                }
            </div>
        </>
    );
};

export default Shop;