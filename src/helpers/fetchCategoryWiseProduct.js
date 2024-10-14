import axios from 'axios';
const fetchCategoryWiseProduct = async (category) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACK_END}/category-product`, {
            category: category
        }, {
            headers: {
                "content-type": "application/json"
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching category-wise products:", error);
        throw error;
    }
};

export default fetchCategoryWiseProduct;
