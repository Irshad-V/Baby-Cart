import React from 'react'
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'



const BannerProduct = () => {
    const desktopImages = [image1, image2, image3, image4, image5];
    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
            <div className="carousel-inner container" >
                {desktopImages.map((image, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <picture>
                            <img src={desktopImages[index]} style={{ minHeight: "350px", maxHeight: "650px" }} className="d-block w-100 carousel-item-img " alt={`Slide ${index + 1}`} />
                        </picture>
                    </div>
                ))}
            </div> 
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default BannerProduct;