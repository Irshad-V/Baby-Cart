import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const SuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const paymentId = query.get('paymentId');
        const payerId = query.get('PayerID');

        if (paymentId && payerId) {
           
            axios.post(`${process.env.REACT_APP_BACK_END}/success`, 
                    { paymentId, payerId },
                    { withCredentials: true } 
                )
                .then((response) => {
               
                    setSuccess(true);  
                    setLoading(false);  
                })
                .catch((error) => { 
                    console.error('Payment execution failed:', error);
                    setError('Payment execution failed. Please try again.');
                    setLoading(false);  
                });
        } else {
            setError('Invalid payment details.');
            setLoading(false);
        }
    }, [location.search]);

    return (
        <div className="success-page-container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg">
                <div className="card-body text-center">
                    {loading && !error && !success ? (
                        <>
                            <h1 className="display-5 text-primary mb-4">Processing Payment...</h1>
                            <p className="lead">Please wait while we confirm your payment.</p>
                            <div className="spinner-border text-primary mt-3" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </>
                    ) : error ? (
                        <>
                            <h1 className="display-5 text-danger mb-4">Payment Failed</h1>
                            <p className="lead">{error}</p>
                            <button
                                className="btn btn-primary btn-lg mt-3"
                                onClick={() => navigate('/cart')}
                            >
                                Try Again
                            </button>
                        </>
                    ) : (
                        <>
                            <h1 className="display-5 text-success mb-4">Payment Successful</h1>
                            <p className="lead">Your payment was successful! Thank you for your purchase.</p>
                            <button
                                className="btn btn-success btn-lg mt-3"
                                onClick={() => navigate('/')}
                            >
                                Go to Homepage
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
