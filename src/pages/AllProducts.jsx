import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';

import AdminProductCard from '../components/AdminProductCard';
import axios from 'axios';

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false);
    const [allProduct, setAllProduct] = useState([]);

    const getAllProduct = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACK_END}/get-Product`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const dataResponse = response.data;
       
            setAllProduct(dataResponse?.data || []);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }

    };

    useEffect(() => {
        getAllProduct();
    }, []);

    return (
        <div>
            <div className="bg-white py-2 px-4 d-flex  justify-content-between align-items-center">
                <h2 className="fw-bold fs-4">All Products</h2>
                <button
                    className="btn btn-outline-danger rounded-pill"
                    onClick={() => setOpenUploadProduct(true)}
                >
                    Upload Product
                </button>
            </div>

            <div className="d-flex justify-content-center flex-wrap gap-3 py-4" style={{ height: 'calc(100vh - 190px)', overflowY: 'scroll' }}>
                {allProduct.map((product, index) => (
                    <AdminProductCard data={product} key={index + 'allProduct'} fetchdata={getAllProduct} />
                ))}
            </div>

           
            {openUploadProduct && (
                <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={getAllProduct} />
            )}
        </div>
    );
};

export default AllProducts;
