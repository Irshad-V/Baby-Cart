import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayINRCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'

import { FaShoppingCart } from 'react-icons/fa';
import { AppContext } from '../App'

const UpsideProductCard = ({ category, heading }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(AppContext)

    const handleAddToCart = async (e, id) => {
  
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

   
        setData(categoryProduct?.data)
    }

    useEffect(() => {
        fetchData()
    }, [category])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }

    return (
        <div className='container px-4 my-4 position-relative'>

            <h2 className='fs-3 fw-semibold py-4'>{heading}</h2>

            <div className='position-relative'>

                <div className='d-flex scroll-navigation-bar-head align-items-center gap-3 gap-md-6 overflow-auto scrollbar-none transition ' ref={scrollElement}>


                    <button
                        className='scroll-navigation-btn-left btn btn-light shadow d-none d-md-block rounded-circle p-1 position-absolute  translate-middle-y'
                        onClick={scrollLeft}
                        aria-label="Scroll Left"
                        style={{ zIndex: 10, width: '2rem', height: '2rem' }}
                    >
                        <FaAngleLeft size={16} className='text-primary' />
                    </button>


                    <button
                        className='scroll-navigation-btn-right btn btn-light  shadow d-none d-md-block rounded-circle p-1 position-absolute  translate-middle-y'
                        onClick={scrollRight}
                        aria-label="Scroll Right"
                        style={{ zIndex: 10, width: '2rem', right: '0', height: '2rem' }}
                    >
                        <FaAngleRight size={16} className='text-primary' />
                    </button>


                    {
                        loading ? (
                            loadingList.map((_, index) => (
                                <div key={index} className='w-100 product-card bg-white rounded shadow d-flex'>
                                    <div className='bg-light h-100 p-4 image-placeholder animate-pulse'></div>
                                    <div className='p-4 d-flex flex-column gap-2 w-100'>
                                        <h2 className='fw-medium fs-6 text-truncate bg-light animate-pulse p-1 rounded-circle'>products</h2>
                                        <p className='text-capitalize text-secondary bg-light animate-pulse p-1 rounded-circle'></p>
                                        <div className='d-flex gap-3 w-100'>
                                            <p className='text-danger fw-medium bg-light w-100 animate-pulse rounded'></p>
                                            <p className='text-secondary text-decoration-line-through bg-light w-100 animate-pulse rounded'></p>
                                        </div>
                                        <button className='btn btn-light text-white px-3 py-0.5 rounded-pill w-100 animate-pulse'></button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            data.map((product) => (
                                <Link to={`product/${product._id}`} key={product._id} className='w-100 product-card bg-white rounded shadow d-flex' style={{ textDecoration: 'none' }}>
                                    <div className='bg-light h-100 p-4 image-placeholder'>
                                        <img
                                            src={product.productImage[0]}
                                            alt={product.productName}
                                            className='img-fluid h-100 object-scale-down hover-scale'
                                        />
                                    </div>
                                    <div className='px-2 py-1 d-flex flex-column justify-content-center align-content-end w-100'>
                                        <h2 className='fw-medium   text-dark' style={{fontSize:"18px"}} >{product.productName}</h2>
                                        <p className='text-capitalize text-secondary'>{product.category}</p>
                                        <div className='d-flex gap-1 '>
                                            <p className='text-danger fw-medium'>{displayINRCurrency(product.sellingPrice)}</p>
                                            <p className='text-secondary text-decoration-line-through'>{displayINRCurrency(product.price)}</p>
                                        </div>
                                        <FaShoppingCart className='text-danger' onClick={(e) => handleAddToCart(e, product?._id)} />
                                    </div>
                                </Link>
                            ))
                        )
                    }

                </div>
            </div>


        </div>
    )
}

export default UpsideProductCard
