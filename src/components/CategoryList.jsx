import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACK_END}/get-Product-bycatagory`,
            );
            setCategoryProduct(response.data.data);
        } catch (error) {
            console.error('Error fetching category products:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);
 
    return (
        <div className="container mt-4 ">
            <div className="d-flex align-items-center gap-4 overflow-scroll custom-scrollbar-hidden">
                {loading ? (
                    categoryLoading.map((el, index) => (
                        <div
                            className="rounded-circle bg-light animate-pulse"
                            style={{ width: '80px', height: '80px' }}
                            key={"categoryLoading" + index}
                        ></div>
                    ))
                ) : (
                    categoryProduct.map((product, index) => (
                        <Link
                            to={`/product-category?category=${product?.category}`}
                            className="text-decoration-none"
                            key={product?.category}
                        >
                            <div
                                className="rounded-circle bg-light d-flex align-items-center justify-content-center "
                                style={{ width: '80px', height: '80px', padding: '0.5rem' }}
                            >
                                <img
                                    src={product?.productImage[0]}
                                    alt={product?.category}
                                    className="img-fluid object-fit-contain rounded-circle   "
                                    style={{ transition: 'transform 0.3s', height: '100%' }}
                                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.25)')}
                                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                />
                            </div>
                            <p className="text-center small text-capitalize mt-2">
                                {product?.category}
                            </p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryList;
