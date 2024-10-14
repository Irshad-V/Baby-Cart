import React from 'react';
import { useNavigate } from 'react-router-dom';


const CancelPayment = () => {
    const navigate = useNavigate();

    return (
        <div className="cancel-payment-container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg">
                <div className="card-body text-center">
                    <h1 className="display-4 text-danger mb-4">Payment Cancelled</h1>
                    <p className="lead text-muted">
                        It looks like you canceled the payment. If you need help or wish to try again, click below.
                    </p>
                    <button 
                        className="btn btn-primary btn-lg mt-3" 
                        onClick={() => navigate('/cart')}
                    >
                        Back to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelPayment;
