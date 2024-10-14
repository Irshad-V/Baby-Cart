import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';


const CategoryProduct = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectCategory, setSelectCategory] = useState({});
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListinArray = urlSearch.getAll("category");

    const urlCategoryListObject = {};
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true;
    });

    useEffect(() => {
        setSelectCategory(urlCategoryListObject);
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_BACK_END}/filterProduct`, {
                category: filterCategoryList
            }, {  
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setData(response.data?.data || []);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;
        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked
        }));
    };

    useEffect(() => {
        fetchData();
    }, [filterCategoryList]);

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if (selectCategory[categoryKeyName]) {
                return categoryKeyName;
            }
            return null;
        }).filter(el => el);

        setFilterCategoryList(arrayOfCategory);

        const urlFormat = arrayOfCategory.map((el, index) => {
            if (arrayOfCategory.length - 1 === index) {
                return `category=${el}`;
            }
            return `category=${el}&`;
        });

        navigate("/product-category?" + urlFormat.join(""));
    }, [selectCategory]);

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target;
        setSortBy(value);

        if (value === 'asc') {
            setData(prev => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
        }
        if (value === 'dsc') {
            setData(prev => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
        }
    };

    return (
        <div className="container py-4">
            <div className="row">
                
                <div className="col-lg-3 col-md-4 mb-4">
                    <div className="bg-light p-3">
                        <h5 className="text-uppercase mb-3">Sort by</h5>
                        <form>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" name="sortBy" checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value="asc" />
                                <label className="form-check-label">Price - Low to High</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" name="sortBy" checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value="dsc" />
                                <label className="form-check-label">Price - High to Low</label>
                            </div>
                        </form>

                        <h5 className="text-uppercase mt-4 mb-3">Category</h5>
                        <form>
                            {productCategory.map((categoryName, index) => (
                                <div className="form-check" key={index}>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="category"
                                        checked={selectCategory[categoryName.value] || false}
                                        value={categoryName.value}
                                        id={categoryName.value}
                                        onChange={handleSelectCategory}
                                    />
                                    <label className="form-check-label" htmlFor={categoryName.value}>{categoryName.label}</label>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>

             
                <div className="col-lg-9 col-md-8">
                    <h5 className="mb-4">Search Results: {data.length}</h5>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="row ">
                            {data.length !== 0 ? (
                                <VerticalCard data={data} loading={loading} />
                            ) : (
                                <p>No products found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;
