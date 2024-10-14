import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayINRCurrency';

const AdminProductCard = ({
    data,
    fetchdata
}) => { 
    const [editProduct, setEditProduct] = useState(false);
    return (
        <div className='bg-white p-2 rounded shadow-sm ' style={{ height: '10.5rem',width: "10rem" }}>
            <div  >
                <div className='d-flex justify-content-center align-items-center mb-2' style={{ height: '5rem' }}>
                    <img src={data?.productImage[0]} className='img-fluid mx-auto h-100 object-fit-cover' alt={data.productName} />
                </div>
                <h1 className='text-truncate fs-4 text-center' style={{ overflow: 'hidden' }}>{data.productName}</h1>

                <div className='d-flex justify-content-between' > 
                    <p className='font-weight-bold'>
                        {displayINRCurrency(data.sellingPrice) }
                    </p>
                    <div className='ml-auto mx-2  bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center cursor-pointer' 
                         onClick={() => setEditProduct(true)} style={{ width: '1.5rem', height: '1.5rem' }}>
                        <MdModeEditOutline />
                    </div>
                </div>
            </div>

            {editProduct && (
                <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
            )}
        </div>
    )
}

export default AdminProductCard;
