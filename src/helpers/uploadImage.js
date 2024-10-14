import axios from 'axios';

const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`

const uploadImage = async (image) => {

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "vibecart");

    try {

        const response = await axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
       
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Data:", error.response.data);
            console.error("Status:", error.response.status);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {

            console.error("Request:", error.request);
        } else {

            console.error("Error message:", error.message);
        }
        throw error;
    }
}

export default uploadImage;



