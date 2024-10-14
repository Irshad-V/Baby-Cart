import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayINRCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import { AppContext } from '../App';

const RecommendedCategory = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(12).fill(null);
    const { fetchUserAddToCart } = useContext(AppContext)

    const handleAddToCart = async (e, id) => {
        e.preventDefault();  
        await addToCart(e, id);
        fetchUserAddToCart()
    };

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data || []);
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    return (
        <div className="container mt-5">
            <h2 className="text-center font-weight-bold mb-4">{heading}</h2>
            
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                {
                    loading ? (
                        loadingList.map((_, index) => (
                            <div className="col" key={index}>
                                <div className="card h-100">
                                    <div className="card-body placeholder-glow">
                                        <div className="bg-secondary placeholder" style={{ height: "200px" }}></div>
                                        <h5 className="card-title placeholder-wave mt-3"></h5>
                                        <p className="card-text placeholder-wave"></p>
                                        <p className="card-text text-muted placeholder-wave"></p>
                                        <button className="btn btn-secondary disabled placeholder col-6"></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product, index) => (
                            <div className="col" key={index}>
                                <Link to={`/product/${product?._id}`} className="text-decoration-none text-dark">
                                    <div className="card h-100 shadow-sm">
                                        <div className="card-img-top bg-light d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                                            <img 
                                                src={product.productImage[0]} 
                                                className="img-fluid object-fit-cover p-1" 
                                                alt={product?.productName}
                                                style={{ maxHeight: "100%", maxWidth: "100%" }}
                                            />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title text-truncate">{product?.productName}</h5>
                                            <p className="card-text text-muted text-capitalize mb-1">{product?.category}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="text-danger font-weight-bold">{displayINRCurrency(product?.sellingPrice)}</span>
                                                <span className="text-muted text-decoration-line-through">{displayINRCurrency(product?.price)}</span>
                                            </div>
                                            <button 
                                                className="btn btn-danger btn-sm mt-3 w-100" 
                                                onClick={(e) => handleAddToCart(e, product?._id)}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default RecommendedCategory;
