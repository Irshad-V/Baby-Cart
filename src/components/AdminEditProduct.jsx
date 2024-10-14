import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminEditProduct = ({
    onClose,
    productData,
    fetchdata
}) => {

    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice
    });
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        const uploadImageCloudinary = await uploadImage(file);
        setData((prev) => ({
            ...prev,
            productImage: [...prev.productImage, uploadImageCloudinary.url]
        }));
    };

    const handleDeleteProductImage = async (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);
        setData((prev) => ({
            ...prev,
            productImage: [...newProductImage]
        }));
    };
   
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const response = await fetch("SummaryApi.updateProduct.url", {
    //         // method: SummaryApi.updateProduct.method,
    //         credentials: 'include',
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify(data)
    //     });

    //     const responseData = await response.json();
    //     if (responseData.success) {
    //         toast.success(responseData?.message);
    //         onClose();
    //         fetchdata();
    //     }

    //     if (responseData.error) {
    //         toast.error(responseData?.message);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataResponse = await axios.post( `${process.env.REACT_APP_BACK_END}/updateProductController`, data, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }
          });

  
          const { success, message, error } = dataResponse.data;

          if (success) {
              toast.success(message);
              onClose();
              fetchdata();
             
          } else if (error) {
              toast.error(message);
          }
    };
    return (
    
    

<div className="position-fixed w-100 h-100 top-0 d-flex align-items-center justify-content-center bg-opacity bg-opacity-75  bg-dark">
            <div className="card card-upload p-4 shadow" style={{ maxWidth: '400px', width: '90%', maxHeight: '400px' ,overflowY: 'auto'}}>
                <div className="d-flex justify-content-between align-items-center pb-3">
                    <h2 className="fw-bold fs-5">Upload Product</h2>
                    <button className="btn btn-close" onClick={onClose} aria-label="Close">
                        <CgClose />
                    </button>
                </div>

                <form className="d-grid gap-3" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="productName" className="form-label">Product Name:</label>
                        <input
                            type="text"
                            id="productName"
                            placeholder="Enter product name"
                            name="productName"
                            value={data.productName}
                            onChange={handleOnChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="brandName" className="form-label">Brand Name:</label>
                        <input
                            type="text"
                            id="brandName"
                            placeholder="Enter brand name"
                            value={data.brandName}
                            name="brandName"
                            onChange={handleOnChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="form-label">Category:</label>
                        <select required value={data.category} name="category" onChange={handleOnChange} className="form-select">
                            <option value="">Select Category</option>
                            {productCategory.map((item, index) => (
                                <option value={item.value} key={item.value + index}>{item.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="productImage" className="form-label">Product Image:</label>
                        <label htmlFor="uploadImageInput">
                            <div className="bg-light border rounded d-flex justify-content-center align-items-center cursor-pointer" style={{ height: '8rem' }}>
                                <FaCloudUploadAlt className="display-4" />
                                <p className="small text-center mb-0">Upload Product Image</p>
                                <input type="file" id="uploadImageInput" className="d-none" onChange={handleUploadProduct} />
                            </div>
                        </label>
                    </div>

                    <div className="d-flex flex-wrap gap-2">
                        {data.productImage.length > 0 ? (
                            data.productImage.map((image, index) => (
                                <div className="position-relative" key={index}>
                                    <img
                                        src={image}
                                        alt={`Product ${index}`}
                                        className="bg-light border rounded"
                                        style={{ width: '80px', height: '80px', cursor: 'pointer' }}
                                        onClick={() => {
                                            setOpenFullScreenImage(true);
                                            setFullScreenImage(image);
                                        }}
                                    />
                                    <div className="position-absolute top-0 end-0 bg-danger rounded-circle text-white d-flex justify-content-center align-items-center" style={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={() => handleDeleteProductImage(index)}>
                                        <MdDelete />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-danger small">*Please upload a product image</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="price" className="form-label">Price:</label>
                        <input
                            type="number"
                            id="price"
                            placeholder="Enter price"
                            value={data.price}
                            name="price"
                            onChange={handleOnChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="sellingPrice" className="form-label">Selling Price:</label>
                        <input
                            type="number"
                            id="sellingPrice"
                            placeholder="Enter selling price"
                            value={data.sellingPrice}
                            name="sellingPrice"
                            onChange={handleOnChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea
                            className="form-control"
                            placeholder="Enter product description"
                            rows={3}
                            onChange={handleOnChange}
                            name="description"
                            value={data.description}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-danger text-white mt-3">Upload Product</button>
                </form>
            </div>

            {openFullScreenImage && (
                <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
            )}
        </div>



    );
}

export default AdminEditProduct;
