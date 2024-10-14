import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import displayINRCurrency from '../helpers/displayINRCurrency';
import { MdDelete } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContext } from '../App';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { fetchUserAddToCart } = useContext(AppContext);
    const loadingCart = new Array(4).fill(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACK_END}/view-card-product`, {
                withCredentials: true
            });
            if (response.data.success) {
                setData(response.data.data);
            }


        } catch (error) {
            console.error("Error fetching cart data", error);
        }
    };

    const handleLoading = async () => {
        await fetchData();
    };

    useEffect(() => {
        setLoading(true);
        handleLoading();
        setLoading(false);

    }, []);

    const increaseQty = async (id, qty) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACK_END}/update-cart-product`, {
                _id: id,
                quantity: qty + 1
            }, {
                withCredentials: true
            });
            if (response.data.success) {
                fetchData();
            }
        } catch (error) {
            console.error("Error increasing quantity", error);
        }
    };

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACK_END}/update-cart-product`, {
                    _id: id,
                    quantity: qty - 1
                }, {
                    withCredentials: true
                });
                if (response.data.success) {
                    fetchData();
                }
            } catch (error) {
                console.error("Error decreasing quantity", error);
            }
        }
    };

    const deleteCartProduct = async (id) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACK_END}/delete-cart-product`, {
                _id: id
            }, {
                withCredentials: true
            });
            if (response.data.success) {
                fetchData();
                fetchUserAddToCart();
            }
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0);


    const handlePayment = async () => {
        try {

            const response = await axios.post(`${process.env.REACT_APP_BACK_END}/create-paypal-order`, {
                cartItems: data,
                totalQty,
                totalPrice
            }, {
                withCredentials: true
            });


            if (response.data.success) {

                window.location.href = response.data.approvalUrl;

            } else {
                alert("Failed to create PayPal order. Please try again.");
            }
        } catch (error) {
            console.error("Error during payment process", error);
            alert("Payment creation failed. Please try again.");
        }
    };




    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Your Cart</h2>
            {data.length === 0 && !loading && <p className="text-center">No items in cart</p>}

            <div className="row ">
                <div className="col-lg-8">
                    {loading ? (
                        loadingCart.map((el, index) => (
                            <div key={index} className="card mb-3">
                                <div className="card-body">
                                    <div className="skeleton-loader"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product) => (
                            <div key={product._id} className="card mb-3" style={{ maxWidth: '350px' }}>
                                <div className="row g-0">
                                    <div className="col-4 d-flex align-items-center p-2">
                                        <img
                                            src={product?.productId?.productImage[0]}
                                            className="img-fluid rounded-start"
                                            alt={product?.productId?.productName}
                                            style={{ maxHeight: '100px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="col-8">
                                        <div className="card-body p-2">
                                            <h6 className="card-title text-truncate">{product?.productId?.productName}</h6>
                                            <p className="card-text mb-1 text-muted">{product?.productId?.category}</p>
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <span>{displayINRCurrency(product?.productId?.sellingPrice)}</span>
                                                <span>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</span>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <button className="btn btn-outline-danger btn-sm me-2" onClick={() => decreaseQty(product._id, product.quantity)}>-</button>
                                                <span>{product.quantity}</span>
                                                <button className="btn btn-outline-danger btn-sm ms-2" onClick={() => increaseQty(product._id, product.quantity)}>+</button>
                                            </div>
                                            <button className="btn btn-danger btn-sm mt-2 w-100" onClick={() => deleteCartProduct(product._id)}>
                                                <MdDelete /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {data.length !== 0 &&
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header bg-danger text-white">
                                Summary
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    <strong>Quantity:</strong> {totalQty}
                                </p>
                                <p className="card-text">
                                    <strong>Total Price:</strong> {displayINRCurrency(totalPrice)}
                                </p>
                                <button className="btn btn-primary w-100" onClick={handlePayment} >Proceed to Payment</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Cart;
