import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayINRCurrency';
import addToCart from '../helpers/addToCart';
import { AppContext } from '../App';


const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext( AppContext);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="row g-4 justify-content-center">
      {loading
        ? loadingList.map((_, index) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={index}
            >
              <div className="card loading-card-verticalcard shadow-sm">
                <div className="loading-image-verticalcard bg-light animate-pulse"></div>
                <div className="card-body">
                  <h5 className="card-title loading-title-verticalcard bg-light animate-pulse"></h5>
                  <p className="card-text loading-text-verticalcard bg-light animate-pulse"></p>
                  <p className="card-price loading-price-verticalcard bg-light animate-pulse"></p>
                  <p className="card-price-strike loading-strike-verticalcard bg-light animate-pulse"></p>
                  <button className="btn btn-secondary loading-btn-verticalcard animate-pulse"></button>
                </div>
              </div>
            </div>
          ))
        : data.map((product) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 "
              key={product._id}
            >
              <Link to={`/product/${product._id}`} className="card product-card-verticalcard shadow-sm text-decoration-none" onClick={scrollTop}>
                <div className=" bg-light d-flex justify-content-center align-items-center product-image-verticalcard ">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.productName}
                    className="card-img-vertical"
                  />
                </div>
                <div className="card-body overflow-hidden">
                  <h5 className="card-title text-truncate">{product?.productName}</h5>
                  <p className="card-text text-muted text-capitalize">{product?.category}</p>
                  <div className="d-flex flex-column justify-content-between align-items-center">
                    <span className="text-danger fw-bold">{displayINRCurrency(product?.sellingPrice)}</span>
                    <span className="text-muted text-decoration-line-through">
                      {displayINRCurrency(product?.price)}
                    </span>
                  </div>
                  <button
                    className="btn btn-danger btn-sm mt-2 w-100"
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            </div>
          ))}
    </div>
  );
};

export default VerticalCard;
