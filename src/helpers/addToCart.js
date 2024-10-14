
import axios from 'axios';
import { toast } from 'react-toastify';

const addToCart = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACK_END}/addtocart`, 
            { productId: id }, 
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const responseData = response.data;

        if (responseData.success) {
            toast.success(responseData.message);
        } else if (responseData.error) {
            toast.error(responseData.message);
        }

        return responseData;
    } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add item to cart.");
        return { error: true, message: "Failed to add item to cart." };
    }
};

export default addToCart;
