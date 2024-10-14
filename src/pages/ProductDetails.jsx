import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayINRCurrency';
import RecommendedCatagory from '../components/RecommendedCatagory';
import addToCart from '../helpers/addToCart';
import axios from 'axios';
import { AppContext } from '../App';

const ProductDetails = () => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState("");
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
    const [zoomImage, setZoomImage] = useState(false);
      const { fetchUserAddToCart } = useContext(AppContext);
    const navigate = useNavigate();

    const fetchProductDetails = async () => {
        setLoading(true);
        const productId = params?.id
        const response = await axios.post(
            `${process.env.REACT_APP_BACK_END}/product-details`,
            { productId },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        setLoading(false);
        const dataResponse = response.data;
        setData(dataResponse?.data);
        setActiveImage(dataResponse?.data?.productImage[0]);

    };

    useEffect(() => {
        fetchProductDetails();
    }, [params]);

    const handleMouseEnterProduct = (imageURL) => {
        setActiveImage(imageURL);
    };

    const handleZoomImage = useCallback((e) => {
        setZoomImage(true);
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setZoomImageCoordinate({ x, y });
    }, [zoomImageCoordinate]);

    const handleLeaveImageZoom = () => {
        setZoomImage(false);
    };

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const handleBuyProduct = async (e, id) => {
        await addToCart(e, id);
     
        navigate("/cart");
    };

    return (
        <div className="container py-4">
            <div className="d-md-flex align-item-center">
          
                <div className="col-lg-6 mb-4 ">
                    <div className="d-md-flex gap-3 align-items-center">
                        <div className="position-relative p-2 bg-light" style={{ height: "300px", width: "300px" }}>
                            <img src={activeImage} className="img-fluid w-100 h-100 object-fit-contain" onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />
                            {zoomImage && (
                                <div className="position-absolute d-none d-md-block overflow-hidden  bg-light" style={{ top: 0, right: "-520px", width: "500px", height: "400px" }}>
                                    <div className="w-100 h-100" style={{
                                        background: `url(${activeImage})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                                        transform: 'scale(1.5)',
                                    }}></div>
                                </div>
                            )}
                        </div>
                        <div className="d-flex flex-md-column  mt-3 mx-md-5 gap-2">
                            {loading
                                ? [...Array(4)].map((_, index) => <div className="bg-secondary rounded" key={index} style={{ width: "50px", height: "50px" }}>r</div>)
                                : data?.productImage?.map((imgURL, index) => (
                                    <img src={imgURL} className="img-thumbnail" key={index} style={{ width: "50px", height: "50px", cursor: 'pointer' }} onMouseEnter={() => handleMouseEnterProduct(imgURL)} />
                                ))}
                        </div>
                    </div>
                </div>

       
                <div className="col-lg-6">
                    {loading ? (
                        <div className="placeholder-glow">
                            <h2 className="placeholder col-12 bg-light mb-2"></h2>
                            <p className="placeholder col-8"></p>
                            <div className="d-flex gap-2">
                                <div className="placeholder col-4"></div>
                                <div className="placeholder col-4"></div>
                            </div>
                            <div className="d-flex gap-2">
                                <div className="placeholder col-4"></div>
                                <div className="placeholder col-4"></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="fw-bold">{data?.productName}</h2>
                            <p className="text-muted text-capitalize">{data?.category}</p>
                            <div className="text-danger mb-2">
                                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalf />
                            </div>
                            <div className="d-flex gap-3 mb-3">
                                <span className="text-danger fs-4">{displayINRCurrency(data?.sellingPrice)}</span>
                                <span className="text-muted text-decoration-line-through">{displayINRCurrency(data?.price)}</span>
                            </div>
                            <div className="d-flex gap-3">
                                <button className="btn btn-outline-danger" onClick={(e) => handleBuyProduct(e, data?._id)}>Buy</button>
                                <button className="btn btn-danger" onClick={(e) => handleAddToCart(e, data?._id)}>Add to Cart</button>
                            </div>
                            <div className="mt-3">
                                <p className="fw-bold">Description:</p>
                                <p>{data?.description}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            Recommended Products Section
            {data.category && <RecommendedCatagory category={data?.category} heading="Recommended Products" />}
        </div>
    );
};

export default ProductDetails;
